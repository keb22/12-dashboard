
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from "axios";
import FormularioCal from "./Formulario";



//Componente general Calendario con todos los eventos
function Calendario (datos){
  const [data, setData] = useState({
    title:'',
    date:'',
    
  })
  //Estado del Formulario Modal
  const [active, setActive] = useState(false);

  //Datos del Formulario Editar
  const[ dataForm, setDataForm] = useState({})
  
  
  //Lamado de los Eventos 
  const obtenerRegistro = async () => {
  
    try {
      const response = await axios.get('https://museoprehistorico.com/src/back-end/Data.php');
      const records = response.data;
      setData(records.map(objeto=>({
        id:objeto.id,
        title:objeto.nombre,
        date:objeto.fecha,
        nit:objeto.nit,
        nombre:objeto.nombre,
        telefono:objeto.telefono,
        correo:objeto.correo,
        total:objeto.total,
        cantidad:objeto.cantidad,
        fecha:objeto.fecha,
      })) );
    } catch (error) {
      console.error(error);
    }
  };

  //Manejo de un Click sobre un evento en el Calendario
  const handleClick = ( datos , id) => {
    setActive(true);
    setDataForm({
      ...datos,
      id:id,
    }) 
   }

  //Contenido de un evento en el calendario
  const handleContent = ( datos ) => {
    return(
      <div className="px-1 py-2 overflow-x-hidden">
        <h6 className="fs-6 fw-bold">{datos.nombre}</h6>
        <p className="fw-bold text-danger bg-light  rounded-circle text-center w-10">{datos.cantidad}</p>
      </div>
    );
  }


  useEffect(() => {
    obtenerRegistro();
  }, []);
  
  
  return(
    <div className="px-3 py-2 bg-light w-100 h-100 rounded-3  shadow-md">
       <FullCalendar 
        plugins={[ dayGridPlugin , interactionPlugin ]}
     
        buttonText={{
          today:'hoy',
          month:'mes',
          week: 'semana',
          day:  'dia',
          list: 'lista'
        }}
        events={data}
        eventContent={(event) =>handleContent(event.event.extendedProps)}
        eventClick={(event)=>handleClick(event.event.extendedProps , event.event.id)}
        headerToolbar={{
          start:"dayGridMonth dayGridDay dayGridWeek",
          center:"title",
          end:"today prev,next"
        }}
        height={"100%"}
        locale={'es'}
    
      />
      <FormularioCal active={active} setActive={setActive} datos={dataForm} obtenerRegistro={obtenerRegistro} />
    </div>
  )
}


export default Calendario