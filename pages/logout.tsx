import { useEffect, useContext } from "react"
import { AuthContext } from "../contexts/auth";
import Cookies from 'js-cookie';


export default function Logout(){
  const {isAuthenticated} = useContext(AuthContext);

  function logOut(){
    Cookies.remove('user-token');
  }

  useEffect(() => {
    if(isAuthenticated){
      logOut();
    }
    window.location.href = "/";
  }, []);

  return (
    <>Logging out</>
  )
}