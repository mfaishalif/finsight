from fastapi import FastAPI
from app.routers import predict

# Inisialisasi aplikasi FastAPI
# Title dan Version akan muncul di dokumentasi otomatis (/docs)
app = FastAPI(title="Finsight ML API", version="1.0")

# Daftarkan router dari modul lain
app.include_router(predict.router)

@app.get("/")
def read_root():
    """
    Endpoint root untuk pengecekan kesehatan (Health Check).
    """
    return {"status": "ok", "service": "Finsight ML API"}
