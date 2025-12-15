from pydantic import BaseModel
from typing import List

class ForecastItem(BaseModel):
    """
    Model data untuk satu titik prediksi.
    """
    step: int        # Langkah ke-berapa (1, 2, 3...)
    timestamp: str   # Waktu dalam format ISO
    value: float     # Nilai prediksi (Harga)

class PredictionResponse(BaseModel):
    """
    Model respons API standar.
    """
    symbol: str              # Simbol mata uang (cth: USDIDR=X)
    mode: str                # Mode prediksi (daily/hourly)
    data: List[ForecastItem] # Daftar hasil prediksi
