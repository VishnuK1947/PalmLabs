from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image
import base64
import io
import time
import numpy as np
import cv2

from cv_backend.inference import DetectASL

app = FastAPI()
asl = DetectASL("cv_backend/asl_1")

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

@app.post("/api/detect-asl")
async def detect_asl(frame_data: FrameData):
    try:
        # Decode the base64 image
        _, encoded = frame_data.frame.split(",", 1)
        image_data = base64.b64decode(encoded)

        # Convert to numpy array
        nparr = np.frombuffer(image_data, np.uint8)
        
        # Decode the image using OpenCV
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        print(f"Image received shape: {image.shape}")

        # Convert BGR to RGB
        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        print(f"Image converted to RGB")
        
        # Resize the image
        resized_image = cv2.resize(image_rgb, (64, 64))
        print(f"Image resized to shape: {resized_image.shape}")

        # Run inference
        probabilities, top_classes, time_elapsed = asl.run_inference(resized_image)

        # Prepare the response
        response = {
            "detection": top_classes[0],
            "probabilities": probabilities,
            "top_classes": top_classes,
            "time_elapsed": time_elapsed
        }
        
        return response

    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)