import Footer from './Footer';
import './routescss/Nosotros.css';
import Anuncios from './componentes/Carrusel/Anuncios';
import Barra from './Navbar';
import MisionVision from './componentes/Carrusel/MisionVision';
import '../../css/index1.css';
import { Card, CardBody, Col, Row } from 'reactstrap';
import Redes from './componentes/Redes';


export default function Nosotros(){
  return(
    <div >
      <Redes/>
      <Barra />
      <div className='contenedor-nosotros px-2 py-4'>
      <h1 className='imonster text-center fw-bold fs-1'>Nosotros</h1>
      <MisionVision />
      <Card className='w-75 m-auto mb-5'>
        <CardBody>
          <Row className='p-2-'>
           <Col md={6}>
             <div className='itemSe'>
               <h4 className='fw-bold'>Horarios</h4>
             </div>
             <div className='px-4 mt-2'>
              <p>8:00 am - 6:00 pm <span className='text-muted'>Jornada Continua</span></p>
              <p>Domingo a Domingo</p>
             </div>
           </Col>
           <Col md={6}>
             <div className='itemSe'>
               <h4 className='fw-bold'>Tarifas</h4>
             </div>
             <div className='px-4 mt-2'>
             <p>10,000 COP X Persona</p>

             </div>
           </Col>
          </Row>
        </CardBody>
        
      </Card>
      </div>
      <Anuncios className="mt-2"/>
      <Footer />
    </div>
  )
}