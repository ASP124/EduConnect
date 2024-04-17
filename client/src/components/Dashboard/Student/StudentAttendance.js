import axios from "axios";
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledButton = styled(Button)({
  width: "30%",
  marginRight: "20px",
  marginBottom: "10px",
  color: "white",
  backgroundColor: "#892CDC",
  border: "1px solid #b3b3b3",
  borderRadius: "5px",
  padding: "15px 25px",
  fontSize: "14px",
  cursor: "pointer",
  transition: "background-color 0.3s, border-color 0.3s, color 0.3s",
  "&:hover": {
    backgroundColor: "#52057B",
  },
});

const GoogleSheetComponent = () => {
  const [sheetData, setSheetData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [teacherData, setTeacherData] = useState([]);

  const fetchData = async (year, teacher) => {
    setSelectedYear(year);
    setSelectedTeacher(teacher);

    let sheetId = "";
    if (year === "Fourth Year") {
      sheetId = teacher === "Teacher 1"
        ? "1uk-ej_ehpQ6QN0mcaWUXF81BaSDG4pN-5JHn9KA5oPA"
        : "1V1cUYl5rN0xMQaY6CsFuIPDr67UHs1WKjwMS6tO46dM";
    } else {
      sheetId = teacher === "Teacher 1"
        ? "SHEET_ID_FOR_TEACHER_1_IN_OTHER_YEARS"
        : "SHEET_ID_FOR_TEACHER_2_IN_OTHER_YEARS";
    }

    const apiKey = "AIzaSyCc_4dU0kpOuDNR4JOwTSEbaEm_uVaUeK8";
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      const data = response.data.values;

      // Process the data and set state as before
      const sheetWithPercentage = data.map((row) => {
        const totalDays = row.slice(1).length;
        const presentDays = row
          .slice(1)
          .reduce((acc, val) => acc + parseInt(val), 0);
        const percentage = ((presentDays / totalDays) * 100).toFixed(2) + "%";
        return [...row, percentage];
      });

      setTeacherData(sheetWithPercentage);

      console.log("Data:", sheetData); // Added console log
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleYearButtonClick = (year) => {
    setSelectedYear(year);
    setSelectedTeacher(""); // Reset teacher when a year is selected
  };

  const handleTeacherButtonClick = (teacher) => {
    setSelectedTeacher(teacher);
    fetchData(selectedYear, teacher);
  };

  const downloadCSV = () => {
    const csvData = teacherData.map((row) => row.join(",")).join("\n");
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
    setTeacherData([]);
  };

  return (
    <Container maxWidth="md">
      <Box
        mt={6}
        p={3}
        border="1px solid #ccc"
        borderRadius={8}
        bgcolor="#FFF6E0"
      >
        <Typography
          variant="h4"
          className="mb-4"
          color="#bc6ff1"
          textAlign="center"
        >
          Attendance Data
        </Typography>
        {!selectedYear && (
          <Box display="flex" justifyContent="space-around" mb={2} mt={2}>
            {["First Year", "Second Year", "Third Year", "Fourth Year"].map((year) => (
              <StyledButton
                key={year}
                variant="contained"
                className="button-margin"
                onClick={() => handleYearButtonClick(year)}
              >
                {year}
              </StyledButton>
            ))}
          </Box>
        )}

        {selectedYear && !selectedTeacher && (
          <Box display="flex" justifyContent="space-around" mb={2} mt={2}>
            <StyledButton
              variant="contained"
              className="button-margin"
              onClick={() => handleTeacherButtonClick("Teacher 1")}
            >
              Teacher 1
            </StyledButton>
            <StyledButton
              variant="contained"
              className="button-margin"
              onClick={() => handleTeacherButtonClick("Teacher 2")}
            >
              Teacher 2
            </StyledButton>
          </Box>
        )}

        {(selectedYear || selectedTeacher) && (
          <StyledButton
            variant="contained"
            className="button-margin"
            onClick={handleBackButtonClick}
          >
            Back
          </StyledButton>
        )}

        {teacherData.length > 0 && (
          <TableContainer component={Box} maxHeight="55vh" overflow="auto">
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  {teacherData[0] &&
                    teacherData[0].map((header, index) => (
                      <TableCell key={index} sx={{ fontWeight: "bold" }}>
                        {index === teacherData[0].length - 1
                          ? "Percentage"
                          : header}
                      </TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {teacherData.slice(1).map((row, index) => (
                  <TableRow key={index}>
                    {row.map((cell, index) => (
                      <TableCell key={index}>
                        <Typography variant="body1" component="span">
                          {cell}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

      </Box>
    </Container>
  );
};

export default GoogleSheetComponent;
