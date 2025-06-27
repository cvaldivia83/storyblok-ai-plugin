import { TextField, Button, Box, Typography } from '@mui/material';

const FormStepBusinessInfo = ({ blok, formData, setFormData, onNext }) => {

  // console.log(blok)
  return (
    <Box padding={4}>
      <Box marginBottom={3}>
        <TextField
        fullWidth
        required
        label={blok.business_name}
        value={formData.business_name}
        onChange={(event) => setFormData({...formData, business_name: event.target.value})} />
        <Typography variant="body2" component="p" sx={{ my: 1, fontWeight: 500, color: 'rgb(60, 60, 60)' }}>{blok.businessName_subtitle}</Typography>
      </Box>

      <Box marginBottom={3}>

        <TextField
        fullWidth
        required
        label={blok.industry}
        value={formData.industry}
        onChange={(event) => setFormData({...formData, industry: event.target.value})} />
        <Typography variant="body2" component="p" sx={{ my: 1, fontWeight: 500, color: 'rgb(60, 60, 60)' }}>{blok.industry_subtitle}</Typography>
      </Box>

      <Box marginBottom={3}>
        <TextField
        fullWidth
        required
        label={blok.persona}
        value={formData.persona}
        onChange={(event) => setFormData({...formData, persona: event.target.value})} />
        <Typography variant="body2" component="p" sx={{ my: 1, fontWeight: 500, color: 'rgb(60, 60, 60)' }}>{blok.persona_subtitle}</Typography>
      </Box>

      <Box marginBottom={3}>

        <TextField
        fullWidth
        required
        label={blok.products}
        value={formData.products}
        onChange={(event) => setFormData({...formData, products: event.target.value})} />
        <Typography variant="body2" component="p" sx={{ my: 1, fontWeight: 500, color: 'rgb(60, 60, 60)' }}>{blok.products_subtitle}</Typography>
      </Box>

      <Box marginBottom={3}>

        <TextField
        fullWidth
        label={blok.differentiator}
        value={formData.differentiator}
        onChange={(event) => setFormData({...formData, differentiator: event.target.value})} />
        <Typography variant="body2" component="p" sx={{ my: 1, fontWeight: 500, color: 'rgb(60, 60, 60)' }}>{blok.differentiator_subtitle}</Typography>
      </Box>

      <Button variant="contained" onClick={onNext}>Next</Button>
    </Box>
  )
}

export default FormStepBusinessInfo;