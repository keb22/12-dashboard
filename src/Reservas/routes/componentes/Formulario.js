import React from 'react';
import {CgCloseO} from 'react-icons/cg';
import {BsFillBuildingFill} from 'react-icons/bs';
import {BiUserCircle,BiArrowBack} from 'react-icons/bi';
import '../estilos-de-componente/Formulario.css';
import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';


const Formulario = ( props ) => {

  //Variables que almacenan los datos del formulario

  const [formdatos, setFormdatos] = useState({
    id:"",
    nit:null,
    nombre:"",
    correo:"",
    telefono:"",
    cantidad:"",
    fecha:"",
    total:"",
  }) ;


  //Función que ante cualquier cambio de letra actualiza su valor  
  const{nit , nombre , correo , telefono , cantidad , fecha} = formdatos;
  
  const cambioValor = (e) =>{
    setFormdatos({
      ...formdatos,
      [e.target.name] : e.target.value,
    });
  }

  const cambioCantidad = (e) =>{
    setFormdatos({
      ...formdatos,
      total:e.target.value*10000,
      cantidad:e.target.value,
    })
  }

  const reiniciarDatos =() =>{
     //Limpiando el formulario
     setFormdatos({
      nit:"",
     nombre:"",
     correo:"",
     telefono:"",
     cantidad:"",
     fecha:"",
     total:"",

    })
  }

  
  //Enviar datos a la bd
  const enviardatos = async ( e ) => {

    //Quita los efectos prederteminados de un formulario
    e.preventDefault();
    handleSalir();
    try {
      const response = await axios.post(
        'https://museoprehistorico.com/src/back-end/Data.php',
        formdatos
      );
      const data =  await response.data;
      if(data.error){
         
        Swal.fire({
          title:'Error',
          icon:'error',
          text:data.error,
          timer:5000,
          
        }).then(setVisible("1"))
        
      }else{
        handleSalir();
        reiniciarDatos();
        Swal.fire({
          title:"Reserva Existosa",
          text:"Revise su correo para ver los detalles de su reserva",
          timer:5000,
          icon:'success',
        })
      }
    } catch (error) {
      
      Swal.fire({
        title:"Error",
        text:"Lo sentimos. Ha ocurrido un error inesperado. Intenta más tarde",
        icon:'error',
      })
    }
    
   
    
  }

  //Constantes para evaluar el estado del formulario Principal
  const visible = props.visible;
  const setVisible = props.onclickVisi;

  //Constantes para evaluar el estado del formulario Empresa
  const formemp = props.formemp;
  const setFormemp = props.onclickemp;

  //Constantes para evaluar el estado del formulario Cliente
  const formcli = props.formcli;
  const setFormcli = props.onclickcli;

  
  //Funcion que cambia el estado del formulario Principal
  function handleSalir(){
    setVisible('');
  }

  //Funcion que retrocede el camino en el formulario

  function handleVolver(){
    if(formcli){
      handleClickCliente();
    }else if(formemp){
      handleClickEmpresa();
    }
  }

  //Funcion que cambia el estado del formulario Empresa
  function handleClickEmpresa(){
    var nuevoValor = formemp? '': '1'
    setFormemp(nuevoValor);
  }

  //Funcion que cambia el estado del formulario Cliente
  function handleClickCliente(){
    var nuevoValor = formcli? '': '1'
    setFormcli(nuevoValor);
  }

  //Para establecer una ruta se cumple este orden:
  //1.Paso 1 Formulario Rol
  //2.Paso 2 Formulario Cliente o Empresa reserva
  //3.Paso 3 Envio exitoso

  //El Paso 2 y 3 se ejecutan en el contenedor dinámico 
  return(
    <div className={visible? 'formulario-contenedor' :'formulario-contenedor oculto'}>
      <div className='contenedor-head'>
        <div className={formemp || formcli? 'contenedor-volver':'contenedor-volver oculto'}>
          <BiArrowBack className='icono-back' onClick={handleVolver} />
        </div>
        <div className='contenedor-salir' >
          <CgCloseO className='icono-close' onClick={handleSalir}  />
        </div>
      </div>
      <div className='contenedor-dinamico activo'>
        <div className={props.formemp || props.formcli ?'contenedor-paso1 oculto' :'contenedor-paso1'}>
         <div className='contenedor-rol' onClick={handleClickEmpresa}>
           <BsFillBuildingFill alt='rol-empresa'/>
           <p>Empresa</p>
         </div>
         <div className='contenedor-rol' onClick={handleClickCliente} >
           <BiUserCircle alt='rol-cliente'/>
           <p>Turista</p>
         </div>
        </div>
        <div className={formemp?'contenedor-paso2':'contenedor-paso2 oculto'}>
         <form className='formulario' onSubmit={enviardatos}>
         <div className='header-form'>
           <h2>Formulario Empresa</h2>
           <p>Ingrese la información correspondiente</p>
          </div>
          <div className='row'>
           <div className='input-item'>
             <label>NIT</label>
             <input name='nit' type='int' value={nit} onChange={cambioValor} />
           </div>
           <div className='input-item'>
             <label>Teléfono</label>
             <input name='telefono' type='tel' value={telefono} onChange={cambioValor} />
           </div>
          </div>
          <div className='row'>
           <div className='input-item'>
             <label>Nombre</label>
             <input name='nombre'  type='text' value={nombre} onChange={cambioValor} />
           </div>
           <div className='input-item'>
             <label>Correo</label>
             <input name='correo'  type='e-mail' value={correo} onChange={cambioValor}/>
           </div>

          </div>  
          <div className='row'>
           <div className='input-item'>
             <label>Cantidad</label>
             <input name='cantidad'  type='number' value={cantidad} onChange={cambioCantidad} />
           </div>
           <div className='input-item'>
             <label>Fecha</label>
             <input name='fecha'  type='date' value={fecha} onChange={cambioValor} />
           </div>
          
          </div>
          <div className='contenedor-enviar'>
            <button className='boton-reserva'>Enviar</button>
          </div>
         </form>
        </div>
        <div className={formcli?'contenedor-paso2':'contenedor-paso2 oculto'}>
         <form className='formulario' onSubmit={enviardatos}  >
          <div className='header-form'>
           <h2>Formulario Turista</h2>
           <p>Ingrese la información correspondiente</p>
          </div>
          <div className='row'>
           <div className='input-item'>
             <label>Nombre</label>
             <input name='nombre'  type='text' value={nombre} onChange={cambioValor} />
           </div>
           <div className='input-item'>
             <label>Teléfono</label>
             <input name='telefono'  type='tel' value={telefono} onChange={cambioValor} />
           </div>
          </div>
          <div className='row'>
           <div className='input-item2'>
             <label>Correo</label>
             <input name='correo'  type='e-mail' value={correo} onChange={cambioValor}/>
           </div>

          </div>  
          <div className='row'>
           <div className='input-item'>
             <label>Cantidad</label>
             <input name='cantidad' type='number' value={cantidad} onChange={cambioCantidad} />
           </div>
           <div className='input-item'>
             <label>Fecha</label>
             <input name='fecha'  type='date' value={fecha} onChange={cambioValor}/>
           </div>
          </div>
         
          <div className='contenedor-enviar'>
            <button className='boton-reserva'>Enviar</button>
          </div>
         </form>
        </div>
      </div>
    </div>
  );
}

export default Formulario;