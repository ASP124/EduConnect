import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Container,
  Typography,
  FormControl,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Link,
  Box,
  Grid,
} from "@mui/material";

const WarningAnimation = ({ children }) => (
  <Box
    bgcolor="#FF0000"
    color="#FFF6E0"
    py={1}
    pl={28} // Adjust the padding here for the left side
    pr={28} // Adjust the padding here for the right side
    textAlign="center"
    sx={{
      width: "100%",
      overflowX: "hidden",
      position: "relative",
      height: "40px", // Adjust the height here as needed
    }}
  >
    <Box
      sx={{
        whiteSpace: "nowrap",
        position: "absolute",
        animation: "scroll 15s linear infinite",
        "@keyframes scroll": {
          from: { left: "100%" },
          to: { left: "-100%" },
        },
      }}
    >
      <Typography variant="body1" sx={{ ...styles.meriendaFont }}>
        {children}
      </Typography>
    </Box>
  </Box>
);

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

function StudentStudyMaterials() {
  const [studyMaterials, setStudyMaterials] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [filteredMaterials, setFilteredMaterials] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/studyMaterials")
      .then((response) => {
        console.log("Study materials:", response.data);
        setStudyMaterials(response.data);
      })
      .catch((error) => {
        console.error("Error fetching study materials", error);
      });
  }, []);

  useEffect(() => {
    if (selectedBranch && selectedYear && selectedSemester) {
      const filtered = studyMaterials.filter(
        (material) =>
          material.branch === selectedBranch &&
          material.year === selectedYear &&
          material.semester === selectedSemester
      );
      setFilteredMaterials(filtered);
    } else {
      setFilteredMaterials([]);
    }
  }, [selectedBranch, selectedYear, selectedSemester, studyMaterials]);
  const branches = Array.from(
    new Set(studyMaterials.map((material) => material.branch))
  );
  const years = Array.from(
    new Set(studyMaterials.map((material) => material.year))
  );
  const semesters = Array.from(
    new Set(studyMaterials.map((material) => material.semester))
  );
  const handleBranchChange = (branch) => {
    setSelectedBranch(branch);
    setSelectedYear("");
    setSelectedSemester("");
    setFilteredMaterials([]);
  };
  const handleYearChange = (year) => {
    setSelectedYear(year);
    setSelectedSemester("");
  };

  const handleSemesterChange = (semester) => {
    setSelectedSemester(semester);
  };

  return (
    <Container maxWidth="md">
      <Box
        mt={4}
        p={8}
        border="1px solid #ccc"
        borderRadius={8}
        bgcolor="#FFF6E0"
        position="relative"
      >
        <Box position="absolute" top={0} left={0} right={0}>
          <WarningAnimation>
            WARNING : Only the uploaded study materials are visible. Contact
            your teacher if your subjects are missing!
          </WarningAnimation>
        </Box>
        <Box pt={8}>
          <Typography
            variant="h4"
            mb={2}
            textAlign="center"
            sx={{ ...styles.alegreyaFont }}
          >
            Student Study Materials
          </Typography>
          <Box display="flex" flexDirection="column" alignItems="center">
            {branches.length > 0 && (
              <Box mb={2} width={300}>
                <FormControl
                  variant="outlined"
                  fullWidth
                  sx={{ minHeight: "56px" }}
                >
                  <Select
                    id="branch"
                    value={selectedBranch}
                    onChange={(e) => handleBranchChange(e.target.value)}
                    fullWidth
                    displayEmpty
                    color="secondary"
                    sx={{
                      height: "56px",
                      fontSize: "1rem",
                      ...styles.playfairDisplayFont,
                    }}
                    renderValue={(selected) =>
                      selected || "Please Select a Branch"
                    }
                  >
                    {branches.map((branch, index) => (
                      <MenuItem
                        key={branch}
                        value={branch}
                        sx={{ fontSize: "1rem", ...styles.playfairDisplayFont }}
                      >
                        {branch}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}

            {selectedBranch && (
              <Box mb={2} width={300}>
                <FormControl
                  variant="outlined"
                  fullWidth
                  sx={{ minHeight: "56px" }}
                >
                  <Select
                    id="year"
                    value={selectedYear}
                    onChange={(e) => handleYearChange(e.target.value)}
                    fullWidth
                    displayEmpty
                    color="secondary"
                    sx={{
                      height: "56px",
                      fontSize: "1rem",
                      ...styles.playfairDisplayFont,
                    }}
                    renderValue={(selected) =>
                      selected || "Please Select a Year"
                    }
                  >
                    {years.map((year) => (
                      <MenuItem
                        key={year}
                        value={year}
                        sx={{ fontSize: "1rem", ...styles.playfairDisplayFont }}
                      >
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}
            {selectedYear && (
              <Box width={300}>
                <FormControl
                  variant="outlined"
                  fullWidth
                  sx={{ minHeight: "56px" }}
                >
                  <Select
                    id="semester"
                    value={selectedSemester}
                    onChange={(e) => handleSemesterChange(e.target.value)}
                    fullWidth
                    displayEmpty
                    color="secondary"
                    sx={{
                      height: "56px",
                      fontSize: "1rem",
                      ...styles.playfairDisplayFont,
                    }}
                    renderValue={(selected) =>
                      selected || "Please Select a Semester"
                    }
                  >
                    {semesters.map((semester) => (
                      <MenuItem
                        key={semester}
                        value={semester}
                        sx={{ fontSize: "1rem", ...styles.playfairDisplayFont }}
                      >
                        {semester}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}
            {selectedYear &&
            selectedSemester &&
            filteredMaterials.length === 0 ? (
              <Typography mt={2} sx={{ ...styles.playfairDisplayFont }}>
                No study materials available.
              </Typography>
            ) : null}
            {filteredMaterials.map((material) => (
              <List key={material._id} sx={{ padding: "0px" }}>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <Typography
                          variant="body1"
                          component="span"
                          sx={{ ...styles.playfairDisplayFont }}
                        >
                          <strong>
                            {material.year}, {material.semester},{" "}
                            {material.subject}
                          </strong>
                        </Typography>
                        <Box component="span" ml={2}>
                          <Link
                            href={`http://localhost:8000/api/studyMaterials/${material._id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              ...styles.playfairDisplayFont,
                              color: "#bc6ff1",
                            }}
                          >
                            View Study Material
                          </Link>
                        </Box>
                      </>
                    }
                  />
                </ListItem>
              </List>
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default StudentStudyMaterials;