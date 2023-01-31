import React from 'react';
import { useTheme, Box } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../components/Header";
import Table from './Table';

export const mainEntity = 'employee'

const Employee = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    
    <Box m="20px">
      <Header
        title="Empleados"
        subtitle="Lista de Empleados"
      />
      <Box sx={{ width: '100%' }}>
      </Box>
      <Box>
        <Table/>
      </Box>
    </Box>
  );
};

export default Employee;
