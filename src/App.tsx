import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Content from './Content';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'© '}
      <Link color="inherit" href="https://www.froystein.jp/">
        Froystein Consulting Co., Ltd
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4, textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Froystein Consulting
        </Typography>
        <Content />
        <Copyright />
      </Box>
    </Container>
  );
}
