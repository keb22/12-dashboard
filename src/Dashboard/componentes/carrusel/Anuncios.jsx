import React, { useState, useEffect } from "react";
import Slider from "react-slick";

import { Button, Card, CardBody, CardText } from "reactstrap";

const Anuncios = ({ datosImg , handleBorrar , handleEditar }) => {
  const imagenesTipo2 = datosImg.filter(imagen => imagen.tipoImagen === '2');
  return (
  <div className="w-100 mt-3 p-3">
    <h4 className="text-start text-light">Anuncios</h4>
    <Slider
      dots={true}
      arrows={true}
      speed={500}
      infinite={true}
      slidesToShow={1}
      slidesToScroll={1}
      autoplay={true}
      autoplaySpeed={2500}
    >
      {imagenesTipo2.map((imagen, i) => (
        <Card className="w-100 " key={i}>        
          <img src={`https://museoprehistorico.com/src/back-end/Fotos/img/${imagen.nomImagen}`} 
          alt={imagen.descripcion} 
          style={{height: '200px', width:'100%'}} />
          <CardBody >
            <CardText>
              {imagen.descripcionImagen}
            </CardText>
           
            <Button className="w-100" outline color="danger" onClick={() => handleBorrar(imagen)}>Eliminar</Button>
          </CardBody>
        </Card> 
      ))}
    </Slider>
  </div>
  );
};

export default Anuncios;
