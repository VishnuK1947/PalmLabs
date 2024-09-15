import React, { useRef, useEffect, useState } from 'react';

interface DetectionResult {
  detection: string;
  probabilities: number[];
  top_classes: string[];
  time_elapsed: number;
}

interface StreamVideoProps {
  currentLetter: string | null;
  onLetterDetected: (letter: string) => void;
}

const StreamVideo: React.FC<StreamVideoProps> = ({ currentLetter, onLetterDetected }) => {
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
          sendFrameToBackend(frameData);
        }
      }
    };

    const sendFrameToBackend = async (frameData: string): Promise<void> => {
      try {
        const response = await fetch('http://localhost:8000/api/detect-asl', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ frame: frameData }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: DetectionResult = await response.json();
        setDetectionResult(result);
        checkDetectedLetter(result.top_classes);
        setError(null);
      } catch (err) {
        console.error("Error sending frame to backend:", err);
        setError(`Failed to send frame to backend: ${err}`);
      }
    };

    const checkDetectedLetter = (topClasses: string[]) => {
      if (currentLetter && topClasses.includes(currentLetter)) {
        onLetterDetected(currentLetter);
      }
    };

    startCamera();
    intervalId = setInterval(captureFrame, 2000); // stream every 2000ms

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [currentLetter, onLetterDetected]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center p-4">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="w-full max-w-md mb-4 transform scale-x-[-1]"
        />
      </div>
      <div>
        <canvas ref={canvasRef} className="hidden" width="640" height="480" />
        {detectionResult && (
          <div className="text-lg font-bold mb-4 text-center">
            {/* <p>Top 3: {detectionResult.top_classes.join(', ')}</p> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default StreamVideo;