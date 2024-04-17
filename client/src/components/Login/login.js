import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"; // Import useEffect hook
import axios from "axios";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { InputAdornment, IconButton } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import { Visibility, VisibilityOff } from "@mui/icons-material"; 

const Login = ({ onSlide }) => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // Reset email and password fields when component mounts
  useEffect(() => {
    setData({ email: "", password: "" });
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleShowPasswordToggle = (field) => () => {
    setData({ ...data, [field]: !data[field] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8000/api/auth/login";
      const { data: res } = await axios.post(url, data);
      console.log(res);

      // Store token and user name in localStorage
      localStorage.setItem("token", res.token);
      localStorage.setItem("userName", res.userName);
      localStorage.setItem("userType", res.userType);
      localStorage.setItem("userEmail", data.email);
      // localStorage.setItem("userDepartment", data.department);

      // Redirect to the dashboard or perform other actions as needed
      window.location = "/dashboard";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
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
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          alignContent: "center",
          paddingLeft: "135px", // Add padding to the left side
          paddingRight: "135px", // Add padding to the right side
          paddingTop: "30px", // Add padding to the top
          paddingBottom: "30px",
          backgroundColor: "#fffbf2",
        }}
      >
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={9} square>
          <Box
            sx={{
              py: 10,
              px: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
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
              sx={{ ...styles.alegreyaFont }}
            >
              Log In
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                color="secondary"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={data.email} // Bind value to data.email
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
                value={data.password} // Bind value to data.password
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
              {error && <Typography color="error">{error}</Typography>}
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
                Log In
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    to="/signup"
                    style={{
                      textDecoration: "none",
                      ...styles.playfairDisplayFont,
                      color: "#BC6FF1",
                      fontSize: "1.1rem",
                    }}
                  >
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
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
              backgroundImage: "url(https://source.unsplash.com/random?books)",
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
      </Grid>
    </ThemeProvider>
  );
};

export default Login;