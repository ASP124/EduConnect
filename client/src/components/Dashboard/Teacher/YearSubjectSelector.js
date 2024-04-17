import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/system";
import axios from "axios";

const UploadButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  color: "#fff",
  padding: "12px 25px",
  borderRadius: "10px",
  fontSize: "18px",
  transition: "background 0.3s",
  "&:hover": {
    backgroundColor: theme.palette.success.dark,
  },
}));

const YearSubjectSelector = () => {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [uploadNotification, setUploadNotification] = useState("");
  const [showPDFButtons, setShowPDFButtons] = useState(false);

  const branches = [
    "Information Technology",
    "Mechanical",
    "Computer Science",
    "Civil",
    "Instrumental",
    "Chemical",
  ];
  const years = ["First Year", "Second Year", "Third Year", "Fourth Year"];
  const semesters = ["Sem - 1", "Sem - 2"];

  const subjects = {
    "Information Technology": {
      "First Year": {
        "Sem - 1": [
          "Physics - 1",
          "Chemistry - 1",
          "Maths - 1",
          "Engineering Mechanics",
          "Basic Electrical Engineering",
        ],
        "Sem - 2": [
          "Physics - 2",
          "Chemistry - 2",
          "Maths - 2",
          "Engineering Graphics",
          "Professional Communication and Ethics - 1",
        ],
      },
      "Second Year": {
        "Sem - 1": [
          "Maths - 3",
          "Data Structure and Analysis",
          "Data Base Management System",
          "Principle of Communication",
          "Paradigms & Computer Programming Fundamentals",
        ],
        "Sem - 2": [
          "Maths - 4",
          "Computer Network & Network Design",
          "Operating System",
          "Automata Theory",
          "Computer Organisation & Architecture",
        ],
      },
      "Third Year": {
        "Sem - 1": [
          "Internet Programming",
          "Computer Network Security",
          "E-Business",
          "Software Engineering",
          "Advance Data Management Technologies",
        ],
        "Sem - 2": [
          "Data Mining & Business Intelligence",
          "Web X.0",
          "Wireless Technology",
          "Artificial Intelligence & Data Science -1",
          "Image Processing",
        ],
      },
      "Fourth Year": {
        "Sem - 1": [
          "Artificial Intelligence & Data Science -2",
          "Internet of Everything",
          "Information Retrieval System",
          "Software Testing & Quality Assurance",
          "Computer Security Laws",
        ],
        "Sem - 2": [
          "Storage Network Management and Retrieval",
          "Big Data Analytics ",
          "Computer Simulation and Modeling",
          "Enterprise Resource Planning",
        ],
      },
    },
    
    "Mechanical": {
      "First Year": {
        "Sem - 1": [
          "Subject 1",
          "Subject 2",
          "Subject 3",
          "Subject 4",
          "Subject 5",
        ],
        "Sem - 2": [
          "Subject 1",
          "Subject 2",
          "Subject 3",
          "Subject 4",
          "Subject 5",
        ],
      },
      "Second Year": {
        "Sem - 1": [
          "Subject 1",
          "Subject 2",
          "Subject 3",
          "Subject 4",
          "Subject 5",
        ],
        "Sem - 2": [
          "Subject 1",
          "Subject 2",
          "Subject 3",
          "Subject 4",
          "Subject 5",
        ],
      },
      "Third Year": {
        "Sem - 1": [
          "Subject 1",
          "Subject 2",
          "Subject 3",
          "Subject 4",
          "Subject 5",
        ],
        "Sem - 2": [
          "Subject 1",
          "Subject 2",
          "Subject 3",
          "Subject 4",
          "Subject 5",
        ],
      },
      "Fourth Year": {
        "Sem - 1": [
          "Subject 1",
          "Subject 2",
          "Subject 3",
          "Subject 4",
          "Subject 5",
        ],
        "Sem - 2": [
          "Subject 1",
          "Subject 2",
          "Subject 3",
          "Subject 4",
        ],
      },
    },
    "Computer Science": {
      "First Year": {
        "Sem - 1": [
          "Subject 1",
          "Subject 2",
          "Subject 3",
          "Subject 4",
          "Subject 5",
        ],
        "Sem - 2": [
          "Subject 1",
          "Subject 2",
          "Subject 3",
          "Subject 4",
          "Subject 5",
        ],
      },
      "Second Year": {
        "Sem - 1": [
          "Subject 1",
          "Subject 2",
          "Subject 3",
          "Subject 4",
          "Subject 5",
        ],
        "Sem - 2": [
          "Subject 1",
          "Subject 2",
          "Subject 3",
          "Subject 4",
          "Subject 5",
        ],
      },
      "Third Year": {
        "Sem - 1": [
          "Subject 1",
          "Subject 2",
          "Subject 3",
          "Subject 4",
          "Subject 5",
        ],
        "Sem - 2": [
          "Subject 1",
          "Subject 2",
          "Subject 3",
          "Subject 4",
          "Subject 5",
        ],
      },
      "Fourth Year": {
        "Sem - 1": [
          "Subject 1",
          "Subject 2",
          "Subject 3",
          "Subject 4",
          "Subject 5",
        ],
        "Sem - 2": [
          "Subject 1",
          "Subject 2",
          "Subject 3",
          "Subject 4",
        ],
      },
    },
    "Chemical": {
      "First Year": {
        "Sem - 1": [
          "Subject 1",
          "Subject 2",
          "Subject 3",
          "Subject 4",
          "Subject 5",
        ],
        "Sem - 2": [
          "Subject 1",
          "Subject 2",
          "Subject 3",
          "Subject 4",
          "Subject 5",
        ],
      },
      "Second Year": {
        "Sem - 1": [
          "Subject 1",
          "Subject 2",
          "Subject 3",
          "Subject 4",
          "Subject 5",
        ],
        "Sem - 2": [
          "Subject 1",
          "Subject 2",
          "Subject 3",
          "Subject 4",
          "Subject 5",
        ],
      },
      "Third Year": {
        "Sem - 1": [
          "Subject 1",
          "Subject 2",
          "Subject 3",
          "Subject 4",
          "Subject 5",
        ],
        "Sem - 2": [
          "Subject 1",
          "Subject 2",
          "Subject 3",
          "Subject 4",
          "Subject 5",
        ],
      },
      "Fourth Year": {
        "Sem - 1": [
          "Subject 1",
          "Subject 2",
          "Subject 3",
          "Subject 4",
          "Subject 5",
        ],
        "Sem - 2": [
          "Subject 1",
          "Subject 2",
          "Subject 3",
          "Subject 4",
        ],
      },
    },
  };
  const handleBranchChange = (branch) => {
    setSelectedBranch(branch);
    setSelectedYear("");
    setSelectedSemester("");
    setSelectedSubject("");
    setUploadNotification("");
    setShowPDFButtons(false);
  };
  const handleYearChange = (year) => {
    setSelectedYear(year);
    setSelectedSemester("");
    setSelectedSubject("");
    setUploadNotification("");
    setShowPDFButtons(false);
  };

  const handleSemesterChange = (semester) => {
    setSelectedSemester(semester);
    setSelectedSubject("");
    setUploadNotification("");
    setShowPDFButtons(false);
  };

  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject);
    setUploadNotification("");
    setShowPDFButtons(false);
  };
  console.log("Selected Branch:", selectedBranch);
  console.log("Selected Year:", selectedYear);
  console.log("Selected Semester:", selectedSemester);
  console.log("Selected Subject:", selectedSubject);
  
  // const branchExists = (branch) => {
  //   return subjects.hasOwnProperty(branch);
  // };
  
  // // Conditional rendering of subjects based on the selected branch
  // const renderSubjects = () => {
  //   if (branchExists(selectedBranch)) {
  //     return subjects[selectedBranch][selectedYear][selectedSemester].map((subject) => (
  //       <MenuItem key={subject} value={subject}>
  //         {subject}
  //       </MenuItem>
  //     ));
  //   } else {
  //     return (
  //       <MenuItem value="">No subjects available for this branch</MenuItem>
  //     );
  //   }
  // };
  
  const handlePDFUpload = (e) => {
    const file = e.target.files[0];
    setSelectedPDF(file);
  };

  const handleUploadConfirmation = () => {
    if (selectedPDF) {
      const confirmation = window.confirm(
        `Are you sure you want to upload ${selectedPDF.name}?`
      );
      if (confirmation) {
        handleUpload();
      }
    } else {
      alert("Please select a PDF file to upload.");
    }
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", selectedPDF);
    formData.append("branch", selectedBranch);
    formData.append("year", selectedYear);
    formData.append("semester", selectedSemester);
    formData.append("subject", selectedSubject);

    axios
      .post("http://localhost:8000/upload", formData)
      .then((res) => {
        if (res.status === 200) {
          const section = `${selectedBranch}, ${selectedYear}, ${selectedSemester}, ${selectedSubject}`;
          setUploadNotification(`PDF Uploaded to ${section}`);
          alert("PDF uploaded successfully!");
          setSelectedPDF(null);
        } else {
          setUploadNotification("Upload failed. Please try again.");
          alert("PDF upload failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error(error);
        setUploadNotification("Upload failed. Please try again.");
        alert("PDF upload failed. Please try again.");
      });
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
    <Container maxWidth="md">
      <Box
        mt={8}
        p={4}
        bgcolor="#fff6e0"
        border="2px solid"
        borderColor="#ccc"
        borderRadius={10}
        boxShadow={4}
        textAlign="center"
      >
        <Typography
          variant="h3"
          color="secondary"
          mb={4}
          sx={{ ...styles.alegreyaFont }}
        >
          Syllabus Uploader
        </Typography>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel sx={{ ...styles.shantellSansFont }} color="secondary">
              Select Branch
            </InputLabel>
            <Select
              value={selectedBranch}
              sx={{ ...styles.playfairDisplayFont }}
              color="secondary"
              onChange={(e) => handleBranchChange(e.target.value)}
              label="Select Branch"
            >
              {branches.map((branch) => (
                <MenuItem
                  key={branch}
                  value={branch}
                  sx={{ ...styles.playfairDisplayFont }}
                >
                  {branch}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel sx={{ ...styles.shantellSansFont }} color="secondary">
                Select Year
              </InputLabel>
              <Select
                value={selectedYear}
                sx={{ ...styles.playfairDisplayFont }}
                color="secondary"
                onChange={(e) => handleYearChange(e.target.value)}
                label="Select Year"
              >
                {years.map((year) => (
                  <MenuItem
                    key={year}
                    value={year}
                    sx={{ ...styles.playfairDisplayFont }}
                  >
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel sx={{ ...styles.shantellSansFont }} color="secondary">
                Select Semester
              </InputLabel>
              <Select
                value={selectedSemester}
                sx={{ ...styles.playfairDisplayFont }}
                color="secondary"
                onChange={(e) => handleSemesterChange(e.target.value)}
                label="Select Semester"
                disabled={!selectedYear}
              >
                {semesters.map((semester) => (
                  <MenuItem
                    key={semester}
                    value={semester}
                    sx={{ ...styles.playfairDisplayFont }}
                  >
                    {semester}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel sx={{ ...styles.shantellSansFont }} color="secondary">
                Select Subject
              </InputLabel>
              <Select
                value={selectedSubject}
                sx={{ ...styles.playfairDisplayFont }}
                color="secondary"
                onChange={(e) => handleSubjectChange(e.target.value)}
                label="Select Subject"
                disabled={!selectedSemester}
              >
                {selectedBranch &&
                  selectedYear &&
                  selectedSemester &&
                  subjects[selectedBranch][selectedYear][selectedSemester].map(
                    (subject) => (
                      <MenuItem
                        key={subject}
                        value={subject}
                        sx={{ ...styles.playfairDisplayFont }}
                      >
                        {subject}
                      </MenuItem>
                    )
                  )}
              </Select>
            </FormControl>
          </Grid>
          {selectedSubject && (
            <>
              <Grid item xs={12}>
                <input
                  id="pdf-upload"
                  accept=".pdf"
                  style={{ display: "none" }}
                  onChange={handlePDFUpload}
                  type="file"
                />
                <label htmlFor="pdf-upload">
                  <UploadButton
                    variant="outlined"
                    component="span"
                    sx={{
                      ...styles.alegreyaFont,
                      bgcolor: "#892CDC",
                      "&:hover": {
                        bgcolor: "#52057b",
                      },
                      fontSize: "16px",
                      width: "250px",
                    }}
                    startIcon={<CloudUploadIcon />}
                  >
                    Select PDF File
                  </UploadButton>
                </label>
              </Grid>
              <Grid item xs={12}>
                <UploadButton
                  variant="contained"
                  onClick={handleUploadConfirmation}
                  sx={{
                    ...styles.alegreyaFont,
                    bgcolor: "#892CDC",
                    "&:hover": {
                      bgcolor: "#52057b",
                    },
                    fontSize: "16px",
                    width: "150px",
                  }}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload
                </UploadButton>
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            {uploadNotification && (
              <Typography
                variant="body1"
                color="error"
                sx={{ ...styles.playfairDisplayFont }}
              >
                {uploadNotification}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default YearSubjectSelector;