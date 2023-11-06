import './css/Navbar.css';
import { useEffect, useState , useContext} from 'react';
import {Link, useNavigate } from 'react-router-dom';

//Iconos 
import {FiSettings} from 'react-icons/fi';
import {BsClipboard2DataFill} from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import {FaUserAlt, FaUserEdit} from 'react-icons/fa';
import {AiTwotoneCalendar, AiOutlineHome} from 'react-icons/ai';
import Logo from '../img/Logo-Letra.png';

//Herremientas para obtener los datos de la sesión
import { AuthContext } from '../context/Context';
import { Tooltip } from 'react-tooltip';

const NavBar = () =>{
  const [anchoDispositivo, setAncho] = useState(window.innerWidth);

  const {logout} = useContext(AuthContext);
  const {userData} = useContext(AuthContext);


  useEffect(() => {
    // Función para actualizar el ancho y la altura del dispositivo cuando cambia el tamaño de la ventana
    const updateDeviceDimensions = () => {
      setAncho(window.innerWidth);
    };

    // Agregar un event listener para detectar cambios en el tamaño de la ventana
    window.addEventListener('resize', updateDeviceDimensions);

    // Limpiar el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('resize', updateDeviceDimensions);
    };
  }, []);

  // Estilos responsive
  const stylebar=anchoDispositivo<800?{
    width:'100px',
  }:
  {
    width:'20vw',
  };
  //Arreglo Items Navbar
  const ItemsNav=[
    {
      route:'/Dashboard/Inicio',
      name:'Inicio',
      icon: <AiOutlineHome className='icon' />,

    },
    {
      route:'/Dashboard/Reportes',
      name:'Reportes',
      icon: <BsClipboard2DataFill className='icon' /> ,
    },
    {
      route:'/Dashboard/Administracion',
      name:'Administrar',
      icon:<FaUserEdit className='icon' />,
    },
    {
      route:'/Dashboard/Novedades',
      name:'Novedades',
      icon:<AiTwotoneCalendar className='icon' /> ,
    },
    /*{
      route:'/Dashboard/Configuracion',
      name:'Configuración',
      icon:<FiSettings className='icon' /> ,
    },*/
   
  ];

  //Desloguear
    //Navegador
  const navigate= useNavigate();
  const handleSalir =()=>{
    navigate("/Dashboard/");
    logout();
  }

  return(
    <div className='h-100 navbar bg-light rounded-2 shadow-sm d-flex flex-column p-3 gap-0' style={stylebar}>      
      <div className='head'>
      
        <a href='/'>
       <div className='con-logo w-100 d-flex justify-content-center rounded-circle'>
         <img 
         className='logo'
         src={Logo} 
         alt='Museo Prehistorico Logo' />
       </div>
        </a>
      </div>
      <div className='h-50 w-100 rounded '>
        <ul className='lista'>
        {ItemsNav.map((item , index)=>(
          <Link to={item.route} key={index} >
            <div className={item.subitems?'item-toggle':'item'} >
              <li key={index} className='d-flex gap-3'>
               {item.icon}
               <span className={anchoDispositivo<800?'d-none':'d-block'}>
                 {item.name}
               </span>
              </li>
             </div>
          </Link>  
         ))}
        </ul>  
      </div>
      <div className='h-25 border-top py-2 w-100 perfil d-flex flex-column gap-2 px-1 justify-content-end'>
       <div className='w-100 bg-light rounded-top-3 d-flex flex-row gap-3 shadow-sm border-1 py-3 px-2'>
        <div className='rounded-circle border-3 p-2 w-10 h-100 '><FaUserAlt className='profile col-nrj m-auto' /></div>
        <div className='w-80 d-flex flex-column fw-bold text-muted overflow-hidden' >
          <span className="my-anchor-element text-dark">
            <Tooltip anchorSelect=".my-anchor-element" place="top">
            {userData?userData.usuario:''} 
            </Tooltip>
            {userData?userData.usuario:''}
          </span>
        </div>
       </div> 
       <button className='w-100 h-25 p-3 btn btn-danger d-flex fw-bold text-light fs-6 align-items-center justify-content-center gap-1 shadow-sm' onClick={handleSalir} ><BiLogOut className='' /> Salir</button>
      </div>
    </div>
 )
}

export default NavBar;