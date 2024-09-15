from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image
import base64
import io
import time
import numpy as np
import cv2
import mediapipe as mp

from cv_backend.inference import DetectASL

app = FastAPI()
asl = DetectASL("cv_backend/asl_1")

# initialize hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=False, max_num_hands=1, min_detection_confidence=0.5)
mp_drawing = mp.solutions.drawing_utils

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],  # Allows all headers
)

class FrameData(BaseModel):
    frame: str

# Placeholder for your actual inference function

def pre_process(image_data):
    # Convert to numpy array
    nparr = np.frombuffer(image_data, np.uint8)
    
    # Decode the image using OpenCV
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Convert BGR to RGB
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # Process the image and get hand landmarks
    results = hands.process(image_rgb)

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:

            h, w, _ = image.shape       # check
            x_max, y_max = 0, 0
            x_min, y_min = w, h
            for lm in hand_landmarks.landmark:
                x, y = int(lm.x * w), int(lm.y * h)
                if x > x_max:
                    x_max = x
                if x < x_min:
                    x_min = x
                if y > y_max:
                    y_max = y
                if y < y_min:
                    y_min = y

            # Add padding to the bounding box
            padding = 80
            y_min = max(0, y_min - padding)
            y_max = min(h, y_max + padding)
            x_min = max(0, x_min - padding)
            x_max = min(w, x_max + padding)

            # Extract hand region
            hand_region = image[y_min:y_max, x_min:x_max]
            ret = True
    else:
        hand_region = None
        ret = False

    return hand_region, ret


@app.post("/api/detect-asl")
async def detect_asl(frame_data: FrameData):
    try:
        # Decode the base64 image
        _, encoded = frame_data.frame.split(",", 1)
        image_data = base64.b64decode(encoded)

        hand_image, ret = pre_process(image_data)

        # Run inference
        if ret:
            probabilities, top_classes, time_elapsed = asl.run_inference(hand_image)
            
            response = {
                "detection": top_classes[0],
                "probabilities": probabilities,
                "top_classes": top_classes,
                "time_elapsed": round(time_elapsed,3)
            }
        else:
            response = None
        
        
        return response

    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    
@app.get("/api/asl-text")
async def get_asl():
    try:
        # get text response from database

        # IMPLEMENT LATER
        # IMPLEMENT LATER
        # IMPLEMENT LATER

        response = "Show want"
        
        return response

    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)