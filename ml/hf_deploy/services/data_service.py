import yfinance as yf
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
import joblib
import os
from core.config import CONFIGS

import datetime
import time
import random

CACHE_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'cache')

def download_with_retry(ticker, start, end, interval, max_retries=5):
    """
    Mengunduh data dengan mekanisme retry dan exponential backoff.
    """
    for attempt in range(max_retries):
        try:
            print(f"DEBUG: Attempt {attempt+1}/{max_retries} downloading {ticker}...")
            df = yf.download(ticker, start=start, end=end, interval=interval, progress=False)
            
            # Check if dataframe is empty (yfinance sometimes returns empty df on failure without raising)
            if df.empty:
                print(f"WARNING: Empty DataFrame received on attempt {attempt+1}")
                raise ValueError("Empty DataFrame returned from yfinance")
                
            return df
            
        except Exception as e:
            print(f"ERROR: Download failed on attempt {attempt+1}: {e}")
            if attempt < max_retries - 1:
                # Exponential backoff: 2s, 4s, 8s, 16s... + random jitter
                sleep_time = (2 ** attempt) + random.uniform(0.5, 1.5)
                print(f"Waiting {sleep_time:.2f} seconds before retrying...")
                time.sleep(sleep_time)
            else:
                print("ERROR: Max retries reached.")
                raise e
    return pd.DataFrame() # Should not be reached if raise e is present


def fetch_data(ticker, start, end, interval='1d'):
    """
    Mengambil data historis keuangan dari Yahoo Finance dengan Caching.
    
    Args:
        ticker (str): Simbol saham/mata uang (cth: 'USDIDR=X')
        start (str): Tanggal mulai format 'YYYY-MM-DD'
        end (str): Tanggal akhir format 'YYYY-MM-DD'
        interval (str): Interval data ('1d' atau '1h')
        
    Returns:
        DataFrame: Pandas DataFrame yang berisi kolom 'Close' (Harga Penutupan)
    """
    # Pastikan direktori cache ada
    os.makedirs(CACHE_DIR, exist_ok=True)
    
    # Path file cache
    cache_file = os.path.join(CACHE_DIR, f"{ticker}_{interval}.csv")
    
    # Tentukan durasi cache (TTL)
    ttl_hours = 12 if interval == '1d' else 1
    
    is_cache_valid = False
    
    if os.path.exists(cache_file):
        file_mod_time = datetime.datetime.fromtimestamp(os.path.getmtime(cache_file))
        if datetime.datetime.now() - file_mod_time < datetime.timedelta(hours=ttl_hours):
             is_cache_valid = True
             print(f"CACHE HIT: Menggunakan data cache lokal untuk {ticker} (Age: {datetime.datetime.now() - file_mod_time})")
        else:
             print(f"CACHE STALE: Data cache kadaluarsa untuk {ticker}")

    if is_cache_valid:
        try:
            # Load dari cache
            df = pd.read_csv(cache_file, index_col=0, parse_dates=True)
            # Filter sesuai request agar konsisten? 
            # Untuk simplifikasi, kita return apa adanya dari cache karena biasanya rentang request mirip.
            # Tapi idealnya kita filter start/end.
            # Kita asumsi cache selalu menyimpan data "terbaru" yang cukup panjang.
            return df[['Close']]
        except Exception as e:
            print(f"Gagal membaca cache: {e}")
    
    print(f"FETCHING API: Mengambil data baru untuk {ticker} dari {start} sampai {end}...")
    
    try:
        # Mengunduh data menggunakan yfinance dengan retry
        df = download_with_retry(ticker, start=start, end=end, interval=interval)
        print(f"DEBUG: Initial DF Shape: {df.shape}")
        print(f"DEBUG: Initial DF Columns: {df.columns}")
        
        if df.empty:
            print("Peringatan: Data kosong dari Yahoo Finance.")
            return df
        
        # Data per jam dari yfinance seringkali memiliki baris yang hilang
        df = df.ffill()

        # Handle YFinance MultiIndex (Ticker level)
        if isinstance(df.columns, pd.MultiIndex):
            # If columns are (Price, Ticker), we want to grab 'Close'
            # The structure is usually levels=['Price', 'Ticker']
            # We can try to get just the 'Close' cross-section if possible, or droplevel
            try:
                # Attempt to extract 'Close' for the specific ticker if it exists in level 1
                if ticker in df.columns.get_level_values(1):
                    df = df.xs(ticker, level=1, axis=1) # Drop ticker level
                else:
                    # Just drop the ticker level generically if it's the second level
                    df.columns = df.columns.droplevel(1)
            except Exception as e:
                print(f"Warning: MultiIndex handling failed: {e}")

        # Simpan ke cache
        if 'Close' in df.columns:
            df[['Close']].to_csv(cache_file)
            return df[['Close']]
        else:
            # Fallback if structure is weird (e.g. just a series or different name)
            print("Warning: 'Close' column not found, saving full DF.")
            df.to_csv(cache_file)
            return df
    except Exception as e:
        print(f"YFinance Download Error: {e}")
        # Jika gagal fetch bar, coba baca cache lama (sebagai fallback ultimate)
        if os.path.exists(cache_file):
             print("FALLBACK: Menggunakan cache kadaluarsa karena API error.")
             return pd.read_csv(cache_file, index_col=0, parse_dates=True)[['Close']]
        raise e

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
