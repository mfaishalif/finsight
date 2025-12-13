# Microservice ML Finsight

Direktori ini berisi microservice Machine Learning untuk Finsight, sebuah aplikasi prediksi mata uang. Aplikasi ini menggunakan *artificial neural network* **LSTM (Long Short-Term Memory)** untuk memperkirakan nilai tukar berdasarkan data historis dari Yahoo Finance.

## 🌟 Fitur

*   **Prediksi Dua Mode**:
    *   **Harian (Daily)**: Memprediksi 7 hari ke depan berdasarkan 60 hari terakhir.
    *   **Per Jam (Hourly)**: Memprediksi 24 jam ke depan berdasarkan 60 jam terakhir.
*   **Dukungan Multi-Mata Uang**: Melatih dan memprediksi pasangan mata uang apa pun yang didukung oleh Yahoo Finance (misalnya, `USDIDR=X`, `EURUSD=X`, `BTC-USD`).
*   **Performa Tinggi**:
    *   **Akselerasi GPU**: Dibangun di atas TensorFlow dengan dukungan CUDA.
    *   **Caching Model**: Mekanisme caching memori untuk prediksi instan setelah pemuatan awal.
*   **Clean Architecture**: Terstruktur sebagai paket Python yang scalable (`app`, `core`, `services`).

## 📂 Struktur Proyek

```text
ml/
├── app/                 # Layer Aplikasi FastAPI
│   ├── main.py          # Titik Masuk Aplikasi (Entrypoint)
│   ├── routers/         # Endpoint API
│   └── schemas.py       # Model Pydantic (Validasi Data)
├── core/                # Konfigurasi Inti
│   └── config.py        # Pengaturan & Manajemen Path
├── services/            # Layer Logika Bisnis
│   ├── data_service.py  # Pengambilan & Pemrosesan Data (Yahoo Finance)
│   ├── model_service.py # Arsitektur Model LSTM & Loop Pelatihan
│   └── predictor.py     # Mesin Inferensi & Visualisasi
├── models/              # Artefak Tersimpan (Model .h5 & Scaler .pkl)
├── plots/               # Grafik Evaluasi yang Dihasilkan
├── train.py             # Skrip CLI untuk Pelatihan
├── predict.py           # Skrip CLI untuk Prediksi
└── requirements.txt     # Dependensi Python
```

## 🚀 Memulai (Getting Started)

### Prasyarat

*   Python 3.10 atau lebih tinggi
*   NVIDIA Drivers & CUDA Toolkit (Opsional, untuk akselerasi GPU)

### Instalasi

1.  Masuk ke direktori `ml`:
    ```bash
    cd ml
    ```

2.  Buat virtual environment:
    *   **Linux/MacOS**:
        ```bash
        python3 -m venv .venv
        source .venv/bin/activate
        ```
    *   **Windows**:
        ```powershell
        python -m venv .venv
        .venv\Scripts\activate
        ```

3.  Instal dependensi:
    ```bash
    pip install -r requirements.txt
    ```

## 🛠 Cara Penggunaan

### 1. Melatih Model (Training)
Sebelum melakukan prediksi, Anda harus melatih model untuk simbol mata uang yang diinginkan.

```bash
# Latih Model Harian untuk USD/IDR (Default)
python train.py --mode daily

# Latih Model Per Jam untuk Euro/USD
python train.py --mode hourly --symbol EURUSD=X

# Latih Model Harian untuk Bitcoin
python train.py --mode daily --symbol BTC-USD
```

*   **Artefak**: Model yang dilatih disimpan di `models/` (contoh: `USDIDR=X_daily_model.h5`).
*   **Evaluasi**: Kurva loss dan grafik prediksi disimpan di `plots/`.

### 2. Menjalankan Server API
Jalankan server FastAPI untuk integrasi atau produksi.

```bash
uvicorn app.main:app --reload
```

*   **URL**: `http://localhost:8000`
*   **Dokumentasi**: `http://localhost:8000/docs` (Swagger UI)

**Contoh Request:**
```bash
curl "http://localhost:8000/predict/daily?symbol=EURUSD=X"
```

### 3. Prediksi via CLI
Jalankan prediksi ad-hoc langsung dari terminal.

```bash
python predict.py --mode hourly --symbol EURUSD=X
```
Perintah ini akan mencetak hasil forecast ke konsol dan menghasilkan gambar grafik di `plots/`.

## ⚙️ Konfigurasi
Parameter konfigurasi (Epochs, Batch Size, Lookback Window) dapat diubah di file `ml/core/config.py`.
