import Calendario from "../componentes/calendario/Calendario";
import NavBar from "../componentes/Navbar";
import React from "react";
import '../../css/index2.css';
function Novedades () {
  return(

    <div className='route'>
      <NavBar />
      <div className="page-content">
      <h1 className="text-light shadow-sm fw-bold fs-1 mb-3">NOVEDADES</h1>
        <Calendario/>
      </div>
    </div>

  )
}

export default Novedades;
