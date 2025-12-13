import argparse
from core.config import CONFIGS
from services.model_service import train_model

if __name__ == '__main__':
    # Konfigurasi argumen baris perintah (CLI)
    parser = argparse.ArgumentParser(description='Melatih Model LSTM (Train)')
    
    # Argumen Mode: 'daily' atau 'hourly'
    parser.add_argument('--mode', type=str, default='hourly', choices=['daily', 'hourly'], help='Mode prediksi: daily atau hourly')
    
    # Argumen Simbol: Mata uang yang akan dilatih (default: IDR)
    parser.add_argument('--symbol', type=str, default='USDIDR=X', help='Simbol mata uang (cth: EURUSD=X)')
    
    args = parser.parse_args()
    
    # Validasi Mode
    if args.mode not in CONFIGS:
        print(f"Mode tidak valid. Opsi: {list(CONFIGS.keys())}")
        exit(1)
        
    # Jalankan proses pelatihan
    train_model(CONFIGS[args.mode], symbol=args.symbol)
