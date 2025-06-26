import { Typography, Box, Button } from "@mui/material"
import { useMediaQuery } from '@mui/material';

const Cta = ({blok}) => {

  const matches = useMediaQuery('(min-width: 800px)');

  console.log('hello world')
  return (
    <Box sx={{ textAlign: "center", px: 4 }}>
      <Typography variant="subtitle1" textAlign="center" fontSize={matches ? 20 : 16} mt={4} mb={8}>
        {blok.paragraph}
      </Typography>

      <Button variant="outlined" sx={{ my: 2, fontSize: matches ? 24 : 16 }} color="success" size="large" disableElevation>{blok.cta}</Button>
    </Box>
  )
}

export default Cta;