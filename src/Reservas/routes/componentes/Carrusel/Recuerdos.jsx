import React, { useState , useEffect, } from "react";
import axios from "axios";
import { Card, Carousel } from "react-bootstrap";



function Recuerdos (){
  const [datos , setDatos] = useState([]);
  const [imagenes , setImagenes] = useState([]);

  // Obtener imágenes de la base de datos al cargar la página
  function ObtenerFotos(){
   axios.get('http://localhost/12-Dashboard/src/back-end/Fotos/ObtenerFotos.php') // Cambiar la URL al lanzar al servidor
   .then(response => setDatos(response.data))
   .catch(error => console.error('Error fetching images:', error));
  }
  useEffect(() => {
    ObtenerFotos();
  }, []);
  
  useEffect(() => {
    const imagenesTipo1 = datos.filter(imagen => imagen.tipoImagen === '1');  
    setImagenes(imagenesTipo1); 
  }, [datos]);

  return(
     <Carousel className="mt-5 w-100 m-auto" >
      {imagenes.map((imagen,i)=>(
        <Carousel.Item interval={2000} key={i}>
          <Card color="secondary" className="p-2 bg-light rounded-3" style={{height:'70vh'}}>
          <img 
          src={`http://localhost/12-Dashboard/src/back-end/Fotos/img/${imagen.nomImagen}`} 
          alt={imagen.descripcionImagen}
          className="w-100 h-100"
          style={{
            height:'100%',
            width:'100%',
            objectFit:'fill',
          }
          }
          />
          <Carousel.Caption>
           
          </Carousel.Caption>
          </Card>
        </Carousel.Item>
      ))}
      </Carousel>
    );
  
}

export default Recuerdos;