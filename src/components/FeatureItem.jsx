import { Box, Typography } from '@mui/material';

const FeatureItem = ({ blok }) => {
  return (
    <Box sx={{ mb: 3 }} >
      <Typography variant="h6" component="h3">{blok.title}</Typography>
      <Typography variant="body2" color="text-secondary">{blok.description}</Typography>
    </Box>
  )
}

export default FeatureItem;