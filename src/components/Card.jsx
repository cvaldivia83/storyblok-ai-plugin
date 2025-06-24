import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

const Card = () => {
  return (
    <Paper elevation={1} square={false} sx={{ 
      textAlign: 'center', 
      width: '70%', 
      paddingTop: 4, 
      paddingBottom: 4, 
      paddingLeft: 2, 
      paddingRight: 2 }}>
      <TextField
        id="outlined-basic"
        variant="outlined"
        helperText="Insert product description here - we will do the work for you"
        color="secondary"
        fullWidth
        sx={{ marginBottom: 2 }}
      />
    </Paper>
  )
}

export default Card;