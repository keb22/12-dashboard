import React , { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/Context";
import Logo  from '../../img/Logo-Letra.png';
import Swal from "sweetalert2";
import {FaUserAlt} from 'react-icons/fa';
import {HiMail} from 'react-icons/hi';
import {BsShieldLockFill} from 'react-icons/bs';
import {MdVisibility , MdVisibilityOff} from 'react-icons/md';
import Error from "./Error";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "reactstrap";
 
function LogIn (){

  //Contexto
  const { login } = useContext(AuthContext);
  const [preSession, setpreSession] = useState({
    usuario:'',
    password:'',
    estado:null,
  });

  //Manejo de cambios del Formulario
  const handleChange =(e)=>{
    setpreSession({
      ...preSession,
      [e.target.name]:e.target.value,
    })
  }


  //Errores
  const [error , setError] = useState('');

  //Visibilidad de la contraseña
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const manejoVisibilidad = () => {
    setMostrarPassword(!mostrarPassword);
  };

  //Confirmacion de Entrada
  const manejoFormulario =( titulo, icon , error) =>{
    if(error){
      setError(error);
    }else{
      Swal.fire({
        title: titulo,
        icon: icon,
        timer:2000,
      }
      )
    }    
  }

  const navigate= useNavigate();

  //Manejo del evento para enviar la información al servidor
  const handleClick = async ( e )=>{
    e.preventDefault();

    //Manejo del formulario y validación de usuario
    const url='https://museoprehistorico.com/src/back-end/ValidarUsuario.php';//Cambiar direccion de la url 
    try {
      const response = await axios.post(url,preSession); 
      const respuesta = response.data;
      if (respuesta.success) {
        //Mensaje Exitoso
        console.log('Mensaje:', respuesta.message);
        manejoFormulario('Bienvenido', 'success');
        //Activa la Sesión
        login(preSession);
        navigate("/Dashboard/Inicio");
       
      } else {

        //Mensaje de Error
        console.log('Error:', respuesta.message);
        setError(respuesta.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  
  return(
      <Row className="h-100 w-100 ">
        <Col md={6} className="h-100">
          <div className=" fondo-wavy p-3 h-100 text-center " style={{minHeight:'100vh'}}>
           <img className="shadow-lg mt-6 p-2 rounded-4" alt="logo" src={Logo} style={{height:'100%',width:'100%'}} />
          </div>
        </Col>
        <Col md={6} className="h-100">
          <div className=" p-3 h-100  d-flex justify-content-center align-items-center">
          <form className=" p-2 border-2  rounded-3 w-75 ">
          <div className=" m-auto  w-20 d-flex justify-content-center  mt-2 ">
            <FaUserAlt className=" p-2 w-75 h-50 rounded-circle border border-dark icon " />
          </div>
          <div className=" d-flex flex-column mt-2 ">
            <label  className="d-flex fw-semibold mb-2"><HiMail className="mx-2 icon"/>Usuario</label>
            <input name="usuario"
             type="text" className="p-2 rounded-2"
             placeholder="Email" 
             value={preSession.usuario} 
             onChange={handleChange}
             autoComplete="off" />
          </div>
          <div className=" d-flex flex-column mt-3 position-relative">
            <label className="d-flex fw-semibold mb-2"><BsShieldLockFill className="mx-2 icon"/>Contraseña</label>
            <div style={{position:'absolute',right:'10px',bottom:'4px'}} className=" w-10  cursor-pointer" onClick={manejoVisibilidad}>
              {mostrarPassword?<MdVisibilityOff className="icon"/>: <MdVisibility className="icon"/> }
            </div>
            <input name="password" 
            type={mostrarPassword?"text":"password"} 
            className="p-2 rounded-2" value={preSession.password} 
            placeholder="XXXX" 
            onChange={handleChange} 
            autoComplete="off" />

          </div>
          {error?
          <Error error={error} />
          :''}
          <div className=" mt-3 d-flex flex-column justify-content-center ">
            <input type="submit"
             value="Ingresar" 
             onClick={handleClick}  
             className="btn btn-outline-info fw-semibold p-2" />
          </div>
        </form>
         
          </div>

        </Col>
        
      </Row>
  )
}

export default LogIn;