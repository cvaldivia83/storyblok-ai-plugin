import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import './App.css';
import Card from './components/Card.jsx';


const App = () => {
  return (
    <main>
      <Container sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh'}}>
          <Typography variant="h1" component="h1" gutterBottom sx={{ fontWeight: 900 }}>
            We create for you
          </Typography>
        <Card />
      </Container>
    </main>
  )
}

export default App;