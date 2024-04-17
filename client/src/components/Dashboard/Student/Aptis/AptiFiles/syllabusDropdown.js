import React from "react";
import { Link } from "react-router-dom";
import { Button, Menu, MenuItem, Box } from "@mui/material";
import companies from "./syllabus.json";
import companie from "./register.json";
import Qpapers from "./PYQP.json";

function SyllabusDropdown({ companyName }) {
  const syllabusSections = companies.companies[companyName]?.sections || [];
  const RegisterSections = companie.companie[companyName]?.sections || [];
  const PyqpSections = Qpapers.QPapers[companyName]?.sections || [];

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box width={180} height={50} mb={0}>
      <div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          variant="outlined"
          color="primary"
          fullWidth
          sx={{
            fontFamily: '"Playfair Display", serif',
            color: "#892cdc",
            border: "solid #892cdc",
            "&:hover": {
              border: "solid #892cdc",
            },
          }}
        >
          {companyName}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            component={Link}
            to={`/dashboard/aptitude-preparation/syllabus?company=${companyName}`}
            onClick={handleClose}
            sx={{fontFamily: '"Playfair Display" , bold'}}
          >
            Syllabus
          </MenuItem>
          <MenuItem
            component={Link}
            to={`/dashboard/aptitude-preparation/register?company=${companyName}`}
            onClick={handleClose}
            sx={{fontFamily: '"Playfair Display" , bold'}}
          >
            Register
          </MenuItem>
          <MenuItem
            component={Link}
            to={`/dashboard/aptitude-preparation/Pyqp?company=${companyName}`}
            onClick={handleClose}
            sx={{fontFamily: '"Playfair Display" , bold'}}
          >
            Past Year Question Papers
          </MenuItem>
        </Menu>
      </div>
    </Box>
  );
}

export default SyllabusDropdown;
