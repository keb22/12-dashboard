import NavBar from "../componentes/Navbar";
import  './css/Reportes.css';
import React, {useState, useEffect} from "react";
import axios from "axios";
import SimpleChart from "../reportes/SimpleChart";
import AreaGrafica from "../reportes/AreaChart";
import BarraMovimientos from "../reportes/Reciente";
import { Row, Col } from "react-bootstrap";
import GraficaBar from "../reportes/GraficaBar";
import GraficaPie from "../reportes/GraficaPie";
import GraficaArea from "../reportes/GraficaArea";

const Reportes = () =>{

    //Data
    const [data, setData] = useState([]);
   
    //Función para obtener los datos
    const obtenerRegistro = async () => { 
      try {
        const response = await axios.get('http://localhost/12-Dashboard/src/back-end/Data.php');
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
        <h1 className="text-light shadow-sm">REPORTES</h1>
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
