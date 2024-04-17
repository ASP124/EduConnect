import React from "react";
// import Navbar from "./Navbar2"; 
import StudentDashboard from "./Student/StudentDashboard";
import TeacherDashboard from "./Teacher/TeacherDashboard";
import { Box, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Dashboard = (props) => {
  const userType = localStorage.getItem("userType");
  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}> 
      <Container maxWidth={false} disableGutters>
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          {/* <Navbar /> */}
          <Box sx={{ flexGrow: 1 }}>
            {userType === "Student" ? <StudentDashboard /> : <TeacherDashboard />}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;