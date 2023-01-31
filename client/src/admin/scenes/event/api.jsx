import axios from 'axios';
import { baseUrl } from '../../../App';
import { mainEntity } from '.';
import moment from 'moment/moment';
import { extraHourCalc } from '../event/Table';

//Llama a la API para conseguir datos de empleados
export const getMain=async()=> {
    return await axios.get(`${baseUrl}/${mainEntity}`)
    .then(res => res.data);
  }

//Llama a la API de creacion de empleados
export const addMain=async(entity)=> {
  

  let startPeriod = moment(entity.start_date).format('MM/YY');
  let endPeriod = moment(entity.end_date).format('MM/YY');
  let auxPeriod = '';
  let start_date;
  let end_date;
  let start_time;
  let end_time;
  
  //Salva Fecha Inicio
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
  
  //Salva Fecha Fin
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

  //Salva Tiempo Inicio
  if(entity.start_time === null){
    start_time = null
  }
  else{
    if(entity.start_time === undefined){
      start_time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    }
    else{
      entity.start_time = entity.start_time.$d
      start_time = moment(entity.start_time).format('YYYY-MM-DD HH:mm:ss')
    }
  }

  //Salva Tiempo Fin
  if(entity.end_time === null){
    end_time = null
  }
  else{
    if(entity.end_time === undefined){
      end_time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    }
    else{
      entity.end_time = entity.end_time.$d
      end_time = moment(entity.end_time).format('YYYY-MM-DD HH:mm:ss')
    }
  }

  startPeriod = moment(start_date).format('MM/YY');
  endPeriod = moment(end_date).format('MM/YY');

  if(startPeriod === endPeriod){
    auxPeriod = startPeriod
  }
  else{
    auxPeriod = startPeriod + '-' + endPeriod;
  }

  let extraTime = [0,0];
  extraTime[0] = "0.00";
  extraTime[1] = "0.00";

  let auxStartTime = moment(start_time);
  let auxEndTime = moment(end_time);
  let auxHours = Math.round(((moment(auxEndTime.diff(auxStartTime, 'minutes')))/60)*100)/100;
  if(entity.eventTypeId === 1){
    let response = await extraHourCalc(start_date,auxStartTime,auxHours);
    extraTime = await response;
  }
  const auxEntity = {
    eventTypeId: entity.eventTypeId,
    projectId: entity.projectId,
    employeeId: entity.employeeId,
    start_date: start_date,
    end_date: end_date,
    start_time: start_time,
    end_time: end_time,
    period: auxPeriod,
    hours: Math.round(auxHours),
    half_value: Math.round(extraTime[0]) ,
    full_value: Math.round(extraTime[1])
  }
  if(auxEntity.eventTypeId !== 1){
    auxEntity.half_value = null;
    auxEntity.full_value = null;
  }
  console.clear()
  console.log(auxEntity)

  return await axios.post(`${baseUrl}/${mainEntity}`, auxEntity)
}

 //Llama a la API de update de empleados
export const updateMain=async(entity, old, startUpdateFlag, endUpdateFlag )=> {
  let startPeriod = moment(entity.start_date).format('MM/YY');
  let endPeriod = moment(entity.end_date).format('MM/YY');
  let startDate;
  let endDate;
  let auxPeriod = '';
  let auxStartTime = null;
  let auxEndTime = null;
  let start_time;
  let end_time;
  
  //Salva Fecha Inicio
  if(entity.start_date === null){
    startDate = null;
  }
  else{
    if(entity.start_date.$d !== undefined)
    entity.start_date = entity.start_date.$d;
    startDate = moment(entity.start_date).format('YYYY-MM-DD');
  }

  //Salva Fecha Fin
  if(entity.end_date === null){
    endDate = null;
  }
  else{
    if(entity.end_date.$d !== undefined)
    entity.end_date = entity.end_date.$d;
    endDate = moment(entity.end_date).format('YYYY-MM-DD');
  }

  //Salva Tiempo Inicio
  if(entity.start_time === null){
    start_time = null
  }
  else{
    if(entity.start_time === undefined){
      start_time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    }
    else{
      entity.start_time = entity.start_time.$d
      start_time = moment(entity.start_time).format('YYYY-MM-DD HH:mm:ss')
    }
  }

  //Salva Tiempo Fin
  if(entity.end_time === null){
    end_time = null
  }
  else{
    if(entity.end_time === undefined){
      end_time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    }
    else{
      entity.end_time = entity.end_time.$d
      end_time = moment(entity.end_time).format('YYYY-MM-DD HH:mm:ss')
    }
  }

  startPeriod = moment(startDate).format('MM/YY');
  endPeriod = moment(endDate).format('MM/YY');

  if(startPeriod === endPeriod){
    auxPeriod = startPeriod
  }
  else{
    auxPeriod = startPeriod + '-' + endPeriod;
  }

  if(startUpdateFlag === "N"){
    auxStartTime = moment(old.start_time);
  }
  else{
    auxStartTime = moment(start_time);
  }

  if(endUpdateFlag === "N"){
    auxEndTime = moment(old.end_time);
  }
  else{
    auxEndTime = moment(end_time);
  }

  let extraTime = [0,0];
  extraTime[0] = "0.00";
  extraTime[1] = "0.00";

  let auxHours = Math.round(((moment(auxEndTime.diff(auxStartTime, 'minutes')))/60)*100)/100;
  if(entity.eventTypeId === 1){
    let response = await extraHourCalc(startDate,auxStartTime,auxHours);
    extraTime = await response;
  }

  const auxEntity = {
    eventTypeId: entity.eventTypeId,
    projectId: entity.projectId,
    employeeId: entity.employeeId,
    start_date: startDate,
    end_date: endDate,
    start_time: start_time,
    end_time: end_time,
    period: auxPeriod,
    hours: Math.round(auxHours),
    half_value: Math.round(extraTime[0]) ,
    full_value: Math.round(extraTime[1])
  }
  if(startUpdateFlag === "N"){
    delete auxEntity.start_time;
  }
  if(endUpdateFlag === "N"){
    delete auxEntity.end_time;
  }
  if(auxEntity.eventTypeId !== 1){
    auxEntity.half_value = null;
    auxEntity.full_value = null;
  }
  entity.start_date = startDate;
  entity.end_date = endDate;
  entity.period = auxPeriod;
  entity.hours = auxHours;
  entity.half_value =  extraTime[0];
  entity.full_value =  extraTime[1];

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
  return await axios.get(`${baseUrl}/event_type-active`)
  .then(res => res.data);
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

//Consigue datos de Proyectos
export const getProject=async()=> {
  return await axios.get(`${baseUrl}/project`)
  .then(res => res.data);
}

//Consigue datos de Asignaciones
export const getAssignment=async()=> {
  return await axios.get(`${baseUrl}/assignment`)
  .then(res => res.data);
}

export const getHoliday=async(date)=> {
  let response = await axios.get(`${baseUrl}/calendar-date/${date}`)
  .then(res => res.data)
  return response
}