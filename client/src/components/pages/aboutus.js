import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import Footer from '../Home/Footer';
import Navbar from '../Home/Navbar';

function AboutUs() {
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
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Container maxWidth="xl" component="main" sx={{ flexGrow: 1, py: 0 }}>
        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh', position: 'relative' }}>
          <Box
            component="video"
            src="/videos/video-3.mp4"
            autoPlay
            loop
            muted
            sx={{
              width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: 0, 
            }}
          />
          <Grid item xs={12} sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Typography variant="h1" component="h2" sx={{ color: '#FFF6E0', ...styles.alegreyaFont,fontSize: { xs: '3.5rem', md: '4.5rem' }, mb: 2 }}>
              About Us 
            </Typography>
            <Typography variant="h6" sx={{ color: '#FFF6E0', ...styles.alegreyaFont, fontSize: { xs: '1.5rem', md: '2rem' }, maxWidth: '600px', mx: 'auto' }}>
              Your Success, Our Mission!
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Footer sx={{ mt: 'auto' }} />
    </Box>
  );
}

export default AboutUs;