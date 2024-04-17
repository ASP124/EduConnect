import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  MenuItem,
  FormControl,
  Select,
  IconButton, // Added IconButton for password visibility toggle
  InputAdornment, // Added InputAdornment for IconButton placement
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Added icons for password visibility toggle
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";

const Signup = ({ onSlide }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    department: "",
    userType: "Student",
    year: "",
    specialCode: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false, // Added state for password visibility toggle
    showConfirmPassword: false, // Added state for password visibility toggle
  });
  const [error, setError] = useState("");
  const [passwordCriteriaError, setPasswordCriteriaError] = useState("");

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleShowPasswordToggle = (field) => () => {
    setData({ ...data, [field]: !data[field] });
  };

  const isPasswordValid = (password) => {
    // The regex should match if the password contains at least 1 uppercase letter, 1 number, 1 symbol, and is at least 8 characters long
    const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let passwordError = "";
    let specialCodeError = "";
  
    if (data.password !== data.confirmPassword) {
      passwordError = "Passwords do not match.";
    } else if (!isPasswordValid(data.password)) {
      passwordError =
        "Password must contain at least 1 uppercase letter, 1 number, 1 symbol, and be at least 8 characters long.";
    }
  
    if (data.userType === "Faculty") {
      if (!data.specialCode) { // Check if special code is provided
        specialCodeError = "Special code is required for creating a faculty account.";
      } else {
        const allowedCodes = ["AEIOU1", "A1B2C3", "ABC123"];
        if (!allowedCodes.includes(data.specialCode)) {
          specialCodeError = "Invalid special code for creating a faculty account.";
        }
      }
    }
  
    setPasswordCriteriaError(passwordError);
    setError(specialCodeError);
  
    if (passwordError || specialCodeError) {
      setTimeout(() => {
        setPasswordCriteriaError("");
        setError("");
      }, 5000);
      return;
    }
    
    try {
      const url = "http://localhost:8000/api/users/signup";
      const postData = {
        name: data.name,
        department: data.department,
        userType: data.userType,
        email: data.email,
        password: data.password,
      };
  
      if (data.userType === "Student") {
        postData.extraInfo = data.year;
      } else {
        postData.extraInfo = data.specialCode;
      }
  
      const { data: res } = await axios.post(url, postData);
      localStorage.setItem("userType", data.userType);
      localStorage.setItem("userName", data.name);
      localStorage.setItem("userEmail", data.email);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
  
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    }
  };
  
  const defaultTheme = createTheme();
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
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          paddingLeft: "135px",
          paddingRight: "135px",
          paddingTop: "35px",
          paddingBottom: "35px",
          backgroundColor: "#fffbf2",
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={4}
          md={7}
          sx={{
            position: "relative",
            zIndex: 0,
          }}
        >
          <Paper
            elevation={9} // Add elevation here
            sx={{
              height: "100%",
              backgroundImage:
                "url(https://source.unsplash.com/random?library)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "30px",
            backgroundColor: "#FFF6E0",
          }}
        >
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              textDecoration: "none",
              mb: "10px",
            }}
          >
            <SchoolRoundedIcon sx={{ color: "#892CDC", marginRight: 1 }} />
            <Typography
              variant="h6"
              component="div"
              sx={{
                ...styles.meriendaFont,
                fontSize: "1.2rem",
                color: "#892CDC",
              }}
            >
              EDUCONNECT
            </Typography>
          </Box>
          <Typography
            component="h1"
            variant="h5"
            mb={3}
            sx={{ ...styles.alegreyaFont, marginBottom: "0px" }}
          >
            Create Your Account
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: "100%" }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  color="secondary"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={data.name}
                  onChange={handleChange}
                  sx={{
                    my: 1,

                    "& .MuiInputLabel-root": {
                      fontFamily: '"Merienda", bold', // Font for the label
                    },
                    "& .MuiInputBase-input": {
                      fontFamily: '"Playfair Display", serif', // Font for the input text
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  color="secondary"
                  margin="normal"
                  required
                  fullWidth
                  id="department"
                  label="Department"
                  name="department"
                  autoComplete="department"
                  value={data.department}
                  onChange={handleChange}
                  sx={{
                    my: 1,

                    "& .MuiInputLabel-root": {
                      fontFamily: '"Merienda", bold', // Font for the label
                    },
                    "& .MuiInputBase-input": {
                      fontFamily: '"Playfair Display", serif', // Font for the input text
                    },
                  }} // Reduced padding
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  sx={{
                    my: 1,

                    "& .MuiInputLabel-root": {
                      fontFamily: '"Merienda", bold', // Font for the label
                    },
                    "& .MuiInputBase-input": {
                      fontFamily: '"Playfair Display", serif', // Font for the input text
                    },
                  }}
                  color="secondary"
                >
                  <Select
                    labelId="userType-label"
                    id="userType"
                    value={data.userType}
                    onChange={handleChange}
                    name="userType"
                  >
                    <MenuItem
                      value="Student"
                      sx={{ ...styles.playfairDisplayFont }}
                    >
                      Student
                    </MenuItem>
                    <MenuItem
                      value="Faculty"
                      sx={{ ...styles.playfairDisplayFont }}
                    >
                      Faculty
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {data.userType === "Student" ? (
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ my: 1 }}>
                    <Select
                      labelId="year-label"
                      id="year"
                      name="year"
                      value={data.year}
                      onChange={handleChange}
                      displayEmpty // This enables the first empty value to be displayed
                      inputProps={{ "aria-label": "Year" }}
                      color="secondary"
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <em>Year</em>;
                        }
                        return selected;
                      }}
                    >
                      {/* Removed the disabled MenuItem for "Year" to not show it as an option */}
                      <MenuItem
                        value={1}
                        sx={{ ...styles.playfairDisplayFont, fontSize: "18px" }}
                      >
                        1
                      </MenuItem>
                      <MenuItem
                        value={2}
                        sx={{ ...styles.playfairDisplayFont, fontSize: "18px" }}
                      >
                        2
                      </MenuItem>
                      <MenuItem
                        value={3}
                        sx={{ ...styles.playfairDisplayFont, fontSize: "18px" }}
                      >
                        3
                      </MenuItem>
                      <MenuItem
                        value={4}
                        sx={{ ...styles.playfairDisplayFont, fontSize: "18px" }}
                      >
                        4
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              ) : (
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    color="secondary"
                    id="specialCode"
                    label="Special Code"
                    name="specialCode"
                    autoComplete="specialCode"
                    value={data.specialCode}
                    onChange={handleChange}
                    sx={{
                      my: 1,

                      "& .MuiInputLabel-root": {
                        fontFamily: '"Merienda", bold', // Font for the label
                      },
                      "& .MuiInputBase-input": {
                        fontFamily: '"Playfair Display", serif', // Font for the input text
                      },
                    }} // Reduced padding
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  color="secondary"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={handleChange}
                  sx={{
                    my: 1,

                    "& .MuiInputLabel-root": {
                      fontFamily: '"Merienda", bold', // Font for the label
                    },
                    "& .MuiInputBase-input": {
                      fontFamily: '"Playfair Display", serif', // Font for the input text
                    },
                  }} // Further reduced padding
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  color="secondary"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={data.showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  value={data.password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleShowPasswordToggle("showPassword")}
                          edge="end"
                        >
                          {data.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    my: 1,

                    "& .MuiInputLabel-root": {
                      fontFamily: '"Merienda", bold', // Font for the label
                    },
                    "& .MuiInputBase-input": {
                      fontFamily: '"Playfair Display", serif', // Font for the input text
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  color="secondary"
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={data.showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  autoComplete="confirm-password"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleShowPasswordToggle(
                            "showConfirmPassword"
                          )}
                          edge="end"
                        >
                          {data.showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    my: 1,

                    "& .MuiInputLabel-root": {
                      fontFamily: '"Merienda", bold', // Font for the label
                    },
                    "& .MuiInputBase-input": {
                      fontFamily: '"Playfair Display", serif', // Font for the input text
                    },
                  }}
                />
              </Grid>
            </Grid>

            {/* <Grid container spacing={1}>
              
            </Grid> */}
            {/* Error messages */}
            {passwordCriteriaError && (
              <Typography color="error" sx={{ mt: 2, lineHeight: 1 }}>
                {passwordCriteriaError}
              </Typography>
            )}
            {error && (
              <Typography color="error" sx={{ mt: 2, lineHeight: 0.5 }}>
                {error}
              </Typography>
            )}
            {/* Submit button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                ...styles.alegreyaFont,
                backgroundColor: "#892CDC",
                color: "#FFF6E0",
                "&:hover": { backgroundColor: "#52057B" },
              }}
            >
              Sign Up
            </Button>
            {/* Link to login page */}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    ...styles.playfairDisplayFont,
                    color: "#BC6FF1",
                    fontSize: "1.1rem",
                  }}
                >
                  Already have an account? Sign In
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Signup;