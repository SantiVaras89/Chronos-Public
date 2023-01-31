import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import Header from "../../components/Header";
import swal from 'sweetalert';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { checkPassword, changePassword } from './api';



const Password = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('token')));

  const handleSubmit = async (event) => {
    event.preventDefault();
    let error = 0;
    const data = new FormData(event.currentTarget);
    const auxPassword = {
        actual_pass: data.get("actual_pass"),
        new_pass_one: data.get("new_pass_one"),
        new_pass_two: data.get("new_pass_two"),
      }
    if(auxPassword.new_pass_one === auxPassword.actual_pass){
      error = 1;
      swal("ERROR", "La nueva contraseña no puede ser igual a la actual", "warning");
    }
    if(auxPassword.new_pass_one !== auxPassword.new_pass_two){
      error = 1;
      swal("ERROR", "Los campos de nueva contraseña no coinciden", "warning");
    }
    if(auxPassword.new_pass_one === '' || auxPassword.new_pass_two === '' || auxPassword.actual_pass === ''){
      error = 1;
      swal("ERROR", "Todos los campos son requeridos", "warning");
    }
    if(error === 0){
      const auxCheck = {
        login_name: userData.login_name,
        password: data.get("actual_pass"),
      }
      const check = await checkPassword(auxCheck);
      const newPassword = auxPassword.new_pass_one;
      
      if(check.length === 0){
        swal("ERROR", "La contraseña actual es incorrecta", "warning");
      }
      else{
        
        const result = await changePassword(newPassword);
        if(check.length !== 0){
          swal("SUCCESS","La contraseña fue modificada correctamente","success");
        }
      }
    }
  };
  
 
  return (
    <Box m="20px">
        <Header title="Cambiar Contraseña" subtitle="" />
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              defaultValue=''
              id="actual_pass"
              label="Contraseña Actual"
              name="actual_pass"
              type="password"
              autoComplete="current-password"
              variant="filled" 

            />
            <TextField
              margin="normal"
              required
              fullWidth
              defaultValue=''
              id="new_pass_one"
              label="Nueva Contraseña"
              name="new_pass_one"
              type="password"
              autoComplete="current-password"
              variant="filled" 

            />
            <TextField
              margin="normal"
              required
              fullWidth
              defaultValue=''
              id="new_pass_two"
              label="Confirme Nueva Contraseña"
              name="new_pass_two"
              type="password"
              autoComplete="current-password"
              variant="filled" 

            />

            <Button
              type="submit"
              //fullWidth
              //variant="contained"
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              Cambiar Contraseña
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
            </Grid>
          </Box>
      
    </Box>
  );
};

export default Password;
