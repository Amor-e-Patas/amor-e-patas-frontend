import { useEffect, useContext } from "react"
import { AuthContext } from "../contexts/auth";

export default function VerifyAuth(){
  const {isAuthenticated} = useContext(AuthContext);

  useEffect(() => {
    if(!isAuthenticated){
      window.location.href = "/login";
    }
  }, [isAuthenticated]);

  return (
    <></>
  )
}