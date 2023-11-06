import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Formulario from './FormularioFotos';
import Carousel from './Slider';
import Anuncios from './Anuncios';
import Nosotros from './Nosotros';

function Carrusel() {
  const [imagenes, setImagenes] = useState([]);
  
  // Obtener imágenes de la base de datos al cargar la página
  function ObtenerFotos(){
    axios.get('http://localhost/12-Dashboard/src/back-end/Fotos/ObtenerFotos.php') // Cambiar la URL al lanzar al servidor
    .then(response => setImagenes(response.data))
    .catch(error => console.error('Error fetching images:', error));
  }

  //Editar Foto
  const handleEditar = (imagen) => {
    const url= `http://localhost/12-Dashboard/src/back-end/Fotos/EliminarFoto.php?id=${imagen.idImagen}`;//URL del archivo que elimina las fotos
    axios.post(url)
    .then(response => {console.log(response.data.message);
      ObtenerFotos();
    })
    .catch(error => console.error('Error subiendo imagen:', error));
  };

  //Borrar Foto
  const handleBorrar = async (imagen) =>{
    try {
      const response = await axios.delete(
      `http://localhost/12-Dashboard/src/back-end/Fotos/EliminarFoto.php?id=${imagen.idImagen}`
      );
      console.log(response.data);
      await ObtenerFotos();
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
    }

  }

  useEffect(() => {
    ObtenerFotos();
  }, []);


  return (
    <div className='w-100'>
      <h1 className='text-light mt-4 text-center'>Galleria</h1>
      <Formulario className="w-100" obtenerFoto={ObtenerFotos} handleBorrar={handleBorrar} handleEditar={handleEditar} />
      <Carousel datosImg={imagenes} handleBorrar={handleBorrar} handleEditar={handleEditar} />
      <Anuncios datosImg={imagenes} handleBorrar={handleBorrar} handleEditar={handleEditar}/>
      <Nosotros datosImg={imagenes} handleBorrar={handleBorrar} handleEditar={handleEditar}/>
     
    </div>
  );
}


export default Carrusel;