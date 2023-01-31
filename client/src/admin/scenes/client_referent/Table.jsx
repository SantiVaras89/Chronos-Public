import MaterialTable from 'material-table';
import { localization } from "../../components/MaterialTable";
import { getMain, addMain, updateMain, deleteMain, getClients } from './api';
import React, { useState, useEffect } from 'react';

  const Table = () => {
    const tableTitle = 'Referentes';
    const [tableData, setTableData] = useState([]);
    const [clientData, setClientData] = useState([]);

    //inicializo tabla
    useEffect(() => {
      getMain().then(data => {
        setTableData(data)
      });
    getClients().then(data => {
      setClientData(data);   
    });
    }, []);

  //Carga los valores para el campo de cliente
  let clientValues = clientData.reduce(function(acc, cur, i) {
    acc[cur.id] = cur.name;
    
    return acc;
  }, {});


    const columns = [
        { field: "id", 
          title: "ID",
          editable: "never",
        },
        {
          field: "full_name",
          title: "Nombre y Apellido",
        },
        {
          field: "clientId",
          title: "Cliente",
          lookup: {...clientValues},
        },
        {
          field: "email",
          title: "E-Mail",
        },
        {
          field: "role",
          title: "Rol",
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