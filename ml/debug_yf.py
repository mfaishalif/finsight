import yfinance as yf

print(f"YFinance Version: {yf.__version__}")
try:
    import curl_cffi
    print(f"curl_cffi Version: {curl_cffi.__version__}")
except ImportError:
    print("curl_cffi not installed")

symbol = "USDIDR=X"
print(f"Attempting to download {symbol}...")
data = yf.download(symbol, period="1mo", interval="1d")

if not data.empty:
    print("Success! Data shape:", data.shape)
    print(data.head())
else:
    print("Failed: Empty DataFrame")
