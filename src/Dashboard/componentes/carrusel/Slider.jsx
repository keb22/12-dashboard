import React, { useState , useEffect } from "react";
import { Card, Button , CardBody, CardTitle , CardText } from "reactstrap";
import Slider from "react-slick";

const Carousel = ({datosImg, handleBorrar, handleEditar}) => {
  const [imagenes, setImagenes] = useState([]);
  
  useEffect(() => {
    const imagenesTipo1 = datosImg.filter(imagen => imagen.tipoImagen === '1');  
    setImagenes(imagenesTipo1);

  }, [datosImg]);

  return (
    <div className="w-100 mt-3 p-3">
      <h4 className="text-start text-light">Carrusel</h4>
      <Slider
        slidesToShow={3}
        slidesToScroll={1}
        arrows={true}
        dots={true}
        responsive={[
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ]}
      >
      {imagenes.map((imagen) => (
        <Card  key={imagen.idImagen} style={{height:'600px', width:'300px'}}>
          <img src={`https://museoprehistorico.com/src/back-end/Fotos/img/${imagen.nomImagen}`} 
           style={{
            height:'80%',
            width:'100%',
            objectFit:'fill',
          }
          }
          alt={imagen.nomImagen}  />
          <CardBody style={{height:'20%', width:'100%'}}>
            <CardTitle tag="h6" >
              {imagen.nomImagen}
            </CardTitle>
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

export default Carousel;
