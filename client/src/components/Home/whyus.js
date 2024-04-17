import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Waves } from "lucide-react";

export default function WhyChooseUs() {
  const [isInView, setIsInView] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    const currentElement = document.getElementById("animateBox");
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  useEffect(() => {
    let timeout;
    if (isInView) {
      timeout = setTimeout(() => {
        setStartAnimation(true);
      }, 1200); // Delay animation by 1.2 seconds
    }

    return () => clearTimeout(timeout);
  }, [isInView]);

  const theme = useTheme();

  const fadeInLeftToRight = `
      @keyframes fadeInLeftToRight {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `;

  const fadeInRightToLeft = `
      @keyframes fadeInRightToLeft {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `;
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
    <Box
      id="animateBox"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(4),
        position: "relative",
      }}
    >
      <style>
        {fadeInLeftToRight}
        {fadeInRightToLeft}
      </style>
      {/* Introducing new background box */}
      <Box
        sx={{
          width: "calc(100% - 1200px)",
          height: "calc(100% - 300px)",
          position: "absolute",
          background: "linear-gradient(45deg, #BC6FF1,#892CDC,#52057B )", // Applying the gradient
          zIndex: 1,
          opacity: startAnimation ? 1 : 0, // Fade in effect
          transform: "translate(-260px, 0px)",
          animation: startAnimation ? "fadeInLeftToRight 1s forwards" : "none",
        }}
      />

      <Typography
        variant="body1"
        component="div"
        sx={{
          position: "relative",
          zIndex: 2,
          maxWidth: 600,
          p: 3,
          borderRadius: 2,
          boxShadow: theme.shadows[1],
          bgcolor: "#FFF6E0",
          opacity: startAnimation ? 1 : 0, // Fade in effect
          animation: startAnimation ? "fadeInRightToLeft 1s forwards" : "none",
          // animationDelay: startAnimation ? "0.5s" : "0s", // Delay typography box animation
        }}
      >
        <Typography variant="h4" sx={{ ...styles.alegreyaFont }} gutterBottom>
          Why Choose Us?
        </Typography>
        <Typography variant="body1" sx={{ ...styles.playfairDisplayFont }}>
          We offer unparalleled services that are tailored to meet your specific
          needs. With a team of dedicated professionals, state-of-the-art
          technology, and a commitment to customer satisfaction, we ensure that
          you receive the best possible outcome. Choose us for excellence,
          innovation, and value.
        </Typography>
        {/* Wave-Icon */}
        <Box
          sx={{
            position: "absolute",
            top: -16,
            right: -16,
            color: "primary.main",
            zIndex: 1,
            animation: startAnimation ? "waveAnimation 2s infinite" : "none",
            "@keyframes waveAnimation": {
              "0%": { transform: "rotate(0deg)" },
              "50%": { transform: "rotate(10deg)" },
              "100%": { transform: "rotate(0deg)" },
            },
          }}
        >
          <Waves size="48" />
        </Box>
      </Typography>
    </Box>
  );
}
