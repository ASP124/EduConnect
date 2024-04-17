import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, CardActionArea, Box } from '@mui/material';

function Cards() {
  const cardsData = [
    {
      id: 1,
      src: 'images/img-6.jpg',
      text: 'Get Variety of Learning Resources Uploaded Directly by Teaching Authority',
      label: 'Educational Resources',
      path: '/services',
    },
    {
      id: 2,
      src: 'images/img-2.jpg',
      text: 'Track your daily Attendance from our IoT-Based Attendance Monitoring System',
      label: 'Attendance Tracking',
      path: '/services',
    },
    {
      id: 3,
      src: 'images/img-9.jpg',
      text: "Receive latest messages and updates in real-time from teachers through our website.",
      label: 'Notification Facility',
      path: '/services',
    },
    {
      id: 4,
      src: 'images/img-11.jpg',
      text: "Enjoy a personalized dashboard tailored to your role, whether you're a student or teacher",
      label: 'Personalized Dashboards',
      path: '/services',
    },
  ];
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
    <div className='cards'>
      <Typography variant="h2" align="center" sx = {{...styles.alegreyaFont}} gutterBottom color="#892CDC">
        Showcasing our Top Features
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {cardsData.map((card) => (
          <Grid item key={card.id} xs={12} sm={6} md={3}>
            <Box p={2}> {/* Adding padding to the outside of the card */}
              <Card
                sx={{
                  maxWidth: 345,
                  border: '2px solid #52057B',
                  borderRadius: '12px',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  height: '100%',
                  transition: 'transform 0.3s', // Adding transition for hover effect
                  '&:hover': {
                    transform: 'scale(1.05)', // Scaling up on hover for zoom effect
                  },
                  
                }}
              >
                <CardActionArea href={card.path}>
                  <CardMedia
                    component="img"
                    image={card.src}
                    alt={card.text}
                    sx={{ height: 200, borderRadius: '10px 10px 0 0' }}
                  />
                  <CardContent>
                    <Typography variant="h5" component="div" sx = {{...styles.playfairDisplayFont}}gutterBottom>
                      {card.text}
                    </Typography>
                    <Typography variant="body2" fontFamily="Ubuntu" color="text.secondary" gutterBottom>
                      {card.label}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Cards;