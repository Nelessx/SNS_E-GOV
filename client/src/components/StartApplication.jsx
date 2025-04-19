import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const StartApplication = () => {
  const navigate = useNavigate();

  const handleStartApplication = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.info('Please login first to start your application');
      navigate('/login', { state: { from: '/apply' } });
      return;
    }
    navigate('/apply');
  };

  return (
    <button
      onClick={handleStartApplication}
      className="bg-white text-black font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
    >
      Start Application
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5" 
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path 
          fillRule="evenodd" 
          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
          clipRule="evenodd" 
        />
      </svg>
    </button>
  );
};

export default StartApplication; 