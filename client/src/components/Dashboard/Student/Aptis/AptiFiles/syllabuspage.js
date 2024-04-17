import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import companies from "./syllabus.json";

function SyllabusPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const companyName = searchParams.get("company");
  const companyInfo = companies.companies[companyName];

  if (!companyInfo) {
    return <div>Company not found</div>;
  }

  const handleGoBack = () => {
    if (companyName === "apti prep") {
      navigate("/dashboard"); // Redirect to dashboard for apti prep
    } else {
      navigate(-1); // Go back one history step for other companies
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
    <Box maxWidth="1000px" margin="auto" padding="20px" className="syllabus">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              padding: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "#fff6e0",
            }}
          >
            <Box textAlign="center">
              <img
                src={companyInfo.logo}
                alt={companyInfo.title}
                className="image-complogo"
                style={{ width: "150px", height: "auto" }}
              />
              <Typography
                variant="h4"
                sx={{ color: "#892cdc", mt: "10px", ...styles.alegreyaFont }}
              >
                {companyInfo.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#892cdc",
                  mt: "10px",
                  mb: "20px",
                  ...styles.playfairDisplayFont,
                }}
              >
                {companyInfo.description}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table
              sx={{ maxWidth: 800, margin: "0 auto" }}
              className="syllabus-table"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "24px", ...styles.alegreyaFont }}
                  >
                    Section
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "24px", ...styles.alegreyaFont }}
                  >
                    Number of Questions
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "24px", ...styles.alegreyaFont }}
                  >
                    Topics
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {companyInfo.sections.map((section, index) => (
                  <TableRow key={index}>
                    <TableCell
                      align="center"
                      sx={{ fontSize: "16px", ...styles.playfairDisplayFont }}
                    >
                      {section.name}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontSize: "16px", ...styles.playfairDisplayFont }}
                    >
                      {section.questions}
                    </TableCell>
                    <TableCell>
                      {companyInfo.syllabus[section.name].map(
                        (topic, topicIndex) => (
                          <Typography
                            key={topicIndex}
                            align="center"
                            sx={{
                              fontSize: "16px",
                              ...styles.playfairDisplayFont,
                            }}
                          >
                            {topic}
                          </Typography>
                        )
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={handleGoBack}
            sx={{
              ...styles.alegreyaFont,
              bgcolor: "#892CDC",
              "&:hover": {
                bgcolor: "#52057b",
              },
              fontSize: "16px",
              width: "150px",
            }}
          >
            Go Back
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SyllabusPage;
