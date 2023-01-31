import MaterialTable from 'material-table';
import { localization } from "../../components/MaterialTable";
import { getMain, addMain, updateMain, deleteMain, getCompany } from './api';
import React, { useState, useEffect } from 'react';

  const Table = () => {
    const tableTitle = 'Empleados';
    const [tableData, setTableData] = useState([]);
    const [companyData, setCompanyData] = useState([]);

    //inicializo tabla
    useEffect(() => {
      getMain().then(data => {
        setTableData(data)
      });
      getCompany().then(data => {
        setCompanyData(data)
      })
    }, []);

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
          field: "first_name",
          title: "Nombre",
        },
        {
          field: "last_name",
          title: "Apellido",
        },
        {
          field: "companyId",
          title: "Nómina",
          lookup: {...companyValues},
        },
        {
          field: "email",
          title: "E-Mail",
        },
        {
          field: "dni",
          title: "DNI",
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
            pageSize: 5,
            pageSizeOptions: [5, 10, 15],
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