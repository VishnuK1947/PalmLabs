import StreamVideo from '@/components/StreamVideo';
import React from 'react';

const GuestPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-cyan-300 via-white-300 to-yellow-300">
      <h1 className="text-4xl font-bold text-white mb-4">Palm Labs.</h1>
      <p className="text-xl text-white mb-8">[Sentence goes here]</p>
      <div className="relative">
        {/* Outer glow effect */}
        <div className="absolute inset-0 bg-cyan-400 rounded-xl blur-md"></div>
        
        {/* Big border */}
        <div className="relative bg-white rounded-xl p-4">
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-cyan-200 rounded-lg blur-sm"></div>
          
          {/* Video placeholder */}
          <div className="relative rounded-lg overflow-hidden">
            <StreamVideo/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestPage;