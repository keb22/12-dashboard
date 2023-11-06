import React  from "react";
import { Alert } from "reactstrap";
function Error ({error}){
  
  
  return(
    <Alert className="mt-2"  color="danger">
      <p className="p-1">{error}</p>
    </Alert>
  )
}

export default Error;