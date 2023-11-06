import { Col, Row } from "reactstrap";
import  Logo  from '../img/Logo-Letra.png';
import LogoCompleto from '../img/Logo-Huila-Park2023.png';
import { Link } from "react-router-dom";
function InicioSelect(){
  return(
    <div className="w-100 fondo-wavy" style={{height:'100vh'}}>
     <Row className="h-100 w-100 m-0">
       <Col className=" h-100  d-flex flex-column align-items-center p-3" md={7}>
         <h1 className="fw-bold" >Página principal</h1>
         <Link to="/Reservas" className="w-100 d-flex justify-content-center">
         <img
         className="shadow naranja rounded-2 p-2 mt-2 "
         src={LogoCompleto}
         alt="Logo"
         style={{height:'400px',width:'100%'}}
         />
         </Link>
       </Col>
       <Col md={5} className="h-100  d-flex flex-column align-items-center p-3">
         <h1 className="fw-bold">Panel de control</h1>
         <Link to="/Dashboard" className="w-100 d-flex justify-content-center">
         <img
         className="escala shadow p-2 mt-2 naranja rounded-2"
         src={Logo}
         alt="Logo"
         style={{height:'400px',width:'100%'}}
         />
         </Link>
       </Col>
     </Row>
   </div>
  )
}

export default InicioSelect