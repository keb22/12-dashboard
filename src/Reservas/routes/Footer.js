import './routescss/Footer.css';
import {CgMail} from 'react-icons/cg';
import {AiFillPhone} from 'react-icons/ai';
import {TiLocation} from 'react-icons/ti';
import { Col, Container, Row } from 'react-bootstrap';
import '../../css/index1.css';
export default function Footer () {

  return(


    <Row className="w-100 border-top Footer text-light bg-dark m-0 p-0">
      <Col md={4}>
      <p>Celular</p>
        <AiFillPhone className=' rounded-circle'/>
        <p>8715635 - 3166768219 - 3142139674</p>
      
      </Col>
      <Col md={4}>
      <p>Dirección</p>
        <TiLocation />
        <div className='text'>
         <p>Cra 1 # 2A-01 Avenida Circunvalar</p>
         <p>Bajo el monumento de la Gaitana</p>
        </div>
        <iframe title='ubicacion' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.6323949523594!2d-75.29474129043557!3d2.9216033544990263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3b747eff7d9b29%3A0xfc2d039be0759608!2sMuseo%20Prehist%C3%B3rico%20Huilassik%20Park!5e0!3m2!1ses!2sco!4v1689625154284!5m2!1ses!2sco" width="400" height="300" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </Col>
      <Col md={4}>
      <p>Correo</p>
        <CgMail />
        <p>garrido.1964@hotmail.com</p>
      
      </Col>

    </Row>
  )
}