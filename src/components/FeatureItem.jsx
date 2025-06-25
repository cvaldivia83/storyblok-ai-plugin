import { Box, Typography, Stack } from '@mui/material';
import { iconMap } from '../../utils/iconMap';
import { useMediaQuery } from '@mui/material';

const FeatureItem = ({ blok }) => {

  const matches = useMediaQuery('(max-width:700px)');

  const IconComponent = iconMap[blok.icon] || iconMap.done;

  return (
   <Stack height={matches ? "366px" : "300px"} direction="column" spacing={2} alignItems="center" justifyContent="center" padding={4} border={1} borderRadius={2} borderColor="rgb(200, 200, 200)">
      <Box>
        <IconComponent />
      </Box>

      <Box sx={{ mb: 3 }} >
        <Typography variant="h6" component="h3" textAlign="center" mb={2}>{blok.title}</Typography>
        <Typography variant="body1" color="text-secondary" textAlign="center">{blok.description}</Typography>
      </Box>
   </Stack>
  )
}

export default FeatureItem;