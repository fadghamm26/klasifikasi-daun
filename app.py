import io
import os
import json
from PIL import Image
import numpy as np
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

import tensorflow as tf
from tensorflow.keras.models import load_model

APP_ROOT = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__, static_url_path='', static_folder=APP_ROOT)
CORS(app)

# Load model (expects `my_model.keras` in the same directory)
MODEL_PATH = os.path.join(APP_ROOT, 'my_model.keras')
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")

model = load_model(MODEL_PATH)
# Try load labels mapping (optional). Expecting a JSON array, e.g. ["Healthy","Powdery","Rust"]
LABELS_PATH = os.path.join(APP_ROOT, 'labels.json')
labels = None
if os.path.exists(LABELS_PATH):
    try:
        with open(LABELS_PATH, 'r', encoding='utf-8') as fh:
    
            labels = json.load(fh)
            if not isinstance(labels, list):
                labels = None
    except Exception:
        labels = None

def _get_input_shape():
    # model.input_shape may be tuple like (None, h, w, c) or list for multiple inputs
    shape = model.input_shape
    if isinstance(shape, list):
        shape = shape[0]
    # drop batch dim
    return tuple(shape[1:])

def preprocess_image(img: Image.Image, target_shape):
    # target_shape is (h,w,c) or (n,)
    if len(target_shape) == 3:
        h, w, c = target_shape
        if c == 1:
            img = img.convert('L')
        else:
            img = img.convert('RGB')
        img = img.resize((w, h))
        arr = np.asarray(img)
        if c == 1:
            arr = arr.reshape((h, w, 1))
    else:
        # assume flat vector, convert to grayscale and flatten
        img = img.convert('L')
        img = img.resize((target_shape[0], 1))
        arr = np.asarray(img).astype('float32').ravel()

    arr = arr.astype('float32') / 255.0
    arr = np.expand_dims(arr, axis=0)
    return arr

@app.route('/')
def index():
    return send_from_directory(APP_ROOT, 'index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_shape = _get_input_shape()
        # accept image file
        if 'image' in request.files:
            f = request.files['image']
            img = Image.open(io.BytesIO(f.read()))
            x = preprocess_image(img, input_shape)
        else:
            # try JSON features
            data = request.get_json(force=True, silent=True)
            if not data or 'features' not in data:
                return jsonify({'error': 'No image file or JSON features provided.'}), 400
            features = np.array(data['features'], dtype='float32')
            if features.ndim == 1:
                features = np.expand_dims(features, 0)
            x = features

        preds = model.predict(x)
        try:
            preds_list = preds.tolist()
        except Exception:
            preds_list = [float(preds)]

        # Determine top index and optionally map to label name
        if np.ndim(preds) > 1:
            top_idx = int(np.argmax(preds, axis=1)[0])
            probs = np.asarray(preds)[0]
        else:
            top_idx = int(np.argmax(preds)) if hasattr(preds, 'shape') else 0
            probs = np.asarray(preds)

        top_label = None
        label_probabilities = None
        if labels is not None and len(labels) > top_idx:
            top_label = labels[top_idx]
            # build mapping label -> prob (if shapes match)
            try:
                if probs.shape[0] == len(labels):
                    label_probabilities = {labels[i]: float(probs[i]) for i in range(len(labels))}
            except Exception:
                label_probabilities = None

        response = {'predictions': preds_list, 'top_index': top_idx}
        if top_label is not None:
            response['top_label'] = top_label
        if label_probabilities is not None:
            response['label_probabilities'] = label_probabilities

        return jsonify(response)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
