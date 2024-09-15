import StreamVideo from '@/components/StreamVideo';
import React, { useState, useEffect } from 'react';

const getText = async (): Promise<string> => {
  try {
    const response = await fetch('http://localhost:8000/api/asl-text', {
      method: 'GET',
      headers: {
        'Accept': 'text/plain',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.text();
    return result.toUpperCase(); // Convert to uppercase for consistency
  } catch (err) {
    console.error("Error fetching ASL text:", err);
    return "Failed to fetch ASL text";
  }
};

const GuestPage: React.FC = () => {
  const [sentence, setSentence] = useState<string>("Loading...");
  const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(-1);
  const [detectedLetters, setDetectedLetters] = useState<string[]>([]);

  useEffect(() => {
    const fetchText = async () => {
      const text = await getText();
      setSentence(text);
      moveToNextLetter(-1, text);
    };
    fetchText();
  }, []);

  useEffect(() => {
    if (detectedLetters.length > 0) {
      moveToNextLetter(currentLetterIndex, sentence);
    }
  }, [detectedLetters]);

  const moveToNextLetter = (currentIndex: number, text: string) => {
    let nextIndex = currentIndex + 1;
    while (nextIndex < text.length && !isValidLetter(text[nextIndex])) {
      nextIndex++;
    }
    if (nextIndex < text.length) {
      setCurrentLetterIndex(nextIndex);
    } else {
      setCurrentLetterIndex(-1);
    }
  };

  const isValidLetter = (char: string) => {
    return /^[A-Z]$/.test(char);
  };

  const getCurrentLetter = () => {
    if (currentLetterIndex >= 0 && currentLetterIndex < sentence.length) {
      return sentence[currentLetterIndex];
    }
    return null;
  };

  const onLetterDetected = (letter: string) => {
    if (letter === getCurrentLetter()) {
      setDetectedLetters(prev => [...prev, letter]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-cyan-300 via-white-300 to-yellow-300 p-4">
      <h1 className="text-4xl font-bold text-white mb-4">Palm Labs.</h1>
      
      <p className="text-xl text-white mb-8 text-center">
        {sentence.split('').map((char, index) => (
          <span key={index} className={`
            ${index === currentLetterIndex ? 'bg-yellow-300 text-black' : ''}
            ${index < currentLetterIndex && isValidLetter(char) ? 'text-gray-400' : ''}
            ${isValidLetter(char) ? 'px-1' : ''}
          `}>
            {char}
          </span>
        ))}
      </p>
      
      {getCurrentLetter() && (
        <div className="mb-8">
          <p className="text-lg text-white mb-2">Sign this letter:</p>
          <div className="text-6xl font-bold bg-white text-black rounded-full w-24 h-24 flex items-center justify-center shadow-lg">
            {getCurrentLetter()}
          </div>
        </div>
      )}

      {currentLetterIndex === -1 && sentence !== "Loading..." && (
        <p className="text-2xl text-white font-bold mb-8">Great job! You've completed the sentence.</p>
      )}

      <div className="relative">
        <div className="absolute inset-0 bg-cyan-400 rounded-xl blur-md"></div>
        <div className="relative bg-white rounded-xl p-4">
          <div className="absolute inset-0 bg-cyan-200 rounded-lg blur-sm"></div>
          <div className="relative rounded-lg overflow-hidden">
            <StreamVideo
              currentLetter={getCurrentLetter()}
              onLetterDetected={onLetterDetected}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestPage;