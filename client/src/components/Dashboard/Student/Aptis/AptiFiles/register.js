import React from "react";
import companie from "./register.json";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";

const RegistrationPage = () => {
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
  const companyInfo = companie.companie[companyName];

  if (!companyInfo) {
    return <div>Company not found</div>;
  }

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
      maxWidth="900px"
      margin="0 auto"
      marginTop={"45px"} // Center horizontally
      padding="20px"
      className="register1"
      sx={{
        backgroundColor: "#FFF6E0",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h2"
        align="center"
        className="regh1"
        sx={{
          color: "#333333",
          mt: "20px",
          textDecoration: "underline",
          ...styles.alegreyaFont,
        }}
      >
        Company Registration Process
      </Typography>
      <Box key={companyName}>
        <Typography
          variant="h3"
          className="regh2"
          sx={{
            mt: "20px",
            color: "#333333",
            fontSize: "36px",
            fontWeight: "bold",
            ...styles.alegreyaFont,
          }}
        >
          {companyInfo.title}
        </Typography>
        <Typography
          variant="body1"
          className="regp"
          sx={{
            mt: "10px",
            fontSize: "18px",
            color: "#666666",
            ...styles.alegreyaFont,
          }}
        >
          <strong className="reglink">Registration Link:</strong>{" "}
          <a
            href={companyInfo.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#892CDC", textDecoration: "none" }}
          >
            {companyInfo.registrationLink}
          </a>
        </Typography>
        <Typography
          variant="body1"
          className="regp"
          sx={{
            mt: "10px",
            fontSize: "18px",
            color: "#666666",
            ...styles.alegreyaFont,
          }}
        >
          <strong className="reglink">Registration Process:</strong>{" "}
          {companyInfo.registrationProcess}
        </Typography>
        <Typography
          variant="h4"
          className="reglink"
          sx={{
            mt: "20px",
            fontSize: "24px",
            color: "#333333",
            fontWeight: "bold",
            ...styles.alegreyaFont,
          }}
        >
          Details
        </Typography>
        <ul
          className="regp"
          style={{
            listStyleType: "disc",
            marginLeft: "20px",
            color: "#666666",
            ...styles.alegreyaFont,
          }}
        >
          {companyInfo.details.map((detail, detailIndex) => (
            <li key={detailIndex}>{detail}</li>
          ))}
        </ul>
        <Typography
          variant="h4"
          className="reglink"
          sx={{
            mt: "20px",
            fontSize: "24px",
            color: "#333333",
            fontWeight: "bold",
            ...styles.alegreyaFont,
          }}
        >
          Selection Process
        </Typography>
        <Typography
          variant="body1"
          className="regp"
          sx={{
            mt: "10px",
            fontSize: "18px",
            color: "#666666",
            ...styles.alegreyaFont,
          }}
        >
          {companyInfo.selectionProcess}
        </Typography>
        <Typography
          variant="h4"
          className="reglink"
          sx={{
            mt: "20px",
            fontSize: "24px",
            color: "#333333",
            fontWeight: "bold",
            ...styles.alegreyaFont,
          }}
        >
          Interview Process
        </Typography>
        <Typography
          variant="body1"
          className="regp"
          sx={{
            mt: "10px",
            fontSize: "18px",
            color: "#666666",
            ...styles.alegreyaFont,
          }}
        >
          {companyInfo.interviewProcess}
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(-1)}
        className="go-back-button"
        sx={{
          ...styles.alegreyaFont,
          bgcolor: "#892CDC",
          "&:hover": {
            bgcolor: "#52057b",
          },
          fontSize: "16px",
          width: "150px",
          marginTop: "25px",
        }}
      >
        Go Back
      </Button>
    </Box>
  );
};

export default RegistrationPage;
