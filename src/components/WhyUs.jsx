import { Box, Typography, Container, Grid } from '@mui/material';
import { StoryblokComponent } from '@storyblok/react';

const WhyUs = ({blok}) => {
  return (
    <Box sx={{ py: 10, backgroundColor: '#FAFAFA' }}>
      <Container>
        <Typography variant="h4" component="h2" gutterBottom textAlign="center">
          {blok.headline}
        </Typography>

        {blok.intro && (
          <Typography variant="subtitle1" textAlign="center" mb={4}>{blok.intro}</Typography>
        )}

        <Grid container spacing={4}>
          {blok.features?.map((feature) => (
            <Grid item>
              <StoryblokComponent blok={feature} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default WhyUs;