import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import { getData } from './api';
import { employeeId } from '../../../UserApp';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const [data, setData] = useState({
    assignment_count: "0",
    client_count: "0",
    project_count: "0",
  });


    //Trae los datos de la base
  useEffect(() => {
    getData(employeeId).then(data => {
      setData(data[0])
    });
  }, []);



  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="" />

        <Box>

        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data.assignment_count}
            subtitle="Mis Asignaciones"
            progress="0.75"
            increase="+14%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

      </Box>
    </Box>
  );
};

export default Dashboard;
