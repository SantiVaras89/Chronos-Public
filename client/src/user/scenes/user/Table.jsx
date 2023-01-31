import MaterialTable from 'material-table';
import { localization } from "../../components/MaterialTable";
import { getMain, addMain, updateMain, deleteMain, getEmployees, getEmployeesNoUser, getRoles } from './api';
import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';

  const Table = () => {
    const tableTitle = 'Usuarios';
    const [tableData, setTableData] = useState([]);
    const [employeeData, setEmpolyeeData] = useState([]);
    const [rolesData, setRolesData] = useState([]);

    //inicializo tabla
    useEffect(() => {
      getMain().then(data => {
        setTableData(data)
      });
      getEmployees().then(data => {
        setEmpolyeeData(data)
      });
      getRoles().then(data => {
        setRolesData(data)
      })
    }, []);

    console.log(tableData)

    let rolesValues = rolesData.reduce(function(acc, cur, i) {
      acc[cur.id] = cur.role;
  
      return acc;
    }, {});
  
    let employeeValues = employeeData.reduce(function(acc, cur, i) {
      acc[cur.id] = cur.first_name + ' ' + cur.last_name ;
  
      return acc;
    }, {});

    const columns = [
      { 
          field: "id", 
          title: "ID",
          editable: 'never',
      },
      {
        field: "employeeId",
        title: "Nombre",
        editable: 'onAdd',
        lookup: {...employeeValues},
      },
      {
        field: "employee.email",
        title: "E-Mail",
        editable: 'never',
      },
      {
        field: "login_name",
        title: "Usuario",
      },
    ];
    

    return(
    <MaterialTable
          title={tableTitle}
          data={tableData}
          columns={columns}
          localization={localization}
          editable={{
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