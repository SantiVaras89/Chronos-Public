import axios from 'axios';
import { baseUrl } from '../../../App';
import { userId } from '../../../AdminApp';
  
export const checkPassword=async(user)=> {
    return await axios.post(`${baseUrl}/login`,user)
    .then(res => res.data);
}

 //Llama a la API de update de empleados
 export const changePassword=async(password)=> {
    const auxEntity = {
      password: password,
    }
    return await axios.put(`${baseUrl}/password/${userId}`, auxEntity);
  }