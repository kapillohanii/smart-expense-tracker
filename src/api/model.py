from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import re
import joblib


def preProcess_data(text):
    text = str(text).lower()
    new_text = re.sub('[^a-zA-z0-9\s]','',text)
    new_text = re.sub('rt', '', new_text)
    return new_text


# Create a Flask app
app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Load the saved pipeline model
pipeline = joblib.load('./src/api/expense_pipeline.joblib')

# Define an API endpoint
@app.route('/predict', methods=['POST'])
def predict():
    # Get the input data from the request
    data = request.get_json()
    if data['descriptions']==[]:
        return jsonify({'categories': []})
        
    data = np.array(data['descriptions']);
    # Preprocess the input data (if required)
    data = np.array(data).astype(object)
    data = pd.DataFrame(data)
    data[0] = data[0].apply(preProcess_data) 
       
    predictions = pipeline.predict(data[0].values).astype('U')
    # Postprocess the predictions (if required)
    for i in range(predictions.size):
        if predictions[i][0]=='f':
            predictions[i] = 'Food & Grocery'
        predictions[i] = predictions[i].capitalize()
    

    print({'predictions': predictions.tolist()})
    # Return the predictions as a JSON response
    return jsonify({'categories': predictions.tolist()})

# Run the Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
