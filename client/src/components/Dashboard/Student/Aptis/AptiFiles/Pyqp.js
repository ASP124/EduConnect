import React from "react";
import { useLocation } from "react-router-dom";
import Qpapers from "./PYQP.json";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";

const Questionpaper = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const searchParams = search
    .split("?")[1]
    .split("&")
    .reduce((store, item) => {
      let split = item.split("=");
      store[split[0]] = split[1];
      return store;
    }, {});
  const companyName = searchParams.company;
  const companyInfo = Qpapers.QPapers[companyName];

  if (!companyInfo) {
    return <div>Company not found</div>;
  }

  const styles = {
    meriendaFont: {
      fontFamily: '"Merienda", cursive',
    },
    shantellSansFont: {
      fontFamily: '"Shantell Sans", cursive',
    },
    alegreyaFont: {
      fontFamily: '"Alegreya", serif',
    },
    playfairDisplayFont: {
      fontFamily: '"Playfair Display", serif',
    },
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Box
        maxWidth="800px"
        margin="auto"
        padding="40px"
        sx={{
          backgroundColor: "#fff6e0",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          width:"800px",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: "#00796B",
            mb: "20px",
            fontSize: "36px",
            fontWeight: "bold",
            ...styles.alegreyaFont,
          }}
        >
          {companyInfo.name}
        </Typography>
        <Typography
          variant="h2"
          sx={{ color: "#424242", mb: "30px", fontSize: "28px", ...styles.alegreyaFont }}
        >
          PAST YEAR QUESTION PAPERS
        </Typography>
        <ul style={{ padding: 0 }}>
          {companyInfo.pdfs.map((pdf, index) => (
            <li key={index} style={{ listStyle: "none", marginBottom: "20px" }}>
              <Button
                variant="contained"
                href={pdf.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  borderRadius: "8px",
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  bgcolor: "#892CDC",
                  color: "#FFF6E0",
                  "&:hover": { bgcolor: "#52057b" },
                  width: "300px",
                  ...styles.playfairDisplayFont,
                }}
              >
                {pdf.title}
              </Button>
            </li>
          ))}
        </ul>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate(-1)}
          sx={{
            mt: "30px",
            fontSize: "16px",
            fontWeight: "bold",
            letterSpacing: "1px",
            bgcolor: "#892CDC",
            color: "#FFF6E0",
            "&:hover": { bgcolor: "#52057b" },
            width: "150px",
            ...styles.playfairDisplayFont,
          }}
        >
          Go Back
        </Button>
      </Box>
    </Box>
  );
};

export default Questionpaper;