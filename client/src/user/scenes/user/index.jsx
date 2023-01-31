import React from 'react';
import { useTheme, Box } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../components/Header";
import Table from './Table';

export const mainEntity = 'user'

const User = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    
    <Box m="20px">
      <Header
        title="Mis Datos"
        subtitle=""
      />
      <Box sx={{ width: '100%' }}>
      </Box>
      <Box>
        <Table/>
      </Box>
    </Box>
  );
};

export default User;
