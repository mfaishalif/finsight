import argparse
from services.predictor import predict_future

if __name__ == '__main__':
    # Konfigurasi argumen baris perintah (CLI)
    parser = argparse.ArgumentParser(description='Jalankan Prediksi LSTM')
    
    # Argumen Mode: 'daily' atau 'hourly'
    parser.add_argument('--mode', type=str, default='hourly', choices=['daily', 'hourly'], help='Mode prediksi: daily atau hourly')
    
    # Argumen Simbol: Mata uang yang akan diprediksi
    parser.add_argument('--symbol', type=str, default='USDIDR=X', help='Simbol mata uang (cth: EURUSD=X)')
    
    args = parser.parse_args()
    
    # Jalankan prediksi (plot=True akan menyimpan grafik ke disk)
    final_results = predict_future(args.mode, symbol=args.symbol, plot=True)
    
    if not final_results:
        print("Tidak ada hasil yang dihasilkan.")
        exit(0)

    # Cetak hasil ke terminal
    print("-" * 30)
    print(f"Hasil Forecast ({args.mode} - {args.symbol}):")
    for res in final_results:
        print(f"Waktu: {res['timestamp']} | Harga: {res['value']:.2f}")
    print("-" * 30)
