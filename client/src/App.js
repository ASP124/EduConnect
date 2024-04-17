import React from "react";
import Home from "./components/pages/Home";
import AboutUs from "./components/pages/aboutus";
import Services from "./components/pages/services";
import SignUp from "./components/Signup/sign/signup";
import Login from "./components/Login/login";
import Dashboard from "./components/Dashboard/dashboard";
import MyProfile from "./components/Dashboard/Student/MyProfile";
import SendNotification from "./components/Dashboard/Teacher/SendNotification";
import GoogleSheetComponent2 from "./components/Dashboard/Teacher/TeacherAttendance";
import GoogleSheetComponent from "./components/Dashboard/Student/StudentAttendance";
import StudentStudyMaterials from "./components/Dashboard/Student/StudentStudyMaterial";
import YearSubjectSelector from "./components/Dashboard/Teacher/YearSubjectSelector"
import AptitudeSection from "./components/Dashboard/Student/SampleTest";
import AptiPrep from "./components/Dashboard/Student/Aptis/AptiFiles/AptiPrep";
import SyllabusPage from './components/Dashboard/Student/Aptis/AptiFiles/syllabuspage.js';
import RegistrationPage from './components/Dashboard/Student/Aptis/AptiFiles/register.js';
import Questionpaper from './components/Dashboard/Student/Aptis/AptiFiles/Pyqp.js';
import { createTheme, ThemeProvider } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const theme = createTheme();

function App() {
  const user = localStorage.getItem("token");

  const ProtectedRoute = ({ element }) => {
    return user ? element : <Navigate to="/login" />;
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route path="/dashboard/myprofile" element={<MyProfile />} />
          <Route
            path="/dashboard/student-attendance"
            element={<GoogleSheetComponent />}
          />
          <Route
            path="/dashboard/sample-aptitude"
            element={<AptitudeSection />}
          />
          <Route
            path="/dashboard/student-study-material"
            element={<StudentStudyMaterials />}
          />
          <Route path="/dashboard/upload-study-material" element={<YearSubjectSelector />} />
          <Route path="/dashboard/send-notifs" element={<SendNotification/>} />
        <Route path="/dashboard/attendance" element={<GoogleSheetComponent2/>} />
        <Route path="/dashboard/aptitude-preparation" element={<AptiPrep/>} />
        <Route path="/dashboard/aptitude-preparation/syllabus" element={<SyllabusPage/>}/>
        <Route path="/dashboard/aptitude-preparation/register" element={<RegistrationPage/>}/>
        <Route path="/dashboard/aptitude-preparation/Pyqp" element={<Questionpaper/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;