import React, { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Snackbar, Box, Paper, Slide } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/system';

// Styled component for the container
const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '20px',
});

// Styled component for the text fields
const StyledTextField = styled(TextField)({
  marginBottom: '20px',
  
});


// Styled component for the paper container
const StyledPaper = styled(Paper)({
  padding: '20px',
  maxWidth: '600px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

// Custom Slide transition component
function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

const SendNotification = () => {
  const [senderName, setSenderName] = useState(localStorage.getItem('userName') || '');
  const [message, setMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleMessageSubmit = async () => {
    if (!senderName.trim() || !message.trim()) {
      setAlertMessage('Sender name or message is empty. Please enter both.');
      setOpenSnackbar(true);
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/messages', { senderName, text: message });
      setMessage('');
      setAlertMessage('Notification sent successfully!');
      setOpenSnackbar(true);
    } catch (error) {
      console.error(error);
      setAlertMessage('Error sending notification. Please try again later.');
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  const styles = {
    meriendaFont: {
      fontFamily: '"Merienda", cursive',
      fontOpticalSizing: "auto",
      fontWeight: "<weight>", // Replace <weight> with the desired font weight
      fontStyle: "normal",
    },
    shantellSansFont: {
      fontFamily: '"Shantell Sans", cursive',
      fontOpticalSizing: "auto",
      fontWeight: "<weight>", // Replace <weight> with the desired font weight
      fontStyle: "normal",
      fontVariationSettings: '"BNCE" 0, "INFM" 0, "SPAC" 0',
    },
    alegreyaFont: {
      fontFamily: '"Alegreya", serif',
      fontOpticalSizing: "auto",
      fontWeight: "<weight>", // Replace <weight> with the desired font weight
      fontStyle: "normal",
    },
    playfairDisplayFont: {
      fontFamily: '"Playfair Display", serif',
      fontOpticalSizing: "auto",
      fontWeight: "<weight>", // Replace <weight> with the desired font weight
      fontStyle: "normal",
    },
  };

  return (
    <Container sx={{padding:"10px"}}>
      <Typography variant="h4" sx={{ ...styles.alegreyaFont }} gutterBottom className="sendh1">
        Send Notification
      </Typography>
      <StyledPaper elevation={3} sx={{backgroundColor: "#FFF6E0"}}>
        <StyledTextField
          type="text"
          color="secondary"
          placeholder="Sender's Name"
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{ "& .MuiInputBase-input": {
            fontFamily: '"Playfair Display", serif',
          }}}
        />
        <StyledTextField
          type="text"
          color="secondary"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          sx={{ "& .MuiInputBase-input": {
            fontFamily: '"Playfair Display", serif',
          }}}
        />
        <Button
          variant="contained"
          onClick={handleMessageSubmit}
          endIcon={<SendIcon />}
          sx={{
            marginRight: "10px",
            fontFamily: '"Alegreya", serif',
            color: "#FFF6E0",
            bgcolor: "#892CDC",
            "&:hover":{bgcolor:'#52057B'}
          }}
        
        >
          Send
        </Button>
      </StyledPaper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={alertMessage}
        TransitionComponent={TransitionUp} // Apply custom slide transition
      />
    </Container>
  );
};

export default SendNotification;