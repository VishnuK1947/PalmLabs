import React from 'react';

const RegenerateButton: React.FC = () => {
  const handleRegenerate = async () => {
    try {
      // Make the POST API call to /run-llm
      const response = await fetch('http://localhost:8000/api/run-llm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add any necessary body data here
        // body: JSON.stringify({ key: 'value' }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }


      // Force reload the page
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
      // Optionally, you can still reload the page even if there's an error
      // window.location.reload();
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');
        .guest-button {
          background-color: rgba(73, 139, 138, 0.4);
          border: 0px solid white;
          color: #498B8A;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          transition: all 0.3s ease-in-out;
          padding: 0.25rem 0.75rem;
          font-size: 0.75rem;
          margin-top: 1rem;
          box-shadow: 0 0 10px 3px rgba(0, 255, 255, 0.3);
        }
        .guest-button:hover {
          background-color: white;
          color: #498B8A;
          box-shadow: 0 0 15px 5px rgba(0, 255, 255, 0.5);
        }
      `}</style>
      <button
        className="guest-button text-sm font-medium m-4"
        onClick={handleRegenerate}
      >
        Regenerate
      </button>
    </>
  );
};

export default RegenerateButton;