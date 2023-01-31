import MaterialTable from 'material-table';
import { localization } from "../../components/MaterialTable";
import { getMain, addMain, updateMain, deleteMain, getClients, getCompany } from './api';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import React, { useState, useEffect } from 'react';

  const Table = () => {
    const tableTitle = 'Proyectos';
    const [tableData, setTableData] = useState([]);
    const [clientData, setClientData] = useState([]);
    const [companyData, setCompanyData] = useState([]);

    //inicializo tabla
    useEffect(() => {
      getMain().then(data => {
        setTableData(data)
      });
      getClients().then(data => {
        setClientData(data);   
      });
      getCompany().then(data => {
        setCompanyData(data)
      })
    }, []);

  //Carga los valores para el campo de cliente
  let clientValues = clientData.reduce(function(acc, cur, i) {
    acc[cur.id] = cur.name;
    
    return acc;
  }, {});

  let companyValues = companyData.reduce(function(acc, cur, i) {
    acc[cur.id] = cur.alias;
    return acc;
  }, {});

    const columns = [
      { field: "id", 
        title: "ID",
        editable: "never",
      },
      {
        field: "clientId",
        title: "Cliente",
        lookup: {...clientValues},
      },
      {
        field: "companyId",
        title: "Consultora",
        lookup: {...companyValues},
      },
      {
        field: "name",
        title: "Proyecto",
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
              name='endDate'
              value={props.rowData.end_date}
              onChange={(event) => {
                props.onChange(event);
              }}
              renderInput={(params) => <TextField variant="standard" {...params} />}
            />
          </LocalizationProvider>
        ),
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
                    updateMain(newData);
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