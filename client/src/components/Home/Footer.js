import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box, Container, Grid, Stack, IconButton, Button, useMediaQuery } from '@mui/material';

function Footer() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const linkStyle = {
    color: '#BC6FF1',
    textDecoration: 'none',
    padding: '10px 15px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    width: '200px',
    '&:hover': {
      backgroundColor: '#52057B',
      color: '#FFF6E0',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    },
    '&:active': {
      transform: 'translateY(1px)',
      boxShadow: '0 2px 3px rgba(0,0,0,0.1)',
    },
  };
  const styles = {
    meriendaFont: {
      fontFamily: '"Merienda", cursive',
      fontOpticalSizing: 'auto',
      fontWeight: '<weight>', // Replace <weight> with the desired font weight
      fontStyle: 'normal',
    },
    shantellSansFont: {
      fontFamily: '"Shantell Sans", cursive',
      fontOpticalSizing: 'auto',
      fontWeight: '<weight>', // Replace <weight> with the desired font weight
      fontStyle: 'normal',
      fontVariationSettings: '"BNCE" 0, "INFM" 0, "SPAC" 0',
    },
    alegreyaFont: {
      fontFamily: '"Alegreya", serif',
      fontOpticalSizing: 'auto',
      fontWeight: '<weight>', // Replace <weight> with the desired font weight
      fontStyle: 'normal',
    },
    playfairDisplayFont: {
      fontFamily: '"Playfair Display", serif',
      fontOpticalSizing: 'auto',
      fontWeight: '<weight>', // Replace <weight> with the desired font weight
      fontStyle: 'normal',
    },
  };
  return (
    <footer className='footer-container' sx={{ backgroundColor: 'black', color: '#86C232', borderTop: '1px solid #86C232' }}>
      <Box sx={{ backgroundColor: 'black', padding: '4rem 0' }}>
        <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          <Grid container spacing={2} sx={{ width: '100%' }}>
            {isMobile ? (
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Link to="/" style={{ textDecoration: 'none', color: '#86C232', display: 'flex', alignItems: 'center', fontFamily: 'Kode Mono' }}>
                  <Typography variant="h6" component="div" sx={{ ...styles.meriendaFont,marginRight: 1 }}>
                    EduConnect
                  </Typography>
                  <i className="fab fa-typo3" style={{ fontSize: '1.8rem' }} />
                </Link>
                <IconButton>
                  <i className="fas fa-bars" style={{ color: '#86C232' }} />
                </IconButton>
              </Grid>
            ) : (
              <>
                <Grid item xs={6}>
                  <Typography variant="h6" gutterBottom sx={{ ...styles.playfairDisplayFont, fontSize: '1.8rem' ,color: '#FFF6E0' }}>
                    About Us
                  </Typography>
                  <Stack spacing={1}>
                    <Typography component={Link} to="/aboutus" variant="underline" sx={{...linkStyle, ...styles.shantellSansFont}}>
                      How it works
                    </Typography>
                    <Typography component={Link} to="/aboutus" variant="underline" sx={{...linkStyle, ...styles.shantellSansFont}}>
                      Types of Service
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" gutterBottom sx={{ ...styles.playfairDisplayFont, color: '#FFF6E0' , fontSize: '1.8rem'}}>
                    Contact Us
                  </Typography>
                  <Stack spacing={1}>
                    <Typography component={Link} to="/" variant="underline" sx={{...linkStyle, ...styles.shantellSansFont}}>
                      Contact
                    </Typography>
                    <Typography component={Link} to="/" variant="underline" sx={{...linkStyle, ...styles.shantellSansFont}}>
                      Support
                    </Typography>
                  </Stack>
                </Grid>
              </>
            )}
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mt: 4 }}>
            <Typography variant="body2" gutterBottom sx={{ ...styles.meriendaFont, color: '#892CDC' ,fontSize: '1.5rem'}}>
              EduConnect ©️ 2023
            </Typography>
            {/* <Link to="/" style={{ textDecoration: 'none', color: '#BC6FF1', display: 'flex', alignItems: 'center', fontFamily: 'Kode Mono' }}>
              <Typography variant="h6" component="div" sx={{ ...styles.meriendaFont,marginRight: 1 }}>
                EduConnect
              </Typography>
              <i className="fab fa-typo3" style={{ fontSize: '1.8rem' }} />
            </Link> */}
          </Box>
        </Container>
      </Box>
    </footer>
  );
}

export default Footer;