import React, { useState } from "react";
import { Container, Typography, TextField, Box } from "@mui/material";
import SyllabusDropdown from "./syllabusDropdown";
import { useNavigate } from "react-router-dom";
import companies from "./syllabus.json";

function AptiPrep() {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const searchFun = (e) => {
    setSearchText(e.target.value);
  };

  const companyList = Object.keys(companies.companies);

  const filteredCompanies = companyList.filter((company) =>
    company.toLowerCase().includes(searchText.toLowerCase())
  );

  // Group the filtered companies into pairs
  const groupedCompanies = [];
  for (let i = 0; i < filteredCompanies.length; i += 2) {
    groupedCompanies.push(filteredCompanies.slice(i, i + 2));
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
    <Container maxWidth="md" sx={{ padding: "20px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <TextField
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={searchFun}
          variant="outlined"
          fullWidth
          size="small"
          color="secondary"
          sx={{
            "& .MuiInputBase-input": {
              fontFamily: '"Playfair Display", serif',
              color: "black", // Adjust the color as needed
            },
            "& .MuiInputBase-input::placeholder": {
              fontFamily: '"Shantell Sans", sans-serif',
              color: "gray", // Adjust the color as needed
            },
          }}
        />
      </Box>
      <Typography
        variant="h3"
        align="center"
        sx={{ ...styles.alegreyaFont }}
        gutterBottom
      >
        Aptitude Preparation
      </Typography>
      <Typography
        variant="h6"
        align="center"
        sx={{ marginBottom: "20px", ...styles.alegreyaFont }}
      >
        List of Companies
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {groupedCompanies.map((pair, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            {pair.map((company, idx) => (
              <Box key={idx} mx={1}>
                <SyllabusDropdown
                  companyName={company}
                  syllabusSections={["Syllabus"]}
                  registerSections={["Register"]}
                  PyqpSections={["PastYearQuesionPapers"]}
                />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default AptiPrep;
