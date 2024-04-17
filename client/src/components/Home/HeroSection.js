import React from "react";
import {
  Button,
  Container,
  Grid,
  Link,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Navbar from "./Navbar";

function HeroSection() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
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
    <div>
      <Navbar />
      <Container maxWidth="false" sx={{ position: "relative" }}>
        <video
          src="/videos/video-2.mp4"
          autoPlay
          loop
          muted
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        />
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          sx={{
            background: `rgba(0, 0, 0, 0.2)`,
            // backdropFilter: 'blur(5px)',
          }}
        >
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography
              variant={isMobile ? "h4" : "h1"}
              color="#FFF6E0"
              sx={{ ...styles.alegreyaFont }}
            >
              SUCCESS AWAITS
            </Typography>
            <Typography
              variant="body1"
              sx={{ ...styles.alegreyaFont }}
              fontSize={30}
              color="#FFF6E0"
            >
              Explore, Learn, Grow!
            </Typography>
            <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
              <Grid item>
                <Link href="/signup" underline="none">
                  <Button
                    sx={{
                      color: "#FFF6E0",
                      border: "2px solid white", // Set border color to 'white'
                      fontSize: "18px",
                      "&:hover": {
                        backgroundColor: "#FFF6E0",
                        color: "black",
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
                      },
                      ...styles.alegreyaFont,
                    }}
                    variant="outlined"
                    size="large"
                    endIcon={<i className="fas fa-play-circle"></i>}
                  >
                    Get Started !
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/login" underline="none">
                  <Button
                    sx={{
                      backgroundColor: "#892CDC",
                      color: "#FFF6E0", // Contrast color for white background
                      fontSize: "18px",
                      "&:hover": {
                        backgroundColor: "#52057B",
                        color: "#FFF6E0", // Black text on hover
                      },
                      ...styles.alegreyaFont,
                    }}
                    variant="contained"
                    size="large"
                    endIcon={<i className="fas fa-play-circle"></i>}
                  >
                    Log In
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default HeroSection;
