import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { authenContext } from "../../Context/AuthenContext"


export default function ProtectedSafe({children}) {

  const {token} = useContext(authenContext);

  
  if (token != null ) {
    

    return <Navigate to="/Products" />
  }

  return <>
  
  {children}
  
  </>
}
