import Calendario from "../componentes/calendario/Calendario";
import NavBar from "../componentes/Navbar";
import React from "react";
function Novedades () {
  return(

    <div className='route'>
      <NavBar />
      <div className="page-content">
      <h1 className="text-light shadow-sm mb-5">NOVEDADES</h1>
        <Calendario/>
      </div>
    </div>

  )
}

export default Novedades;
