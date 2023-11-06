import NavBar from "../componentes/Navbar";
import  './css/Reportes.css';
import React, {useState, useEffect} from "react";
import axios from "axios";

import BarraMovimientos from "../reportes/Reciente";
import { Row, Col } from "react-bootstrap";
import GraficaBar from "../reportes/GraficaBar";

//Herremientas para obtener los datos de la sesión
import { AuthContext } from '../context/Context';
import { useContext } from "react";
import '../../css/index2.css';
import GraficaArea from "../reportes/GraficaArea";
const Reportes = () =>{
  const {userData} = useContext(AuthContext);

    //Data
    const [data, setData] = useState([]);
   
    //Función para obtener los datos
    const obtenerRegistro = async () => { 
      try {
        const response = await axios.get('https://museoprehistorico.com/src/back-end/Data.php');
        const records = response.data;
        console.log(records);
        setData(records);
      } catch (error) {
        console.error(error);
      }
    };
    
    useEffect(() => {
      obtenerRegistro();
    }, []); 

  return(
    <div className="route">
      <NavBar />
      <div className="page-content">
        <h1 className="text-light fw-bold fs-1 mb-3 shadow-sm">REPORTES</h1>
        <Row className=" w-100">
          <Col sm={6}>
            <GraficaArea/>
            <GraficaBar />
          </Col>
          <Col sm={6}>
            <BarraMovimientos datos={data} />
          </Col>
        </Row>
        <Row className="mt-3 w-100">
          <Col sm={6}>
          </Col>
          <Col sm={6}>
          
          </Col>
        </Row>
        </div>
 
        </div>
  )
}

export default Reportes;
