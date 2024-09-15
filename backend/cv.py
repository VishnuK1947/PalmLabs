from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image
import base64
import io
import time

from cv_backend.inference import DetectASL

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class FrameData(BaseModel):
    frame: str

# Placeholder for your actual inference function
def run_inference(image):
    # This is where you'd implement your actual inference logic
    # For now, we'll return dummy data
    time.sleep(0.5)  # Simulate processing time
    return ([0.8, 0.15, 0.05], ['A', 'B', 'C'], 0.5)

@app.post("/api/detect-asl")
async def detect_asl(frame_data: FrameData):
    try:
        # The frame_data is a base64 encoded string, so we need to decode it
        _, encoded = frame_data.frame.split(",", 1)
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

        return response

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)