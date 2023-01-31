import axios from 'axios';
import { baseUrl } from '../../../App';


export const getData=async(employeeId)=> {
  return await axios.get(`${baseUrl}/dashboard-user/${employeeId}`)
  .then(res => res.data);
}