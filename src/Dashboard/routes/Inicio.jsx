import NavBar from "../componentes/Navbar";
import Anuncios from "../componentes/carrusel/Anuncios";
import { useState , useEffect } from "react";
import axios from "axios";
import BarraMovimientos from "../reportes/Reciente";
import '../../css/index2.css';
const Inicio = () =>{
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

  return(
    <div className='route'>
      <NavBar />
      <div className="page-content">
      <h1 className="text-light fw-bold fs-1 mb-3 shadow-sm ">INICIO</h1>
      <div className="bg-light rounded-2 p-2 ">
      <BarraMovimientos datos={data} />
      </div>
      <Anuncios datosImg={imagenes} handleBorrar={handleBorrar} handleEditar={handleEditar}/>
      </div>
    </div>

  )
}

export default Inicio;
