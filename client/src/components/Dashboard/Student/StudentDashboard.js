import * as React from "react";
import { useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MyProfile from "./MyProfile";
import StudentAttendance from "./StudentAttendance";
import StudentStudyMaterials from "./StudentStudyMaterial";
import SampleQuiz from "./SampleTest";
import AptiPrep from "./Aptis/AptiFiles/AptiPrep";
import DashboardContent from "../DashboardContent";
import ChatBot from "../ChatBot";
import Notification from "../Notification"
import{
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  AccountCircle as AccountCircleIcon,
  EventAvailable as EventAvailableIcon,
  Book as BookIcon,
  LibraryBooks as LibraryBooksIcon,
  QuestionMark as QuestionMarkIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    backgroundColor: "#FFF6E0",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(false); // Initialize to false
  const [selectedItem, setSelectedItem] = React.useState("Dashboard");
  const [notificationVisible, setNotificationVisible] = React.useState(false);
  const [showNotification, setShowNotification] = React.useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
    if (itemName === "Sample Test") {
      setOpenDialog(true);
    } else if (itemName === "Logout") {
      setLogoutDialogOpen(true);
    }
  };

  const handleStartTest = () => {
    setOpenDialog(false);
    // Redirect to sample test page
    window.location.href = "/dashboard/sample-aptitude";
  };

  const handleCancelTest = () => {
    setOpenDialog(false);
    // Redirect to dashboard
    window.location.href = "/dashboard";
  };
  const handleNotificationClick = () => {
    setNotificationVisible(!notificationVisible);
    setShowNotification(!showNotification); // Toggle ReceiverPage visibility
    setNotificationCount(0);
  };

  const handleNewNotification = () => {
    // Increment notification count
    setNotificationCount(notificationCount + 1);
  };

  const handleLogout = () => {
    // Open the logout confirmation dialog
    setLogoutDialogOpen(true);
  };

  const handleLogoutConfirmed = () => {
    // Add logout functionality here
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    window.location.href = "/login";
    console.log("Logout clicked");
  };

  const handleLogoutCancelled = () => {
    // Close the logout confirmation dialog
    setLogoutDialogOpen(false);
  };

  const userName = localStorage.getItem("userName");
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
  React.useEffect(() => {
    handleNewNotification();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
              color: "#FFF6E0",
              backgroundColor: "#892CDC",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 , ...styles.alegreyaFont ,fontSize: '28px' }}
            >
              Welcome {userName} to the Dashboard!
            </Typography>
            <IconButton color="inherit" onClick={handleNotificationClick}>
              <Badge badgeContent={notificationCount} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        {showNotification && (
          <Box
            sx={{
              backdropFilter: "blur(5px)", // Apply backdrop filter for blur effect
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1,
            }}
          />
        )}
        {showNotification && ( 
          <Box>
            <Box
              className="modal-content1"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 3,
                borderRadius: "15px",
                zIndex: 1,
              }}
            >
              <span
                className="close1"
                onClick={handleNotificationClick}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 10,
                  fontSize: "28px",
                  cursor: "pointer",
                }}
              >
                &times;
              </span>
              <Notification />
            </Box>
          </Box>
        )}
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
              bgcolor: "#FFF6E0"
            }}
          >
            <IconButton onClick={handleDrawerToggle}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List >
            <ListItem button onClick={() => handleItemClick("Dashboard")}>
              <ListItemIcon>
                <DashboardIcon sx={{color:"#892CDC"}}/>
              </ListItemIcon>
              <ListItemText primary="Dashboard" primaryTypographyProps={{ sx: styles.alegreyaFont , fontSize:'18px' }} />
            </ListItem>
            <ListItem button onClick={() => handleItemClick("My Profile")}>
              <ListItemIcon>
                <AccountCircleIcon sx={{color:"#892CDC"}}/>
              </ListItemIcon>
              <ListItemText primary="My Profile" primaryTypographyProps={{ sx: styles.alegreyaFont , fontSize:'18px' }} />
            </ListItem>
            <ListItem button onClick={() => handleItemClick("Attendance")}>
              <ListItemIcon>
                <EventAvailableIcon sx={{color:"#892CDC"}}/>
              </ListItemIcon>
              <ListItemText primary="Attendance" primaryTypographyProps={{ sx: styles.alegreyaFont , fontSize:'18px' }}/>
            </ListItem>
            <ListItem button onClick={() => handleItemClick("Study Material")}>
              <ListItemIcon>
                <BookIcon sx={{color:"#892CDC"}}/>
              </ListItemIcon>
              <ListItemText primary="Study Material" primaryTypographyProps={{ sx: styles.alegreyaFont , fontSize:'18px' }} />
            </ListItem>
            <ListItem button onClick={() => handleItemClick("Aptitude Prep")}>
              <ListItemIcon>
                <LibraryBooksIcon sx={{color:"#892CDC"}}/>
              </ListItemIcon>
              <ListItemText primary="Aptitude Prep" primaryTypographyProps={{ sx: styles.alegreyaFont , fontSize:'18px' }}/>
            </ListItem>
            <ListItem button onClick={() => handleItemClick("Sample Test")}>
              <ListItemIcon>
                <QuestionMarkIcon sx={{color:"#892CDC"}}/>
              </ListItemIcon>
              <ListItemText primary="Sample Aptitude" primaryTypographyProps={{ sx: styles.alegreyaFont , fontSize:'18px' }}/>
            </ListItem>
            <ListItem button onClick={handleLogout} sx={{ color: "red" }}>
              <ListItemIcon>
                <ExitToAppIcon sx={{ color: "red" }} />
              </ListItemIcon>
              <ListItemText primary="Logout" primaryTypographyProps={{ sx: styles.alegreyaFont , fontSize:'18px' }}/>
            </ListItem>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Toolbar />
          {selectedItem === "Dashboard" && <DashboardContent/>}
          {selectedItem === "My Profile" && <MyProfile />}
          {selectedItem === "Attendance" && <StudentAttendance />}
          {selectedItem === "Study Material" && <StudentStudyMaterials />}
          {selectedItem === "Demo Aptitude" && <SampleQuiz />}
          {selectedItem === "Aptitude Prep" && <AptiPrep />}
        </Box>
        {/* <ChatBot/> */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" sx={{...styles.playfairDisplayFont , fontWeight:'bold'}}>
            {"Start Sample Aptitude?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" sx={{...styles.playfairDisplayFont , fontSize:'18px'}}>
              Are you sure you want to take the sample aptitude?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelTest} color="secondary"sx={{...styles.playfairDisplayFont }}>
              No
            </Button>
            <Button onClick={handleStartTest} color="secondary" sx={{...styles.playfairDisplayFont }} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={logoutDialogOpen}
          onClose={handleLogoutCancelled}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title"sx={{...styles.playfairDisplayFont , fontWeight:'bold'}}>{"Logout?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description"sx={{...styles.playfairDisplayFont , fontSize:'18px'}}>
              Are you sure you want to logout?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleLogoutCancelled} color="secondary" sx={{...styles.playfairDisplayFont }}>
              No
            </Button>
            <Button onClick={handleLogoutConfirmed} color="secondary"sx={{...styles.playfairDisplayFont }} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}