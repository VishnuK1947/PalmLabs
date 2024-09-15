import React, { useRef, useEffect, useState } from 'react';

interface DetectionResult {
  detection: string;
  probabilities: number[];
  top_classes: string[];
  time_elapsed: number;
}

const StreamVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let intervalId: NodeJS.Timeout | null = null;

    const startCamera = async (): Promise<void> => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing the camera:", err);
        setError("Failed to access camera");
      }
    };

    const captureFrame = (): void => {
      if (videoRef.current && canvasRef.current) {
        const context = canvasRef.current.getContext('2d');
        if (context) {
          context.scale(-1, 1);
          context.drawImage(videoRef.current, -canvasRef.current.width, 0, canvasRef.current.width, canvasRef.current.height);
          context.scale(-1, 1);
          const frameData = canvasRef.current.toDataURL('image/jpeg');
          console.log("Frame captured, sending to backend...");
          sendFrameToBackend(frameData);
        }
      }
    };

    const sendFrameToBackend = async (frameData: string): Promise<void> => {
      try {
        console.log("Sending request to backend...");
        const response = await fetch('http://localhost:8000/api/detect-asl', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ frame: frameData }),
        });
        console.log("Received response from backend");
        console.log(response)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: DetectionResult = await response.json();
        console.log("Parsed response:", result);
        setDetectionResult(result);
        setError(null);
      } catch (err) {
        console.error("Error sending frame to backend:", err);
        setError(`Failed to send frame to backend: ${err}`);
      }
    };

    startCamera();
    intervalId = setInterval(captureFrame, 2000); // stream every 2000

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted 
        className="w-full max-w-md mb-4 transform scale-x-[-1]"
      />
      <canvas ref={canvasRef} className="hidden" width="640" height="480" />
      {error && (
        <div className="text-red-500 font-bold mb-4">
          Error: {error}
        </div>
      )}
      {detectionResult && (
        <div className="text-lg font-bold">
          <p>Detected ASL: {detectionResult.detection}</p>
          <p>Top 3 Classes: {detectionResult.top_classes}</p>
          <p>Time Elapsed: {detectionResult.time_elapsed} seconds</p>
        </div>
      )}
    </div>
  );
};

export default StreamVideo;