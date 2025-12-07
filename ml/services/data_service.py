import yfinance as yf
import numpy as np
from sklearn.preprocessing import MinMaxScaler
import joblib
import os
from core.config import CONFIGS

def fetch_data(ticker, start, end, interval='1d'):
    """
    Mengambil data historis keuangan dari Yahoo Finance.
    
    Args:
        ticker (str): Simbol saham/mata uang (cth: 'USDIDR=X')
        start (str): Tanggal mulai format 'YYYY-MM-DD'
        end (str): Tanggal akhir format 'YYYY-MM-DD'
        interval (str): Interval data ('1d' atau '1h')
        
    Returns:
        DataFrame: Pandas DataFrame yang berisi kolom 'Close' (Harga Penutupan)
    """
    print(f"Mengambil data untuk {ticker} dari {start} sampai {end} dengan interval {interval}...")
    # Mengunduh data menggunakan yfinance
    df = yf.download(ticker, start=start, end=end, interval=interval, progress=False)
    
    # Data per jam dari yfinance seringkali memiliki baris yang hilang (malam hari/akhir pekan).
    # LSTM membutuhkan urutan waktu yang kontinu.
    # ffill (forward fill) digunakan untuk mengisi nilai kosong dengan nilai sebelumnya.
    df = df.ffill()
    
    return df[['Close']]

def preprocess_data(df):
    """
    Normalisasi data menggunakan MinMaxScaler.
    LSTM bekerja lebih baik jika data berada dalam rentang 0 sampai 1.
    
    Args:
        df (DataFrame): Data harga asli
        
    Returns:
        tuple: (data_ternormalisasi, objek_scaler)
    """
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(df)
    return scaled_data, scaler

def create_sequences(data, lookback, prediction_days):
    """
    Membuat urutan (sequences) data untuk pelatihan LSTM (Sliding Window).
    
    Args:
        data (array): Data harga yang sudah dinormalisasi
        lookback (int): Jumlah langkah waktu ke belakang (Input X)
        prediction_days (int): Jumlah langkah waktu ke depan yang diprediksi (Target y)
        
    Returns:
        tuple: (X, y) array numpy
    """
    X, y = [], []
    # Loop melalui data untuk membuat pasangan input-output
    # Kita berhenti lebih awal agar memiliki cukup data untuk target prediksi di akhir
    for i in range(lookback, len(data) - prediction_days + 1):
        # X: Data dari index (i-lookback) sampai i
        X.append(data[i-lookback:i, 0])
        # y: Data dari index i sampai (i+prediction_days) -> Target multi-step
        y.append(data[i:i+prediction_days, 0])
        
    return np.array(X), np.array(y)

def load_and_process_data(conf, symbol, scaler_path, save_scaler=False):
    """
    Fungsi utama untuk orkestrasi persiapan data:
    1. Mengunduh data
    2. Normalisasi
    3. Pembuatan sequence
    4. Pembagian data latih (train) dan uji (test)
    
    Args:
        conf (Config): Objek konfigurasi (Hourly/Daily)
        symbol (str): Simbol mata uang
        scaler_path (str): Lokasi penyimpanan file scaler
        save_scaler (bool): Apakah perlu menyimpan objek scaler ke disk
        
    Returns:
        tuple: (X_train, y_train, X_test, y_test, scaler)
    """
    # 1. Ambil Data
    df = fetch_data(symbol, conf.START_DATE, conf.END_DATE, interval=conf.INTERVAL)
    
    # 2. Preprocess (Normalisasi)
    scaled_data, scaler = preprocess_data(df)
    
    if save_scaler:
        # Pastikan direktori ada sebelum menyimpan
        os.makedirs(os.path.dirname(scaler_path), exist_ok=True)
        joblib.dump(scaler, scaler_path)
        print(f"Scaler berhasil disimpan ke {scaler_path}")

    # 3. Buat Sequences (Input X dan Target y)
    X, y = create_sequences(scaled_data, conf.LOOKBACK_WINDOW, conf.PREDICTION_STEPS)
    
    # 4. Reshape X agar sesuai input LSTM [samples, time steps, features]
    # dimension = (jumlah_sampel, window_size, 1_feature_harga)
    X = np.reshape(X, (X.shape[0], X.shape[1], 1))
    
    # 5. Bagi Data Latih dan Uji (Train/Test Split)
    # Menggunakan data awal untuk latih, dan data akhir untuk uji (TimeSeriesSplit manual)
    train_size = int(len(X) * (1 - conf.TEST_SIZE))
    
    X_train, X_test = X[:train_size], X[train_size:]
    y_train, y_test = y[:train_size], y[train_size:]
    
    return X_train, y_train, X_test, y_test, scaler
