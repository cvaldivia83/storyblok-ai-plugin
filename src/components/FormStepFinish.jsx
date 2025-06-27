import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FormStepFinish = ({ blok, formData, setFormData }) => {

  const navigate = useNavigate();

  const handleSubmit = () => {
    // maybe send the collected data somewhere first
    navigate('/result');
  };

  return (
    <Box padding={4}>
       <Typography variant='h4' component='h1' textAlign="center">{blok.headline}</Typography>

      <Typography variant='body2' component='p' textAlign="center">{blok.paragraph}</Typography>

      <Button onClick={handleSubmit}>{blok.cta_text}</Button>

    </Box>
  )
}

export default FormStepFinish;







