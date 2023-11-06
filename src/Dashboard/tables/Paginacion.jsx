import React from "react";

const Paginacion = ({ totalPaginas, PaginaActual, onCambioPagina }) => {
  return (
    <div>
      <h1>Paginacion</h1>
      <ul className="w-100 p-2 d-flex flex-row">
        {[...Array(totalPaginas).keys()].map((numeroPagina) => (
          <li style={{listStyle:'none'}} key={numeroPagina}>
            <button
              className="btn btn-light mx-1"
              onClick={() => onCambioPagina(numeroPagina)}
              disabled={PaginaActual === numeroPagina}
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
