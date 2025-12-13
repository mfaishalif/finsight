import numpy as np
import os
import pandas as pd
import yfinance as yf
from tensorflow.keras.models import load_model
import joblib
from datetime import datetime, timedelta
import matplotlib.pyplot as plt
from core.config import CONFIGS

# Cache Memori untuk menyimpan model yang sudah dimuat
# Agar tidak perlu membaca file dari disk setiap kali prediksi (Mempercepat API)
LOADED_MODELS = {}

def get_model_from_cache(symbol, model_path):
    """
    Mengambil model dari cache memori jika ada, jika tidak, muat dari disk.
    """
    if symbol in LOADED_MODELS:
        return LOADED_MODELS[symbol]
    
    print(f"Memuat model untuk {symbol} dari disk...")
    # Load model Keras (.h5)
    model = load_model(model_path)
    LOADED_MODELS[symbol] = model
    return model

def predict_future(mode, symbol='USDIDR=X', plot=True):
    """
    Fungsi utama untuk membuat prediksi masa depan.
    
    Langkah-langkah:
    1. Load Model dan Scaler yang sesuai dengan mode dan simbol.
    2. Ambil data harga terbaru dari Yahoo Finance (sebagai konteks input).
    3. Lakukan prediksi menggunakan model.
    4. Generate timestamp untuk hasil prediksi.
    5. (Opsional) Buat grafik hasil prediksi.
    
    Returns:
        list: Daftar dictionary berisi {step, timestamp, value}
    """
    if mode not in CONFIGS:
        raise ValueError(f"Mode tidak valid: {mode}. Opsi: {list(CONFIGS.keys())}")
    
    conf = CONFIGS[mode]
    paths = conf.get_paths(symbol)
    
    print(f"Memulai prediksi mode {mode.upper()} untuk {symbol}...")

    # 1. Load Model dan Scaler
    try:
        # Cek apakah file model dan scaler ada
        if not os.path.exists(paths['model']) or not os.path.exists(paths['scaler']):
            print(f"Artifact tidak ditemukan untuk {symbol}. Silakan latih model terlebih dahulu.")
            return []
            
        # Gunakan cache untuk performa
        model = get_model_from_cache(f"{symbol}_{mode}", paths['model'])
        scaler = joblib.load(paths['scaler'])
    except Exception as e:
        print(f"Error memuat model atau scaler: {e}")
        return []

    # 2. Ambil Data Terbaru
    end_date = datetime.now()
    # Ambil konteks yang cukup panjang agar aman (60 hari/jam ke belakang)
    start_date = end_date - timedelta(days=60 if mode == 'hourly' else 120) 
    
    df = yf.download(symbol, start=start_date, end=end_date, interval=conf.INTERVAL, progress=False)
    df = df.ffill() # Isi data kosong
    
    if len(df) < conf.LOOKBACK_WINDOW:
        print(f"Data terbaru tidak cukup untuk {symbol}.")
        return []

    # Ambil window terakhir untuk input model
    recent_data = df[['Close']].values[-conf.LOOKBACK_WINDOW:]
    # Normalisasi data input menggunakan scaler yang sama saat training
    recent_data_scaled = scaler.transform(recent_data)
    # Reshape ke format [1 sample, lookback, 1 feature]
    X_input = np.reshape(recent_data_scaled, (1, conf.LOOKBACK_WINDOW, 1))
    
    # 3. Lakukan Prediksi
    prediction_scaled = model.predict(X_input, verbose=0)
    # Kembalikan ke harga asli
    prediction = scaler.inverse_transform(prediction_scaled.reshape(-1, 1)).flatten()
    
    # 4. Generate Timestamps (Waktu Masa Depan)
    last_timestamp = df.index[-1]
    # Pastikan last_timestamp adalah objek datetime python
    if isinstance(last_timestamp, pd.Timestamp):
        last_timestamp = last_timestamp.to_pydatetime()

    results = []
    current_time = last_timestamp

    for i, price in enumerate(prediction):
        if mode == 'hourly':
            # Tambah 1 jam
            current_time += timedelta(hours=1)
        else:
            # Tambah 1 hari
            current_time += timedelta(days=1)
            # Logika Pasar Forex: Lewati akhir pekan (Sabtu=5, Minggu=6)
            while current_time.weekday() >= 5:
                current_time += timedelta(days=1)
        
        results.append({
            "step": i + 1,
            "timestamp": current_time.isoformat(),
            "value": float(price)
        })

    if plot:
        generate_plot(conf, symbol, paths['forecast_plot'], recent_data, prediction, scaler, mode)

    return results

def generate_plot(conf, symbol, plot_path, recent_data, forecast, scaler, mode):
    """
    Membuat visualisasi grafik prediksi masa depan.
    Menyambungkan garis data historis dengan garis prediksi.
    """
    # recent_data sudah harga asli, tidak perlu inverse transform
    history = recent_data.flatten()
    
    # Trik Visualisasi:
    # Masukkan titik terakhir data historis ke awal array forecast
    # Ini membuat garis merah (prediksi) tersambung mulus dengan garis biru (history)
    forecast_with_connector = np.insert(forecast, 0, history[-1])
    
    history_indices = list(range(len(history)))
    # Index forecast dimulai dari index terakhir history
    forecast_indices = list(range(len(history) - 1, len(history) + len(forecast)))
    
    plt.figure(figsize=(12, 6))
    plt.plot(history_indices, history, label=f'Riwayat (Last {conf.LOOKBACK_WINDOW} {conf.TIME_UNIT})', color='blue')
    plt.plot(forecast_indices, forecast_with_connector, label=f'Prediksi (Next {conf.PREDICTION_STEPS} {conf.TIME_UNIT})', color='red', marker='o')
    plt.title(f'{mode.title()} Currency Forecast: {symbol}')
    plt.xlabel(f'Langkah Waktu ({conf.TIME_UNIT})')
    plt.ylabel('Harga')
    plt.legend()
    plt.grid(True)
    
    plt.savefig(plot_path)
    print(f"Grafik Forecast disimpan ke {plot_path}")
