import axios from 'axios';
import { baseUrl } from '../../../App';
import { mainEntity } from '.';

//Crea una nueva contraseña cuando se da de alta un usuario
function newPassword() {
  let randomstring = '';
  randomstring = Math.random().toString(36).slice(-8);
  return randomstring;
}

//Llama a la API para conseguir datos de empleados
export const getMain=async()=> {
    return await axios.get(`${baseUrl}/${mainEntity}`)
    .then(res => res.data);
  }

//Llama a la API de creacion de empleados
export const addMain=async(entity)=> {
  const auxEntity = {
    login_name: entity.login_name,
    password: newPassword(),
    status: '1',
    employeeId: entity.employeeId,
    roleId: entity.roleId
  }
  return await axios.post(`${baseUrl}/${mainEntity}`, auxEntity)
}

 //Llama a la API de update de empleados
export const updateMain=async(entity)=> {
  const auxEntity = {
    login_name: entity.login_name,
    roleId: entity.roleId,
    status: entity.status,
  }
  return await axios.put(`${baseUrl}/${mainEntity}/${entity.id}`, auxEntity);
}

//Llama a la API de delete de empleados
export const deleteMain=async(entity)=> {
  return await axios.delete(`${baseUrl}/${mainEntity}/${entity.id}`)
} 

//Consigue los empleados que no tienen usuario creado
export const getEmployeesNoUser=async()=> {
    return await axios.get(`${baseUrl}/employee-nouser`)
    .then(res => res.data);
  }

//Consigue todos los empleados
export const getEmployees=async()=> {
    return await axios.get(`${baseUrl}/employee`)
    .then(res => res.data);
  }

//Consigue datos de roles para usuarios
export const getRoles=async()=> {
    return await axios.get(`${baseUrl}/role`)
    .then(res => res.data);
  }