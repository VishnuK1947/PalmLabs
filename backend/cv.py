from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import io
from PIL import Image
import time

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Placeholder for your actual inference function
def run_inference(image):
    # This is where you'd implement your actual inference logic
    # For now, we'll return dummy data
    time.sleep(0.5)  # Simulate processing time
    return ([0.8, 0.15, 0.05], ['A', 'B', 'C'], 0.5)

@app.route('/api/detect-asl', methods=['POST'])
def detect_asl():
    try:
        # Get the frame data from the request
        data = request.json
        frame_data = data['frame']

        # The frame_data is a base64 encoded string, so we need to decode it
        _, encoded = frame_data.split(",", 1)
        image_data = base64.b64decode(encoded)

        # Convert to PIL Image
        image = Image.open(io.BytesIO(image_data))

        # Run inference
        probabilities, top_classes, time_elapsed = run_inference(image)

        # Prepare the response
        response = {
            "detection": top_classes[0],  # Return the top class
            "probabilities": probabilities,
            "top_classes": top_classes,
            "time_elapsed": time_elapsed
        }

        return jsonify(response), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)