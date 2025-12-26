# Finsight

Finsight adalah aplikasi prediksi mata uang komprehensif yang menggabungkan kekuatan *Machine Learning* untuk prediksi data runtun waktu (time-series) dengan antarmuka web modern untuk visualisasi dan interaksi pengguna.

Proyek ini bertujuan untuk memberikan wawasan finansial yang mendalam melalui prediksi nilai tukar mata uang yang akurat dan mudah dipahami.

## Arsitektur Proyek

Proyek ini diorganisir sebagai monorepo yang terdiri dari dua komponen utama:

*   **`ml/` (Machine Learning Microservice)**:
    *   Dibangun dengan **Python** dan **FastAPI**.
    *   Menggunakan **TensorFlow/Keras** untuk model LSTM.
    *   Bertanggung jawab untuk pelatihan model, pengambilan data dari Yahoo Finance, dan melayani prediksi.
    *   Menyediakan API untuk prediksi harian dan per jam.

*   **`web/` (Web Application)**:
    *   Dibangun dengan **Next.js 15 (App Router)** dan **React**.
    *   Menggunakan **Tailwind CSS** untuk styling dan visualisasi data.
    *   Berfungsi sebagai antarmuka pengguna untuk melihat grafik historis, hasil prediksi AI, dan informasi edukasi.
    *   Berkomunikasi dengan layanan ML untuk mendapatkan data prediksi.

## Prasyarat Utama

Pastikan Anda telah menginstal:
*   **Python 3.10+** (untuk ML)
*   **Node.js 18+** & **npm/pnpm/yarn** (untuk Web)

## Cara Menjalankan

### 1. Menjalankan Layanan ML (Backend)

Layanan ML harus berjalan agar fitur prediksi di web dapat berfungsi.

```bash
cd ml

# Buat virtual environment (jika belum ada)
python -m venv .venv

# Aktifkan virtual environment
# Windows:
# .venv\Scripts\activate
# Linux/Mac:
source .venv/bin/activate

# Instal dependensi
pip install -r requirements.txt

# Jalankan server API
uvicorn app.main:app --reload --port 8000
```
Server ML akan berjalan di `http://localhost:8000`.

### 2. Menjalankan Aplikasi Web (Frontend)

Buka terminal baru untuk menjalankan aplikasi web.

```bash
cd web

# Instal dependensi
npm install

# Jalankan server pengembangan
npm run dev
```
Aplikasi web akan dapat diakses di `http://localhost:3000`.

## Dokumentasi Lengkap

Untuk informasi lebih detail mengenai masing-masing layanan, silakan merujuk ke README di setiap direktori:

*   [Dokumentasi ML](ml/README.md)
*   [Dokumentasi Web](web/README.md)
