import React from 'react'
import { makeStyles } from '@mui/styles';
import { Modal, TextField, Button } from '@mui/material';

const Modales = () => {
    const useStyles = makeStyles((theme) => ({
        modal: {
          position: 'absolute',
          width: 400,
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        },
        iconos:{
          cursor: 'pointer'
        },
        inputMaterial:{
          width: '100%'
        }
      }));
      
      const styles = useStyles();

      const bodyInsertarEmpleados=(
        <div className={styles.modal}>
            <h3>Agregar Nuevo Empleado</h3>
            <TextField variant="standard" className={styles.inputMaterial} label="Nombre" />
            <br />
            <TextField variant="standard" className={styles.inputMaterial} label="Apellido" />
            <br /><br />
            <div align="right">
                <Button color='primary'>Insertar</Button>
                <Button>Cancelar</Button>
            </div>
        </div>
    )
  return (
    <div>Modales</div>
  )
}

export default Modales
