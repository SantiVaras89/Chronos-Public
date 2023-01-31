import axios from 'axios';
import { baseUrl } from '../../../App';


export const getData=async()=> {
  return await axios.get(`${baseUrl}/dashboard`)
  .then(res => res.data);
}