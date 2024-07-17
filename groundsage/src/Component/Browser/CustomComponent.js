import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = (event) => {
      // Handle the back button click here
      // For example, navigate to a specific route
      navigate('/signin');
    };

    window.addEventListener('popstate', handlePopState);

    // Cleanup the listener on component unmount
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  return <div></div>;
};

export default CustomComponent;