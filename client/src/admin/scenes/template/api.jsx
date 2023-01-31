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
    first_name: entity.first_name,
    last_name: entity.last_name,
    email:  entity.email,
    dni:  entity.dni, 
  }
  return await axios.post(`${baseUrl}/${mainEntity}`, auxEntity)
}

 //Llama a la API de update de empleados
export const updateMain=async(entity)=> {
  const auxEntity = {
    first_name: entity.first_name,
    last_name: entity.last_name,
    email:  entity.email,
    dni:  entity.dni,
  }
  return await axios.put(`${baseUrl}/${mainEntity}/${entity.id}`, auxEntity);
}

//Llama a la API de delete de empleados
export const deleteMain=async(entity)=> {
  return await axios.delete(`${baseUrl}/${mainEntity}/${entity.id}`)
} 