import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";

const MyProfile = () => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [showCircularProgress, setShowCircularProgress] = useState(false);
  const [lastEmailUpdate, setLastEmailUpdate] = useState(null);
  const [lastYearUpdate, setLastYearUpdate] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/users", {
        token: localStorage.getItem("token"),
      });
      const userData = response.data;
      setName(userData.name);
      setDepartment(userData.department);
      setEmail(userData.email);
      setUserType(userData.userType);
      setExtraInfo(userData.extraInfo);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    setShowCircularProgress(true);
    setLoading(true);
    try {
      const currentTime = new Date().getTime();
      const emailUpdateAllowed = !lastEmailUpdate || currentTime - lastEmailUpdate > 30 * 24 * 60 * 60 * 1000;
      const yearUpdateAllowed = !lastYearUpdate || currentTime - lastYearUpdate > 30 * 24 * 60 * 60 * 1000;
  
      if (!emailUpdateAllowed && !yearUpdateAllowed) {
        throw new Error("Year can only be updated once in 30 days.");
      }
  
      await axios.put("http://localhost:8000/api/users", {
        name,
        department,
        userType,
        email,
        extraInfo,
      });
  
      console.log("Profile updated successfully");
      setAlertMessage("Profile updated successfully");
      setAlertType("success");
      
      if (!lastEmailUpdate) {
        setLastEmailUpdate(currentTime);
      }
  
      if (!lastYearUpdate) {
        setLastYearUpdate(currentTime);
      }
    } catch (error) {
      setAlertMessage(error.message);
      setAlertType("error");
      console.error("Error updating profile:", error);
    } finally {
      setTimeout(() => {
        setLoading(false); // Set loading back to false after 2 seconds
        setShowCircularProgress(false);
        setShowAlert(true); // Show the alert after circular progress is completed
        setTimeout(() => {
          setShowAlert(false);
        }, 1000); // Hide the alert after 5 seconds
      }, 2000);
    }
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
    <Container
      sx={{
        height: "80%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
        // backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h4" sx={{ ...styles.alegreyaFont }} gutterBottom>
        Edit Profile
      </Typography>
      <Box
        sx={{
          width: "100%",
          maxWidth: "650px",
          backgroundColor: "#FFF6E0",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <TextField
          label="Name"
          color="secondary"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{
            marginBottom: "20px",
            "& .MuiInputBase-input": {
              fontFamily: '"Playfair Display", serif',
            },
            "& .MuiInputLabel-root": {
              fontFamily: '"Alegreya", serif',
            },
          }}
        />
        <TextField
          label="Department"
          color="secondary"
          variant="outlined"
          fullWidth
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          sx={{
            marginBottom: "20px",
            "& .MuiInputBase-input": {
              fontFamily: '"Playfair Display", serif',
            },
            "& .MuiInputLabel-root": {
              fontFamily: '"Alegreya", serif',
            },
          }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          disabled
          sx={{
            marginBottom: "20px",
            "& .MuiInputBase-input": {
              fontFamily: '"Playfair Display", serif',
            },
            "& .MuiInputLabel-root": {
              fontFamily: '"Alegreya", serif',
            },
          }}
        />
        <TextField
          label="Year"
          color="secondary"
          variant="outlined"
          fullWidth
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
          sx={{
            marginBottom: "20px",
            "& .MuiInputBase-input": {
              fontFamily: '"Playfair Display", serif',
            },
            "& .MuiInputLabel-root": {
              fontFamily: '"Alegreya", serif',
            },
          }}
        />
        <Button
          variant="contained"
          
          onClick={updateProfile}
          sx={{
            marginRight: "10px",
            fontFamily: '"Alegreya", serif',
            color: "#FFF6E0",
            bgcolor: "#892CDC",
            "&:hover":{bgcolor:'#52057B'}
          }}
        >
          Update Profile
        </Button>
      </Box>
      {showCircularProgress && <CircularProgress color="secondary"/>}
      {showAlert && (
        <Typography
          variant="body1"
          sx={{
            padding: "15px",
            borderRadius: "5px",
            marginBottom: "20px",
            fontSize: "16px",
            backgroundColor: alertType === "success" ? "#d4edda" : "#f8d7da",
            color: alertType === "success" ? "#155724" : "#721c24",
            ...styles.playfairDisplayFont
          }}
        >
          {alertMessage}
        </Typography>
      )}
    </Container>
  );
};

export default MyProfile; 