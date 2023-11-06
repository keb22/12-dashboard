import React from "react";

const Paginacion = ({ totalPaginas, PaginaActual, onCambioPagina }) => {
  const prevenir =(e , numeroPagina) =>{
    e.preventDefault();
    onCambioPagina(numeroPagina);
    console.log(PaginaActual);
  }
  return (
    <div>
      <ul className="w-100 p-2 d-flex flex-row">
        {[...Array(totalPaginas).keys()].map((numeroPagina) => (
          <li style={{listStyle:'none'}} key={numeroPagina+1}>
            <button
              className="btn btn-light mx-1"
              onClick={(e)=>prevenir(e, numeroPagina+1)}
              disabled={PaginaActual == numeroPagina+2}
            >
               {numeroPagina + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Paginacion;
