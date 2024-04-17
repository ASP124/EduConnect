import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Fade,
} from "@mui/material";
import { Box } from "@mui/system";

const GoogleSheetComponent2 = () => {
  const [sheetData, setSheetData] = useState([]);
  const [showSheet, setShowSheet] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");

  const fetchData = async (year, teacher) => {
    setSelectedYear(year);
    setSelectedTeacher(teacher);

    let sheetId = "";
    if (year === "Fourth Year") {
      sheetId =
        teacher === "Teacher 1"
          ? "1uk-ej_ehpQ6QN0mcaWUXF81BaSDG4pN-5JHn9KA5oPA"
          : "1V1cUYl5rN0xMQaY6CsFuIPDr67UHs1WKjwMS6tO46dM";
    } else {
      sheetId =
        teacher === "Teacher 1"
          ? "SHEET_ID_FOR_TEACHER_1_IN_OTHER_YEARS"
          : "SHEET_ID_FOR_TEACHER_2_IN_OTHER_YEARS";
    }

    const apiKey = "AIzaSyCc_4dU0kpOuDNR4JOwTSEbaEm_uVaUeK8";
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      const data = response.data.values;

      const sheetWithPercentage = data.map((row) => {
        const totalDays = row.slice(1).length;
        const presentDays = row
          .slice(1)
          .reduce((acc, val) => acc + parseInt(val), 0);
        const percentage = ((presentDays / totalDays) * 100).toFixed(2) + "%";
        return [...row, percentage];
      });

      setSheetData(sheetWithPercentage);
      setShowSheet(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleYearButtonClick = (year) => {
    setSelectedYear(year);
    setSelectedTeacher("");
  };

  const handleTeacherButtonClick = (teacher) => {
    setSelectedTeacher(teacher);
    fetchData(selectedYear, teacher);
  };

  const downloadCSV = () => {
    const csvData = sheetData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "table_data.csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleBackButtonClick = () => {
    setSelectedYear("");
    setSelectedTeacher("");
    setShowSheet(false);
  };

  const years = ["First Year", "Second Year", "Third Year", "Fourth Year"];
  const teachers = ["Teacher 1", "Teacher 2"];

  const styles = {
    alegreyaFont: {
      fontFamily: '"Alegreya", serif',
      fontOpticalSizing: "auto",
      fontStyle: "normal",
    },
    button: {
      fontFamily: '"Alegreya", serif',
      bgcolor: "#892CDC",
      "&:hover": {
        bgcolor: "#52057b",
      },
      fontSize: "16px",
      mr: 2,
    },
    tableContainer: {
      mb: 3,
      boxShadow: "0px 4px 20px #fff6e0",
      border: "1px solid #fff6e0",
      padding: "0",
    },
    downloadButton: {
      fontFamily: '"Alegreya", serif',
      bgcolor: "#892CDC",
      "&:hover": {
        bgcolor: "#52057b",
      },
      fontSize: "16px",
      mr: 2,
    },
    backToButton: {
      fontFamily: '"Alegreya", serif',
      bgcolor: "#892CDC",
      "&:hover": {
        bgcolor: "#52057b",
      },
      fontSize: "16px",
      mb: 3,
    },
  };

  return (
    <Container maxWidth="md">
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        sx={styles.alegreyaFont}
      >
        Attendance Data
      </Typography>

      {!showSheet && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          {years.map((year) => (
            <Button
              key={year}
              variant="contained"
              onClick={() => handleYearButtonClick(year)}
              sx={styles.button}
            >
              {year}
            </Button>
          ))}
        </Box>
      )}

      {selectedYear && !showSheet && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          {teachers.map((teacher) => (
            <Button
              key={teacher}
              variant="contained"
              onClick={() => handleTeacherButtonClick(teacher)}
              sx={styles.button}
            >
              {teacher}
            </Button>
          ))}
        </Box>
      )}
      {showSheet && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleBackButtonClick}
          sx={{
            ...styles.alegreyaFont,
            bgcolor: "#892CDC",
            "&:hover": {
              bgcolor: "#52057b",
            },
            fontSize: "16px",

            mb: 3,
          }}
        >
          Back
        </Button>
      )}
      {showSheet && (
        <Fade in={showSheet} timeout={1000}>
          <Box>
            <TableContainer
              component={Container}
              sx={{
                mb: 3,
                boxShadow: "0px 4px 20px #fff6e0",
                border: "1px solid #fff6e0",
                padding: "0",
                maxHeight: "60vh",
                overflow: "auto",
              }}
              disableGutters
            >
              <Table sx={{ backgroundColor: "#fff6e0" }}>
                <TableHead>
                  <TableRow>
                    {sheetData[0] &&
                      sheetData[0].map((header, index) => (
                        <TableCell key={index} sx={{ fontWeight: "bold" }}>
                          {index === sheetData[0].length - 1
                          ? "Percentage"
                          : header}
                        </TableCell>
                      ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sheetData.slice(1).map((row, index) => (
                    <TableRow key={index}>
                      {row.map((cell, index) => (
                        <TableCell key={index}>{cell}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={downloadCSV}
                sx={{
                  ...styles.alegreyaFont,
                  bgcolor: "#892CDC",
                  "&:hover": {
                    bgcolor: "#52057b",
                  },
                  fontSize: "16px",

                  mr: 2,
                }}
              >
                Download CSV
              </Button>
            </Box>
          </Box>
        </Fade>
      )}
    </Container>
  );
};

export default GoogleSheetComponent2;