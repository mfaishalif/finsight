import os
from datetime import datetime, timedelta

class BaseConfig:
    """
    Konfigurasi Dasar untuk Machine Learning Model.
    Menyimpan parameter yang digunakan bersama oleh mode Daily dan Hourly.
    """
    # Ukuran data test (20% untuk validasi)
    TEST_SIZE = 0.2
    
    # Arsitektur Model LSTM
    UNITS = 50          # Jumlah neuron dalam lapisan LSTM
    DROPOUT_RATE = 0.2  # Rate dropout untuk mencegah overfitting
    LEARNING_RATE = 0.001
    
    # Hyperparameter Pelatihan
    BATCH_SIZE = 32     # Jumlah sampel per update gradien
    EPOCHS = 50         # Jumlah iterasi pelatihan penuh

    def __init__(self):
        # Mengatur jalur direktori dinamis
        # CORE_DIR adalah direktori tempat file ini berada ('ml/core')
        self.CORE_DIR = os.path.dirname(os.path.abspath(__file__))
        # BASE_DIR adalah direktori 'ml' (parent dari core)
        self.BASE_DIR = os.path.dirname(self.CORE_DIR) 
        
        # Direktori untuk menyimpan model (.h5) dan scaler (.pkl)
        self.MODELS_DIR = os.path.join(self.BASE_DIR, 'models')
        # Direktori untuk menyimpan hasil plot evaluasi
        self.PLOTS_DIR = os.path.join(self.BASE_DIR, 'plots')
        
        # Pastikan direktori tujuan ada, buat jika belum ada
        os.makedirs(self.MODELS_DIR, exist_ok=True)
        os.makedirs(self.PLOTS_DIR, exist_ok=True)

    def get_paths(self, symbol):
        """
        Mengembalikan kamus (dictionary) path file untuk simbol mata uang tertentu.
        
        Args:
            symbol (str): Simbol mata uang, contoh 'USDIDR=X' atau 'EURUSD=X'
            
        Returns:
            dict: Berisi path lengkap untuk model, scaler, dan plot.
        """
        # Bersihkan simbol agar aman digunakan sebagai nama file (hapus karakter aneh)
        safe_symbol = symbol.replace('/', '')
        return {
            'model': os.path.join(self.MODELS_DIR, f'{safe_symbol}_{self.MODE}_model.h5'),
            'scaler': os.path.join(self.MODELS_DIR, f'{safe_symbol}_{self.MODE}_scaler.pkl'),
            'loss_plot': os.path.join(self.PLOTS_DIR, f'{safe_symbol}_{self.MODE}_loss.png'),
            'prediction_plot': os.path.join(self.PLOTS_DIR, f'{safe_symbol}_{self.MODE}_prediction.png'),
            'forecast_plot': os.path.join(self.PLOTS_DIR, f'{safe_symbol}_{self.MODE}_forecast.png')
        }

class DailyConfig(BaseConfig):
    """
    Konfigurasi Khusus untuk Mode Harian (Daily).
    Memprediksi nilai tukar hari per hari untuk 7 hari ke depan.
    """
    MODE = 'daily'
    START_DATE = '2010-01-01'  # Data historis dimulai sejak 2010
    END_DATE = '2025-01-01'    # Data historis berakhir (batas training)
    INTERVAL = '1d'            # Interval data harian
    
    LOOKBACK_WINDOW = 60  # Melihat ke belakang 60 hari untuk prediksi
    PREDICTION_STEPS = 7  # Memprediksi 7 hari ke depan (Output Model)
    
    def __init__(self):
        super().__init__()
        self.TIME_UNIT = 'Days' # Satuan waktu untuk label grafik

class HourlyConfig(BaseConfig):
    """
    Konfigurasi Khusus untuk Mode Per Jam (Hourly).
    Memprediksi nilai tukar jam per jam untuk 24 jam ke depan.
    """
    MODE = 'hourly'
    # Yahoo Finance membatasi data per jam hanya untuk 730 hari terakhir (sekitar 2 tahun)
    # Kita menggunakan 720 hari untuk keamanan agar tidak gagal download
    START_DATE = (datetime.now() - timedelta(days=720)).strftime('%Y-%m-%d')
    END_DATE = datetime.now().strftime('%Y-%m-%d')
    INTERVAL = '1h'       # Interval data per jam
    
    LOOKBACK_WINDOW = 60  # Melihat ke belakang 60 jam untuk prediksi
    PREDICTION_STEPS = 24 # Memprediksi 24 jam ke depan (Output Model)
    
    def __init__(self):
        super().__init__()
        self.TIME_UNIT = 'Hours' # Satuan waktu untuk label grafik

# Registry Konfigurasi
# Memudahkan akses config berdasarkan string 'daily' atau 'hourly'
CONFIGS = {
    'daily': DailyConfig(),
    'hourly': HourlyConfig()
}
