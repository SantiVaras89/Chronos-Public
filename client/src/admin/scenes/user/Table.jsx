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
    const [employeeNoUserData, setEmpolyeeNoUserData] = useState([]);
    const [rolesData, setRolesData] = useState([]);
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
      getEmployees().then(data => {
        setEmpolyeeData(data)
      });
      getEmployeesNoUser().then(data => {
        setEmpolyeeNoUserData(data)
      });
      getRoles().then(data => {
        setRolesData(data)
      })
    }, []);

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
        editComponent: props => ( 
          <Select
            variant="standard"
            displayEmpty
            name='employeeId'
            value={props.rowData.employeeId}
            onChange={(selectedOption) => {
              props.onChange(selectedOption.target.value)
            }}
            input={<OutlinedInput />}
            MenuProps={MenuProps}
            inputProps={{ 'aria-label': 'Without label' }}>
            <MenuItem disabled value="">
              <em>Empleado</em>
            </MenuItem>
            {employeeNoUserData.map((employee) => (
              <MenuItem
                key={employee.id}
                value={employee.id}
              >
                {employee.first_name + ' ' + employee.last_name}
              </MenuItem>
            ))}
          </Select>
        ),
      },
      {
        field: "login_name",
        title: "Usuario",
      },
      {
        field: "roleId",
        title: "Rol",
        lookup: {...rolesValues},
    },
      {
          field: "status",
          title: "Estado",
          //editable: 'never',
          emptyValue: '1',
          lookup: {1:'Activo', 2:'Inactivo'},
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