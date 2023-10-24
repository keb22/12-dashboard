import NavBar from "../componentes/Navbar";
import Tabla from "../tables/TableBasics";
import Carrusel from "../componentes/carrusel/Carrusel";
const Administracion= () =>{
  return(
    <div className='route'>
      <NavBar />
      <div className="page-content  ">
        <h1 className="text-light shadow-sm mb-5">ADMINISTRAR</h1>
        <Tabla />
        <Carrusel />
      </div>
    </div>

  )
}

export default Administracion;
