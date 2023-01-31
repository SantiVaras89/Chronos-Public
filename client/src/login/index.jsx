import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import axios from 'axios';
import swal from 'sweetalert';
import { baseUrl } from '../App';

/*
function Copyright(props) {
  
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.google.com/">
        SyF Consultores
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
*/

//Consigue datos de Usuario
const loginUser=async(user)=> {
    return await axios.post(`${baseUrl}/login`,user)
    .then(res => res.data);
}


const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

let tokenBase = localStorage.getItem('token');
if(tokenBase === null){
  let token = {
    token: "",
    login_name: "",
    role_id: "",
    remember: ""
  }
  localStorage.setItem('token', JSON.stringify(token));
}
else{
  const userToken = JSON.parse(localStorage.getItem('token'));
}
export default function SignIn({ setToken }) {
  //console.log(localStorage.getItem('token'));
  const [checked, setChecked] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const auxLogin = {
        login_name: data.get("login_name"),
        password: data.get("password"),
      }
    const result = await loginUser(auxLogin);
    if(result.length === 0){
        swal("ERROR", "Los datos ingresados no corresponden a un usuario activo", "warning");
    }
    else{
        let token = {
            token: result[0].id,
            login_name: result[0].login_name,
            employee_id: result[0].employeeId,
            role_id: result[0].roleId,
            remember: checked,
        }
        setToken(token);
    }
    
  };
  
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    


    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            CRONOS
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="login_name"
              label="Usuario"
              name="login_name"
              autoComplete="login_name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />{/*
            <FormControlLabel
              control={<Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />}
              label="Recuerdame"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ingresar
            </Button>
            <Grid container>
              <Grid item xs>{/* 
                <Link href="#" variant="body2">
                  Olvidó su contraseña?
                </Link>*/}
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/*<Copyright sx={{ mt: 8, mb: 4 }} />*/}
      </Container>
    </ThemeProvider>
  );
}

SignIn.propTypes = {
    setToken: PropTypes.func.isRequired
  };