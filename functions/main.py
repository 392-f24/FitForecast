from firebase_functions import https_fn
from firebase_admin import initialize_app
from flask_cors import CORS
from flask import Flask, jsonify, request

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins

# Initialize Firebase Admin SDK
initialize_app()

# Define the cloud function
@https_fn.on_request()
def on_request_example(req: https_fn.Request) -> https_fn.Response:
    # Handle CORS preflight requests (OPTIONS)
    if req.method == 'OPTIONS':
        response = https_fn.Response(status=204)  # 204 No Content for OPTIONS preflight
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response

    # Actual function logic
    response_data = {"data": {"message": "Hello from Firebase function using httpsCallable!"}}
    response = jsonify(response_data)
    response.headers['Access-Control-Allow-Origin'] = '*'  # Allow all origins for actual requests
    return response
