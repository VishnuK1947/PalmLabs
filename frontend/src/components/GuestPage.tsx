import React from 'react';

const GuestPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-cyan-300 via-white-300 to-yellow-300">
      <h1 className="text-4xl font-bold text-white mb-4">Welcome, Guest!</h1>
      <p className="text-xl text-white mb-8">This is your booty guest page.</p>
      <div className="relative">
        {/* Outer glow effect */}
        <div className="absolute inset-0 bg-cyan-400 rounded-xl blur-md"></div>
        
        {/* Big border */}
        <div className="relative bg-white rounded-xl p-4">
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-cyan-200 rounded-lg blur-sm"></div>
          
          {/* Video placeholder */}
          <div className="relative bg-black rounded-lg overflow-hidden">
            <img 
              src="/api/placeholder/400/300" 
              alt="Guest Video"
              className="w-96 h-64 object-cover"
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white bg-opacity-75 rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-16 border-l-cyan-500 border-b-8 border-b-transparent ml-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestPage;