import Login from "./login";
import AdminApp from "./AdminApp";
import UserApp from "./UserApp";
import useToken from './useToken';



const hostName = process.env.REACT_APP_HOST_NAME || "ec2-3-136-245-79.us-east-2.compute.amazonaws.com:8082";
export const baseUrl = 'http://'+hostName;
//export const baseUrl = 'http://localhost:9001';
//export const baseUrl = 'http://ec2-3-136-245-79.us-east-2.compute.amazonaws.com:8082/api/';


function App() {
  const { token, setToken } = useToken();
  
  if(!token) {
    return <Login setToken={setToken} />
  }
  else{
    const userToken = JSON.parse(localStorage.getItem('token'));
    const role = userToken.role_id;
    
    if(role === 1){
      return(
        <AdminApp/>
      )
    }
    else{
      return (
        <UserApp/>
      );
    }

  }

  
}

export default App;
