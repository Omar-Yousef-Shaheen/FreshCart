import { Navigate } from "react-router-dom"


export default function ProtectedRoute({children}) {

  if (localStorage.getItem("TokenUser") == null) {


    return <Navigate to="/login"/>
  }


  return<>
  
  {children}
  
  
  </>
}
