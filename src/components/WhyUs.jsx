import { Box, Typography, Container, Grid } from '@mui/material';
import { StoryblokComponent } from '@storyblok/react';
import { useMediaQuery } from '@mui/material';

const WhyUs = ({blok}) => {

  const matches = useMediaQuery('(min-width: 800px)');

  const matchesMd = useMediaQuery('(min-width: 700px)');

  console.log(matches);

  return (  
    <Box sx={{ py: 10, px: 4, backgroundColor: '#FAFAFA' }}>
      <Container padding={2}>
        <Typography variant="h2" component="h2" gutterBottom textAlign="center" fontWeight={600}>
          {blok.headline}
        </Typography>

        {blok.intro && (
          <Typography variant="subtitle1" textAlign="center" fontSize={matches ? 20 : 16} mt={4} mb={8}>{blok.intro}</Typography>
        )}

        <Grid container spacing={2} marginTop={10}>
          {blok.features?.map((feature) => (
            <Grid size={(matches && 4) || (matchesMd && 6)} key={feature._uid}>
              <StoryblokComponent blok={feature} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default WhyUs;