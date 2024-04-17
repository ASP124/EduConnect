import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Button, Box, Slide } from "@mui/material";

const Notification = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/messages")
      .then((response) => setMessages(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleClearMessages = () => {
    axios
      .delete("http://localhost:8000/api/messages")
      .then(() => setMessages([]))
      .catch((error) => console.error(error));
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
    <Container disableGutters >
      <Typography variant="h5" sx={{ ...styles.alegreyaFont }} gutterBottom>
        Notifications
      </Typography>
      <Box sx={{maxHeight: "60vh",
    overflow: "auto"}}>
        {messages.map((msg, index) => (
          <Slide
            direction="up"
            in={true}
            mountOnEnter
            unmountOnExit
            key={msg._id}
            // Adjust the transition duration (milliseconds)
            sx={{
              timeout: 300,
              transitionTimingFunction: "ease-out", // Adjust the easing function
            }}
          >
            <Box
            //   sx={{
            //     backgroundColor: "#cccccc",
            //     marginBottom: "5px",
            //     padding: "4px",
            //     borderRadius: "5px",

            //   }}
            >
              <Typography
                variant="subtitle1"
                style={{
                  fontSize: "18px",
                  backgroundColor: "#cccccc",
                  ...styles.alegreyaFont,
                }}
              >
                Prof. {msg.senderName}:
              </Typography>
              <Typography
                variant="body1"
                style={{
                  backgroundColor: "#cccccc",
                  ...styles.playfairDisplayFont,
                  marginBottom: "5px",
                }}
              >
                {msg.text}
              </Typography>
            </Box>
          </Slide>
        ))}
      </Box>
      
    </Container>
  );
};

export default Notification;
