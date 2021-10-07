import { useEffect, useContext } from "react"
import { AuthContext } from "../contexts/auth";

export default function VerifyAdm(){
  const {isAdm} = useContext(AuthContext);

  useEffect(() => {
    if(!isAdm){
      window.location.href = "/";
    }
  }, [isAdm]);

  return (
    <></>
  )
}