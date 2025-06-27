import { Box, TextField, Typography, Button } from '@mui/material';

const FormStepProductDetails = ({ blok, formData, setFormData, onNext }) => {
  return (
    <Box padding={4}>

      <Typography variant='h4' component='h1' textAlign="center">How do you want to tell us about your product?</Typography>
      <Typography variant='body1' component='p' textAlign="center">Pick your vibe — write a quick description or upload an image and let us do the talking. Either way, we’ve got you covered with spot-on ad copy.</Typography>


      <Box marginBottom={3}>
        <TextField
        fullWidth
        label={blok.product_description}
        value={formData.product_description}
        onChange={(event) => setFormData({...formData, product_description: event.target.value})} />
        <Typography variant="body2" component="p" sx={{ my: 1, fontWeight: 500, color: 'rgb(60, 60, 60)' }}>{blok.product_subtitle}</Typography>
      </Box>

      <Box marginBottom={3}>
        <TextField
        fullWidth
        type="file"
        value={formData.image_title}
        onChange={(event) => setFormData({...formData, image: event.target.value})} />
        <Typography variant="body2" component="p" sx={{ my: 1, fontWeight: 500, color: 'rgb(60, 60, 60)' }}>{blok.image_title}</Typography>
      </Box>

      <Button variant="contained" onClick={onNext}>Next</Button>
      
    </Box>
  )
}

export default FormStepProductDetails;