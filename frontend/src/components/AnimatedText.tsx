import React, { useState, useEffect } from 'react';

const AnimatedText: React.FC = () => {

  return (
    <div className="relative">
      <p className="usc-gradient-text text-4xl font-bold mb-4">Amazing job!</p>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .usc-gradient-text {
          background: linear-gradient(270deg, #990000, #FFC72C);
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }
      `}} />
    </div>
  );
};

export default AnimatedText;