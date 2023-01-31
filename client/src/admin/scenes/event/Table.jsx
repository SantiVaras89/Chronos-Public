import MaterialTable from 'material-table';
import { localization } from "../../components/MaterialTable";
import { getMain, addMain, updateMain, deleteMain, getEventTypesActive, getEventTypes, getClients, getEmployees, getProject, getHoliday } from './api';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import React, { useState, useEffect } from 'react';
import moment from 'moment/moment';

export const extraHourCalc=async(date, start_time, hours) =>{
  let extraTime = [0,0];
  extraTime[0] = "0.00";
  extraTime[1] = "0.00";
  let response = await getHoliday(date)
  let holiday = await response;
  let weekday = moment(date).format("dddd");
  if(holiday === "TRUE" || weekday === "Sunday"){
    console.log("es feriado o domingo")
    extraTime[1] = hours;
  }
  else{
    if(weekday === "Saturday"){
      let startHour = moment(start_time).format("HH");
      let startMinutes = moment(start_time).format("mm");
      startMinutes = Number(parseInt(startMinutes)/60).toFixed(2);
      let final = parseInt(startHour) + parseFloat(startMinutes);
      let restar = 13 - final;
      if(restar > 0){
        extraTime[0] = restar;
        extraTime[1] = hours - restar ;
      }
      else{
        extraTime[1] = hours;
      }
    }
    else{
      extraTime[0] = hours;
    }
  }
  return extraTime;
}

const Table = () => {
  const tableTitle = 'Afectaciones';
  const [tableData, setTableData] = useState([]);
  const [eventTypeData, setEventTypeData] = useState([]);
  const [activeEventTypeData, setActiveEventTypeData] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  let startUpdateFlag = "N";
  let endUpdateFlag = "N";

  //const diff = require("diff");

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

    //inicializo tabla
    useEffect(() => {
      getMain().then(data => {
        setTableData(data)
      });
    getEventTypesActive().then(data => {
      setActiveEventTypeData(data);   
    });
    getEventTypes().then(data => {
      setEventTypeData(data);   
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
  let typeValues = eventTypeData.reduce(function(acc, cur, i) {
    acc[cur.id] = cur.name;
    
    return acc;
  }, {});

  //Carga los valores para el campo de empleado
  let employeeValues = employeeData.reduce(function(acc, cur, i) {
    acc[cur.id] = cur.first_name + ' ' + cur.last_name;
    
    return acc;
  }, {});

  //Carga los valores para el campo de proyecto
  let projectValues = projectData.reduce(function(acc, cur, i) {
    acc[cur.id] = cur.name;
    
    return acc;
  }, {});

    //Definicion de las columnas de la tabla
  const columns = [
    { field: "id", 
      title: "ID",
      editable: "never",
    },
    {
      field: "eventTypeId",
      title: "Tipo Evento",
      lookup: {...typeValues},
      editComponent: props => ( 
        <Select
          variant="standard"
          displayEmpty
          name='event_typeId'
          value={props.rowData.event_typeId}
          onChange={(selectedOption) => {
            props.onChange(selectedOption.target.value)
          }}
          input={<OutlinedInput />}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}>
          <MenuItem disabled value="">
            <em>Afectación</em>
          </MenuItem>
          {activeEventTypeData.map((type) => (
            <MenuItem
              key={type.id}
              value={type.id}
            >
              {type.name}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      field: "employeeId",
      title: "Empleado",
      lookup: {...employeeValues},
    },
    {
      field: "projectId",
      title: "Proyecto",
      lookup: {...projectValues},
    },
    {
      field: "project.clientId",
      title: "Cliente",
      lookup: {...clientValues},
      editable: "never",
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
      title: "Hora Inicio",
      type: 'time',
      render: rowData => moment(rowData.start_time).format('hh:mm A'),
      editComponent: props => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Hora Inicio"
            name="start_time"
            value={props.rowData.start_time}
            onChange={(event) => {
              startUpdateFlag = 'Y';
              props.onChange(event);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      )
    },
    {
      field: "end_time",
      title: "Hora Fin",
      type: 'time',
      render: rowData => moment(rowData.end_time).format('hh:mm A'),
      editComponent: props => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Hora Fin"
            name="end_time"
            value={props.rowData.end_time}
            onChange={(event) => {
              endUpdateFlag = 'Y';
              props.onChange(event);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      )
    },
    {
      field: "period",
      title: "Periodo(s)",
      editable: "never"
    },
    {
      field: "hours",
      title: "Horas",
      editable: "never"
    },
    {
      field: "half_value",
      title: "Horas 50%",
      editable: "never"
    },
    {
      field: "full_value",
      title: "Horas 100%",
      editable: "never"
    },
  ];
    

    return(
    <MaterialTable
          title={tableTitle}
          data={tableData}
          columns={columns}
          localization={localization}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  addMain(newData).then(res =>{
                    getMain().then(data => {
                        setTableData(data)})
                  });
                  resolve();
                }, 1000)
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                    const dataUpdate = [...tableData];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setTableData([...dataUpdate]);
                    updateMain(newData, oldData, startUpdateFlag, endUpdateFlag).then(res =>{
                      getMain().then(data => {
                          setTableData(data)})
                    });
                    startUpdateFlag = 'N';
                    endUpdateFlag = 'N';
                    resolve();
                }, 1000);
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                  setTimeout(() => {
                      const dataDelete = [...tableData];
                      const index = oldData.tableData.id;
                      dataDelete.splice(index, 1);
                      setTableData([...dataDelete]);
                      deleteMain(oldData);
                      resolve();
                  }, 1000);
              })
          }}
          options={{
            actionsColumnIndex: -1,
            pageSize: 15,
            pageSizeOptions: [15, 20],
            columnsButton: true,
            addRowPosition: 'first',
            exportButton: true,
            filtering: true,
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