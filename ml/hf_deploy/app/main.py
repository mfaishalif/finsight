from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import predict

# Inisialisasi aplikasi FastAPI
# Title dan Version akan muncul di dokumentasi otomatis (/docs)
app = FastAPI(title="Finsight ML API", version="1.0")

# Konfigurasi CORS (Cross-Origin Resource Sharing)
# Agar frontend (Next.js di port 3000) bisa mengakses API ini (di port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Dalam produksi, batasi ke domain frontend (cth: "http://localhost:3000")
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Daftarkan router dari modul lain
# Daftarkan router dari modul lain
app.include_router(predict.router)

@app.get("/")
def read_root():
    """
    Endpoint root untuk pengecekan kesehatan (Health Check).
    """
    return {"status": "ok", "service": "Finsight ML API"}
