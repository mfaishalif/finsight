from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import LSTM, Dense, Dropout
import matplotlib.pyplot as plt
import os
from services.data_service import load_and_process_data

def build_model(input_shape, output_units, units=50, dropout_rate=0.2):
    """
    Membangun dan mengkompilasi model LSTM.
    
    Arsitektur:
    1. LSTM Layer 1 (Return Sequences=True untuk stack LSTM)
    2. Dropout Layer (Mencegah overfitting)
    3. LSTM Layer 2
    4. Dropout Layer
    5. LSTM Layer 3 (Layer terakhir tidak return sequence, hanyak output vector)
    6. Dropout Layer
    7. Dense Layer (Output Layer, jumlah neuron = jumlah langkah prediksi)
    
    Args:
        input_shape (tuple): Bentuk input data (time_steps, features)
        output_units (int): Jumlah prediksi ke depan (7 hari / 24 jam)
        units (int): Jumlah neuron per layer LSTM
        dropout_rate (float): Persentase neuron yang dimatikan saat training
        
    Returns:
        Model Keras yang sudah dikompilasi
    """
    model = Sequential()

    # Layer LSTM Pertama
    model.add(LSTM(units=units, return_sequences=True, input_shape=input_shape))
    model.add(Dropout(dropout_rate))

    # Layer LSTM Kedua
    model.add(LSTM(units=units, return_sequences=True))
    model.add(Dropout(dropout_rate))

    # Layer LSTM Ketiga
    model.add(LSTM(units=units))
    model.add(Dropout(dropout_rate))

    # Layer Output (Dense)
    model.add(Dense(units=output_units))

    # Kompilasi Model menggunakan Adam Optimizer dan Mean Squared Error
    model.compile(optimizer='adam', loss='mean_squared_error')
    
    return model

def train_model(conf, symbol='USDIDR=X'):
    """
    Fungsi utama untuk melatih model LSTM.
    Melakukan proses end-to-end: Load Data -> Build Model -> Train -> Save -> Eval.
    
    Args:
        conf (Config): Objek konfigurasi (Hourly/Daily)
        symbol (str): Simbol mata uang yang akan dilatih
    """
    print(f"Memulai pelatihan mode {conf.MODE.upper()} untuk {symbol}...")
    
    # Dapatkan path dinamis berdasarkan simbol
    paths = conf.get_paths(symbol)

    # 1. Load dan Proses Data
    X_train, y_train, X_test, y_test, scaler = load_and_process_data(conf, symbol, paths['scaler'], save_scaler=True)
    
    print(f"Data latih shape: {X_train.shape}")
    print(f"Data uji shape: {X_test.shape}")

    # 2. Bangun Model
    model = build_model(
        input_shape=(X_train.shape[1], 1),
        output_units=conf.PREDICTION_STEPS,
        units=conf.UNITS,
        dropout_rate=conf.DROPOUT_RATE
    )
    # Tampilkan ringkasan arsitektur model di terminal
    model.summary()

    # 3. Latih Model (Fitting)
    history = model.fit(
        X_train, y_train,
        epochs=conf.EPOCHS,
        batch_size=conf.BATCH_SIZE,
        validation_data=(X_test, y_test),
        verbose=1 # Tampilkan progress bar
    )

    # 4. Simpan Model (.h5)
    os.makedirs(os.path.dirname(paths['model']), exist_ok=True)
    model.save(paths['model'])
    print(f"Model berhasil disimpan ke {paths['model']}")

    # 5. Plot Loss (Grafik Penurunan Error)
    plt.figure(figsize=(10, 6))
    plt.plot(history.history['loss'], label='Train Loss (Error Latih)')
    plt.plot(history.history['val_loss'], label='Validation Loss (Error Validasi)')
    plt.title(f'Model Loss ({conf.MODE.upper()} - {symbol})')
    plt.xlabel('Epochs (Iterasi)')
    plt.ylabel('Loss (MSE)')
    plt.legend()
    plt.savefig(paths['loss_plot'])
    print(f"Grafik Loss disimpan ke {paths['loss_plot']}")

    # 6. Evaluasi pada Data Test (Visualisasi Prediksi vs Asli)
    predictions = model.predict(X_test)
    
    # Kita hanya memplot langkah pertama (Step 1) untuk melihat trend umum
    # Inverse transform untuk mengembalikan nilai ke harga asli (Rupiah/Dollar)
    pred_step1 = scaler.inverse_transform(predictions[:, 0].reshape(-1, 1))
    actual_step1 = scaler.inverse_transform(y_test[:, 0].reshape(-1, 1))

    plt.figure(figsize=(10, 6))
    plt.plot(actual_step1, color='blue', label=f'Harga Asli (Next {conf.TIME_UNIT[:-1]})')
    plt.plot(pred_step1, color='red', label=f'Harga Prediksi (Next {conf.TIME_UNIT[:-1]})')
    plt.title(f'Prediksi Mata Uang ({conf.MODE} - {symbol})')
    plt.xlabel(f'Waktu ({conf.TIME_UNIT})')
    plt.ylabel('Harga')
    plt.legend()
    plt.savefig(paths['prediction_plot'])
    print(f"Grafik Prediksi disimpan ke {paths['prediction_plot']}")
