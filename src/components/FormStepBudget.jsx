import { Box, TextField, Typography, Button } from '@mui/material';

const FormStepBudget = ({ blok, formData, setFormData, onNext }) => {
  return (
    <Box padding={4}>

      <Typography variant='h4' component='h1' textAlign="center">What's your monthly ad spend?</Typography>

      <Typography variant="body2" component="p">
        Give us a ballpark — how much are you planning to invest in Google Ads each month? No pressure, just a rough idea helps us tailor your campaign.
      </Typography>

      <Box marginBottom={3}>
        <TextField
        fullWidth
        label={blok.budget_weekly}
        value={formData.budget}
        onChange={(event) => setFormData({...formData, budget: parseInt(event.target.value, 10)})} />
        <Typography variant="body2" component="p" sx={{ my: 1, fontWeight: 500, color: 'rgb(60, 60, 60)' }}>{blok.budget_subtitle}</Typography>
      </Box>

      <Button variant="contained" onClick={onNext}>Next</Button>
    </Box>
  )
}

export default FormStepBudget;