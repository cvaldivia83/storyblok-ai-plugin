import { Box, Container, Typography, useMediaQuery } from '@mui/material';


const Hero = ({ blok }) => {
  const matches = useMediaQuery('(max-width:600px)');

  return (
    <Box sx={{ py: 4, px: 2, 
    backgroundColor: 'rgb(50, 50, 50)', 
    height: '100vh', 
    backgroundImage: `url(${blok.background_image?.filename})`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    }} 
     >
      <Box  sx={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 1,
      }} />
      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Typography component="h1" variant={matches ? "h3" : "h1"} sx={{ color: '#FFF', fontWeight: 900, textShadow: '1px 1px 3px #1c1c1c' }} >
          {blok.title}
        </Typography>

        <Typography component="h2" variant={matches ? "h6" : "p"} sx={{ color: 'rgb(200, 200, 200)', textShadow: '2px 2px 4px #1c1c1c' }} gutterBottom>
          {blok.subtitle}
        </Typography>
      </Container>
    </Box>
  );
}

export default Hero;