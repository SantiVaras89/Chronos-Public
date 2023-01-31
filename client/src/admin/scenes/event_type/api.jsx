import axios from 'axios';
import { baseUrl } from '../../../App';
import { mainEntity } from '.';

//Llama a la API para conseguir datos de empleados
export const getMain=async()=> {
    return await axios.get(`${baseUrl}/${mainEntity}`)
    .then(res => res.data);
  }

//Llama a la API de creacion de empleados
export const addMain=async(entity)=> {
  const auxEntity = {
    name: entity.name,
    status: entity.status
  }
  return await axios.post(`${baseUrl}/${mainEntity}`, auxEntity)
}

 //Llama a la API de update de empleados
export const updateMain=async(entity)=> {
  const auxEntity = {
    name: entity.name,
    status: entity.status
  }
  return await axios.put(`${baseUrl}/${mainEntity}/${entity.id}`, auxEntity);
}

//Llama a la API de delete de empleados
export const deleteMain=async(entity)=> {
  return await axios.delete(`${baseUrl}/${mainEntity}/${entity.id}`)
} 

//Consigue datos de Eventos
export const getEventTypes=async()=> {
  return await axios.get(`${baseUrl}/event_type`)
  .then(res => res.data);
}

//Consigue datos de Eventos
export const getEventTypesActive=async()=> {
  return await axios.get(`${baseUrl}/event_type/active`)
  .then(res => res.data);
}

//Consigue datos de Clients
export const getClients=async()=> {
  return await axios.get(`${baseUrl}/client/names`)
  .then(res => res.data);
}

//Consigue datos de Empleados
export const getEmployees=async()=> {
  return await axios.get(`${baseUrl}/employee/names`)
  .then(res => res.data);
}

//Consigue datos de Proyectos
export const getProject=async()=> {
  return await axios.get(`${baseUrl}/project/names`)
  .then(res => res.data);
}

//Consigue datos de Asignaciones
export const getAssignment=async()=> {
  return await axios.get(`${baseUrl}/assignment`)
  .then(res => res.data);
}