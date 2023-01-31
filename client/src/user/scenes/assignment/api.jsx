import axios from 'axios';
import { baseUrl } from '../../../App';
import { mainEntity } from '.';
import moment from 'moment/moment';
import { employeeId } from '../../../UserApp';

//Llama a la API para conseguir datos de empleados
export const getMain=async()=> {
    return await axios.get(`${baseUrl}/${mainEntity}-user/${employeeId}`)
    .then(res => res.data);
  }

//Llama a la API de creacion de empleados
export const addMain=async(entity)=> {
  let start_date;
    let end_date;
    
    if(entity.start_date === null){
      start_date = null
    }
    else{
      if(entity.start_date === undefined){
        start_date = moment(new Date()).format('YYYY-MM-DD');
      }
      else{
        entity.start_date = entity.start_date.$d
        start_date = moment(entity.start_date).format('YYYY-MM-DD')
      }
    }
    
    if(entity.end_date === null){
      end_date = null
    }
    else{
      if(entity.end_date === undefined){
        end_date = moment(new Date()).format('YYYY-MM-DD');
      }
      else{
        entity.end_date = entity.end_date.$d
        end_date = moment(entity.end_date).format('YYYY-MM-DD')
      }
    }
    const auxEntity = {
      projectId: entity.projectId,
      employeeId: entity.employeeId,
      start_date: start_date,
      end_date: end_date,
      start_time: entity.start_time,
      end_time: entity.end_time
    }
    console.log(entity)
  return await axios.post(`${baseUrl}/${mainEntity}`, auxEntity)
}

 //Llama a la API de update de empleados
export const updateMain=async(entity)=> {
  let start_date;
    let end_date;

    if(entity.start_date === null){
      start_date = null;
    }
    else{
      if(entity.start_date.$d !== undefined)
      entity.start_date = entity.start_date.$d;
      start_date = moment(entity.start_date).format('YYYY-MM-DD');
    }
    
    if(entity.end_date === null){

      end_date = null;
    }
    else{
      if(entity.end_date.$d !== undefined)
      entity.end_date = entity.end_date.$d;
      end_date = moment(entity.end_date).format('YYYY-MM-DD');
    }

    const auxEntity = {
      projectId: entity.projectId,
      employeeId: entity.employeeId,
      start_date: start_date,
      end_date: end_date,
      start_time: entity.start_time,
      end_time: entity.end_time
    }
  return await axios.put(`${baseUrl}/${mainEntity}/${entity.id}`, auxEntity);
}

//Llama a la API de delete de empleados
export const deleteMain=async(entity)=> {
  return await axios.delete(`${baseUrl}/${mainEntity}/${entity.id}`)
} 

//Consigue datos de Clients
export const getClients=async()=> {
  return await axios.get(`${baseUrl}/client`)
  .then(res => res.data);
}

//Consigue datos de Empleados
export const getEmployees=async()=> {
  return await axios.get(`${baseUrl}/employee`)
  .then(res => res.data);
}

//Consigue datos de Empleados
export const getProject=async()=> {
  return await axios.get(`${baseUrl}/project`)
  .then(res => res.data);
}
