from fastapi import APIRouter, HTTPException
from app.schemas import PredictionResponse
from services.predictor import predict_future

router = APIRouter()

@router.get("/predict/{mode}", response_model=PredictionResponse)
def get_prediction(mode: str, symbol: str = "USDIDR=X"):
    """
    Endpoint API untuk mendapatkan prediksi harga mata uang.
    
    Args:
        mode (str): Mode prediksi, harus 'daily' atau 'hourly'.
        symbol (str, optional): Simbol mata uang (default: 'USDIDR=X').
        
    Returns:
        PredictionResponse: Objek JSON berisi hasil prediksi.
        
    Raises:
        HTTPException(400): Jika mode tidak valid.
        HTTPException(500): Jika terjadi kesalahan saat prediksi (misal model belum dilatih).
    """
    # Validasi input mode
    if mode not in ['daily', 'hourly']:
        raise HTTPException(status_code=400, detail="Mode tidak valid. Gunakan 'daily' atau 'hourly'.")
    
    try:
        # Panggil service predictor untuk melakukan prediksi
        # plot=False karena kita hanya butuh data JSON, bukan gambar
        results = predict_future(mode, symbol=symbol, plot=False)
        
        # Validasi hasil prediksi
        if not results:
            raise HTTPException(status_code=500, detail=f"Prediksi gagal untuk {symbol}. Pastikan model sudah dilatih.")
            
        # Kembalikan respons sesuai skema Pydantic
        return dict(
            symbol=symbol,
            mode=mode,
            data=results
        )
    except Exception as e:
        # Tangkap error kustom dan kembalikan sebagai 500 Internal Server Error
        raise HTTPException(status_code=500, detail=str(e))
