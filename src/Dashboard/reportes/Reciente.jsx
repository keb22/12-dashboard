import React from 'react';
import {BiSolidBusiness ,BiUser} from 'react-icons/bi';
import './Reciente.css';

function BarraMovimientos ({datos}){

	//Data
  const fechaActual= new Date();
  const datosFiltrados = datos.filter((item) => {
    const fechaItem = new Date(item.fecha);
    return fechaItem > fechaActual;
  });


  return(
		<div className="w-100 p-2 bg-light rounded-3">
		<h3 className='fs-3 fw-bold'>Reservas Recientes  </h3>
		 {datosFiltrados.map(registro =>(
			<div className='w-100 d-flex flex-row shadow-lg px-3 py-2 mt-3 rounded-2 cardcolor' key={registro.id}>
				<div className='w-20 p-1'>
					<div className='w-75 p-2 rounded-circle border-2 bg-light shadow-md'>{registro.nit? <BiSolidBusiness className='m-auto icon'/>: <BiUser className='m-auto icon'/>}</div>
          <p className='capitalize mt-2'>{registro.nombre.split(' ').slice(0, 2).join(' ')}</p>
			  </div>
        <div className=' row w-75 mx-2 bg-light  rounded-1 box-border '>
          <div className='col-sm-4 border-2 text-left d-flex flex-column p-3 fw-bold '><p className='underline'>Cantidad:</p><p className='fs-4 text-muted'>{registro.cantidad}</p></div> 
          <div className='col-sm-4 border-2 text-left d-flex-column p-3 fw-bold '><p  className='underline'>Ingresos:</p><p className='fs-4 text-muted'>{registro.total}</p></div> 
          <div className='col-sm-4 border-2 text-left d-flex flex-column p-3 fw-bold'><p className='underline'>Visita:</p><p className='fs-4 text-muted'>{registro.fecha}</p></div> 
        </div>
			</div>
		))}
		</div> 
	)
}

export default BarraMovimientos;