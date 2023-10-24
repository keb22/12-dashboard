import React, { useState } from "react";
import { useEffect } from "react";
import { Row, Col, Card, CardBody, Button } from "reactstrap";

const Nosotros = ({datosImg}) => {

  const [imagenVision, setImagenVision] = useState({});
  const [imagenMision, setImagenMision] = useState({});
  
  useEffect(() => {
    const imagenesTipo3 = datosImg.filter(imagen => imagen.tipoImagen === '3');
    const imagenesTipo4 = datosImg.filter(imagen => imagen.tipoImagen === '4');
    setImagenMision(imagenesTipo3[0] || {});
    setImagenVision(imagenesTipo4[0] || {});
  
  }, [datosImg]);


  const estilos={
    height:'200px',
    width:'100%',
    fitObject:'contain',

  }
  return (
    <div className="p-3 mt-3">
      <h4 className="text-start text-light">Nosotros</h4>
      <Row>
        <Col sm="6">
          <Card outline>
            <CardBody>
              <img 
              src={`http://localhost/12-Dashboard/src/back-end/Fotos/img/${imagenMision?.nomImagen}`} 
              alt="mision"
              style={estilos} />
              <h5 className="mt-2">Mision</h5>
              <p>
               {imagenMision.descripcionImagen}
              </p>
              
            </CardBody>
          </Card>
        </Col>
        <Col sm="6">
          <Card outline>
           <CardBody>
            <img 
            src={`http://localhost/12-Dashboard/src/back-end/Fotos/img/${imagenVision?.nomImagen}`} 
            alt="vision"
            style={estilos} />
              <h5 className="mt-2">Vision</h5>
              <p>
               {imagenVision.descripcionImagen}
              </p>
              
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Nosotros;
