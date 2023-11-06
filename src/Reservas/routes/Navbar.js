import {  useState  } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './routescss/Menu.css';
import Boton from './componentes/Boton';
import Formulario from './componentes/Formulario';
import Logo from './img/Logo-Huila-Park2023.png';
import '../../css/index2.css';

function Barra() {
  const [clase, setClase] = useState("");
   //Constantes de estado del formulario que se pueden controlar desde un componente atravez de los props
   const [form, setForm] = useState('');
   const [formemp, setFormemp] = useState('');
   const [formcli ,setFormcli] = useState('');

  const mediaQuery = window.matchMedia("(max-width: 1000px)");

  mediaQuery.addEventListener("change", () => {
    if (mediaQuery.matches) {
      setClase("bg-light p-2");
    } 
  });
  return (
    <Navbar expand="lg" className="bg-body-tertiary border-bottom" style={{height:'25vh' }}>
      <Container>
        <Navbar.Brand href="#home"><img className='border rounded-2 h-100' src={Logo} alt="Logo Museo Prehistórico Neiva Huila" style={{height:'100%', width:'120px'}} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className={`p-2 rounded-2 ${clase} h-100`} id="basic-navbar-nav">
          <Nav className="me-auto gap-3 ">
          <Link className='text-decoration-none' to={"/Reservas/Inicio"}><div  className='itemlista w-20 '> Inicio</div></Link>
          <Link className='text-decoration-none' to={"/Reservas/Nosotros"}>  <div className='itemlista w-20 ' > Nosotros</div></Link>
          <Link className='text-decoration-none' to={"/Reservas/Experencias"}> <div className='itemlista w-20' > Experencias</div></Link>
        <div className="contenedor-reserva d-flex align-item-center justify-content-center h-100 p-2 ">
          <Boton  onclick={setForm} form={form} />
          <Formulario onclickVisi={setForm} visible={form} onclickemp={setFormemp} formemp={formemp} onclickcli={setFormcli} formcli={formcli}/>
        </div>
          </Nav>
        </Navbar.Collapse>  
      </Container>
    </Navbar>
  );
}

export default Barra;