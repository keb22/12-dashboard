import React, { useState , useEffect, } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";



function Anuncios (){
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
    const imagenesTipo2 = datos.filter(imagen => imagen.tipoImagen === '2');  
    setImagenes(imagenesTipo2); 
  }, [datos]);

  return(
     <Carousel controls={false}>
      {imagenes.map((imagen,i)=>(
        <Carousel.Item className="" interval={2000} key={i}>
          <img 
          src={`http://localhost/12-Dashboard/src/back-end/Fotos/img/${imagen.nomImagen}`} 
          alt={imagen.descripcionImagen}
          style={{
            height:'25vh',
            width:'100%',
            objectFit:'fill'
          }
          }
           />
          <Carousel.Caption>
            <p >{imagen.descripcionImagen}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
      </Carousel>
    );
  
}

export default Anuncios;