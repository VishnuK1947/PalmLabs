import React from 'react';

const GuestPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-cyan-300 via-white-300 to-yellow-300">
      <h1 className="text-4xl font-bold text-white mb-4">Welcome, Guest!</h1>
      <p className="text-xl text-white">This is your basic guest page.</p>
    </div>
  );
};

export default GuestPage;