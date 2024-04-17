import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";

function Navbar() {
  const [click, setClick] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const linkStyle = {
    color: "#BC6FF1",
    textDecoration: "none",
    padding: "10px 15px",
    borderRadius: "4px",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#333",
      color: "#52057B",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    },
    "&:active": {
      transform: "translateY(1px)",
      boxShadow: "0 2px 3px rgba(0,0,0,0.1)",
    },
  };
  const styles = {
    meriendaFont: {
      fontFamily: '"Merienda", cursive',
      fontOpticalSizing: 'auto',
      fontWeight: '<weight>', // Replace <weight> with the desired font weight
      fontStyle: 'normal',
    },
    shantellSansFont: {
      fontFamily: '"Shantell Sans", cursive',
      fontOpticalSizing: 'auto',
      fontWeight: '<weight>', // Replace <weight> with the desired font weight
      fontStyle: 'normal',
      fontVariationSettings: '"BNCE" 0, "INFM" 0, "SPAC" 0',
    },
    alegreyaFont: {
      fontFamily: '"Alegreya", serif',
      fontOpticalSizing: 'auto',
      fontWeight: '<weight>', // Replace <weight> with the desired font weight
      fontStyle: 'normal',
    },
    playfairDisplayFont: {
      fontFamily: '"Playfair Display", serif',
      fontOpticalSizing: 'auto',
      fontWeight: '<weight>', // Replace <weight> with the desired font weight
      fontStyle: 'normal',
    },
  };

  return (
    <AppBar position="sticky" sx={{ background: "black" , opacity: "0.9" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SchoolRoundedIcon
            sx={{ color: "#892CDC", marginRight: 2, fontSize: "2rem" }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ 
              ...styles.meriendaFont , fontSize:"1.9rem" , color: "#892CDC"} }
          >
            EDUCONNECT
          </Typography>
          <i
            className="fab fa-typo3"
            style={{ fontSize: "1.8rem", color: "#892CDC" }}
          />
        </Box>
        {isMobile ? (
          <IconButton onClick={handleClick} sx={{ color: "#86C232" }}>
            {click ? (
              <i className="fas fa-times" />
            ) : (
              <i className="fas fa-bars" />
            )}
          </IconButton>
        ) : (
          <Box>
            <Button
              component={RouterLink}
              to="/"
              onClick={closeMobileMenu}
              sx={{...linkStyle , ...styles.shantellSansFont}}
            >
              Home
            </Button>
            <Button
              component={RouterLink}
              to="/services"
              onClick={closeMobileMenu}
              sx={{...linkStyle , ...styles.shantellSansFont}}
            >
              Services
            </Button>
            <Button
              component={RouterLink}
              to="/aboutus"
              onClick={closeMobileMenu}
              sx={{...linkStyle , ...styles.shantellSansFont}}
            >
              About Us
            </Button>
            <Button
              variant="contained"
              component={RouterLink}
              to="/signup"
              sx={{
                ml: 3,
                bgcolor: "transparent",
                color: "#BC6FF1",
                "&:hover": { bgcolor: "#FFF6E0", color: "#BC6FF1" },
                ...styles.shantellSansFont
              }}
            >
              SIGN UP
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
