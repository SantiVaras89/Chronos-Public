import MaterialTable from 'material-table';
import { localization } from "../../components/MaterialTable";
import { getMain, addMain, updateMain, deleteMain, getClients, getEmployees, getProject } from './api';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import React, { useState, useEffect } from 'react';

  const Table = () => {
    const tableTitle = 'Asignaciones';
    const [tableData, setTableData] = useState([]);
    const [clientData, setClientData] = useState([]);
    const [employeeData, setEmployeeData] = useState([]);
    const [projectData, setProjectData] = useState([]);



    //inicializo tabla
    useEffect(() => {
      getMain().then(data => {
        setTableData(data);
      });
      getClients().then(data => {
        setClientData(data);   
      });
      getEmployees().then(data => {
        setEmployeeData(data);   
      });
      getProject().then(data => {
        setProjectData(data);  
      });
    }, []);

    //Carga los valores para el campo de cliente
  let clientValues = clientData.reduce(function(acc, cur, i) {
    acc[cur.id] = cur.name;
    
    return acc;
  }, {});

  //Carga los valores para el campo de cliente
  let employeeValues = employeeData.reduce(function(acc, cur, i) {
    acc[cur.id] = cur.first_name + ' ' + cur.last_name ;
    
    return acc;
  }, {});

  //Carga los valores para el campo de cliente
  let projectValues = projectData.reduce(function(acc, cur, i) {
    acc[cur.id] = cur.name;
    
    return acc;
  }, {});

    const columns = [
      { field: "id", 
        title: "ID",
        editable: "never",
      },
      {
        field: "project.clientId",
        title: "Cliente",
        lookup: {...clientValues},
        editable: 'never',
      },
      {
        field: "projectId",
        title: "Proyecto",
        lookup: {...projectValues},
      },
      {
        field: "start_date",
        title: "Fecha Inicio",
        type: "date",
        dateSetting: {
          format: 'dd/MM/yyyy'
        },
        editComponent: props => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Fecha Inicio"
              inputFormat="DD/MM/YYYY"
              name='start_Date'
              value={props.rowData.start_date}
              onChange={(event) => {
                props.onChange(event);
              }}
              renderInput={(params) => <TextField variant="standard" {...params} />}
            />
          </LocalizationProvider>
        ),   
      },
      {
        field: "end_date",
        title: "Fecha Finalizacion",
        type: "date",
        editComponent: props => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Fecha Finalizacion"
              inputFormat="DD/MM/YYYY"
              name='end_date'
              value={props.rowData.end_date}
              onChange={(event) => {
                props.onChange(event);
              }}
              renderInput={(params) => <TextField variant="standard" {...params} />}
            />
          </LocalizationProvider>
        ),
      },
      {
        field: "start_time",
        title: "Horario Inicio",
      },
      {
        field: "end_time",
        title: "Horario Fin",
      },
    ];
    

    return(
    <MaterialTable
          title={tableTitle}
          data={tableData}
          columns={columns}
          localization={localization}
          options={{
            actionsColumnIndex: -1,
            pageSize: 15,
            pageSizeOptions: [15, 20],
            columnsButton: true,
            addRowPosition: 'first',
            exportButton: true,
            filtering: false,
            cellStyle: {  
            },
            headerStyle:{ 
            },
            rowStyle:{
            },
          }} 
        />
    )
  }
  
  export default Table