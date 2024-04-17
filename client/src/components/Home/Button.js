import React from 'react';
import { Link, useTheme } from 'react-router-dom';
import { Button, Box } from '@mui/material';

const Button = ({
  children,
  type,
  onClick,
  buttonStyle = 'primary', // Default to primary
  buttonSize = 'medium',  // Default to medium
}) => {
  const theme = useTheme();

  return (
    <Link to="/signup" component={Box} sx={{ display: 'inline-flex' }}>
      <Button
        onClick={onClick}
        variant={buttonStyle === 'outline' ? 'outlined' : 'contained'}
        color={buttonStyle === 'primary' ? 'primary' : 'default'}
        size={buttonSize}
        type={type}
      >
        {children}
      </Button>
    </Link>
  );
};

export default Button;

