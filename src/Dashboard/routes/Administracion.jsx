import NavBar from "../componentes/Navbar";
import Tabla from "../tables/TableBasics";
import Carrusel from "../componentes/carrusel/Carrusel";
import '../../css/index2.css';
const Administracion= () =>{
  return(
    <div className='route'>
      <NavBar />
      <div className="page-content  ">
        <h1 className="text-light fw-bold fs-1 mb-3 shadow-sm">ADMINISTRAR</h1>
        <Tabla />
        <Carrusel />
      </div>
    </div>

  )
}

export default Administracion;
