import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

const images = [
  '/images/11.jpg',
  '/images/12.jpg',
  '/images/13.jpg',
  '/images/14.jpg',
  '/images/15.jpg',
];

const DashboardContent = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setFadeIn(true);
      }, 500); // Time for fade out
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="90.6vh" // Adjust this value according to your layout
        overflow="hidden"
        position="relative"
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={process.env.PUBLIC_URL + image}
            alt={`Image ${index + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              transition: 'opacity 2s ease',
              opacity: currentImageIndex === index ? 1 : 0,
            }}
          />
        ))}
      </Box>
    </div>
  );
};

export default DashboardContent;
