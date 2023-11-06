import { Card, CardHeader, CardText, CardTitle, Col, Row } from "react-bootstrap";
import { useState , useEffect  } from "react";
import axios from "axios";
import { CardBody } from "reactstrap";
function MisionVision (){
  const [datos , setDatos] = useState([]);
  const [imagenMision , setImagenMision] = useState([]);
  const [imagenVision , setImagenVision] = useState([]);

  // Obtener imágenes de la base de datos al cargar la página
  function ObtenerFotos(){
   axios.get('http://localhost/12-Dashboard/src/back-end/Fotos/ObtenerFotos.php') // Cambiar la URL al lanzar al servidor
   .then(response => setDatos(response.data))
   .catch(error => console.error('Error fetching images:', error));
  }
  useEffect(() => {
    ObtenerFotos();
  }, []);
  
  useEffect(() => {
    const imagenesTipo3 = datos.filter(imagen => imagen.tipoImagen === '3');  
    setImagenMision(imagenesTipo3[0] || {}); 
    const imagenesTipo4 = datos.filter(imagen => imagen.tipoImagen === '4');  
    setImagenVision(imagenesTipo4[0] || {});
    console.log(imagenMision); 
  }, [datos]);

  const estilos={
    maxHeight:'200px',
    width:'300px',
    fitObject:'contain',

  }
  return(
    <div className="p-3 mt-5 ">
      <Row className="w-100">
      <Col md={6}>

     <Card className="mt-2">
      <CardHeader>
        <CardTitle className="fw-bold">Misión</CardTitle>
      </CardHeader>
      <Card.Img variant="top" className="m-auto" style={estilos} src={`http://localhost/12-Dashboard/src/back-end/Fotos/img/${imagenMision.nomImagen}`} />
      <CardBody>

        <CardText>{imagenMision.descripcionImagen}</CardText>
      </CardBody>
     </Card>
      </Col>
      <Col md={6}>
      <div className="w-80 d-flex flex-row">
       <svg    style={{height:'100px'}} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
         <path fill="#F07F1A" d="M38.8,-47.9C51.9,-43.8,65.4,-34.7,73,-21.4C80.6,-8,82.2,9.6,76.8,24.5C71.3,39.5,58.9,51.7,44.9,52.5C31,53.4,15.5,42.8,-1.9,45.4C-19.3,48,-38.6,63.9,-48.5,61.7C-58.3,59.6,-58.7,39.4,-59,22.9C-59.3,6.3,-59.5,-6.5,-58.6,-22.1C-57.7,-37.6,-55.7,-55.8,-45.8,-60.9C-35.8,-66,-17.9,-58,-2.6,-54.5C12.8,-51,25.6,-51.9,38.8,-47.9Z" transform="translate(100 100)" />
       </svg>
       <svg style={{height:'130px'}} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
         <path fill="#F07F1A" d="M20.6,-35.1C27.2,-23.5,33.4,-18.2,34.4,-11.9C35.4,-5.7,31.2,1.5,27.4,7.5C23.6,13.6,20.2,18.4,15.7,30.5C11.2,42.7,5.6,62.1,-3.3,66.6C-12.1,71.1,-24.3,60.6,-31.7,49.4C-39.2,38.3,-42,26.4,-42.2,16C-42.4,5.6,-40,-3.3,-35.4,-9.6C-30.7,-16,-23.9,-19.8,-17.7,-31.5C-11.4,-43.2,-5.7,-62.8,0.6,-63.7C7,-64.5,13.9,-46.7,20.6,-35.1Z" transform="translate(100 100)" />
       </svg>
      </div>
      <div className="w-50 m-auto">
        <svg style={{height:'150px'}}  viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
         <path fill="#F07F1A" d="M39.3,-50.1C48.5,-47.4,51.9,-32.7,55.5,-18.7C59.1,-4.7,62.9,8.5,60,20.1C57.1,31.8,47.4,41.9,36.3,48.9C25.2,55.9,12.6,59.8,-2.3,62.9C-17.2,66.1,-34.4,68.6,-48.4,62.5C-62.5,56.5,-73.3,41.9,-69.3,28.6C-65.3,15.2,-46.4,3.1,-38.5,-9.8C-30.6,-22.7,-33.5,-36.5,-28.9,-40.7C-24.3,-44.8,-12.2,-39.4,1.4,-41.4C15,-43.4,30.1,-52.7,39.3,-50.1Z" transform="translate(100 100)" />
        </svg>
      </div>
        </Col>
     </Row>
     <Row>
     <Col md={6}>
      <div className="w-50 m-auto">
        <svg style={{height:'150px'}}  viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
         <path fill="#F07F1A" d="M39.3,-50.1C48.5,-47.4,51.9,-32.7,55.5,-18.7C59.1,-4.7,62.9,8.5,60,20.1C57.1,31.8,47.4,41.9,36.3,48.9C25.2,55.9,12.6,59.8,-2.3,62.9C-17.2,66.1,-34.4,68.6,-48.4,62.5C-62.5,56.5,-73.3,41.9,-69.3,28.6C-65.3,15.2,-46.4,3.1,-38.5,-9.8C-30.6,-22.7,-33.5,-36.5,-28.9,-40.7C-24.3,-44.8,-12.2,-39.4,1.4,-41.4C15,-43.4,30.1,-52.7,39.3,-50.1Z" transform="translate(100 100)" />
        </svg>
      </div>
      <div className="w-80 d-flex flex-row">
       <svg style={{height:'130px'}} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
         <path fill="#F07F1A" d="M20.6,-35.1C27.2,-23.5,33.4,-18.2,34.4,-11.9C35.4,-5.7,31.2,1.5,27.4,7.5C23.6,13.6,20.2,18.4,15.7,30.5C11.2,42.7,5.6,62.1,-3.3,66.6C-12.1,71.1,-24.3,60.6,-31.7,49.4C-39.2,38.3,-42,26.4,-42.2,16C-42.4,5.6,-40,-3.3,-35.4,-9.6C-30.7,-16,-23.9,-19.8,-17.7,-31.5C-11.4,-43.2,-5.7,-62.8,0.6,-63.7C7,-64.5,13.9,-46.7,20.6,-35.1Z" transform="translate(100 100)" />
       </svg>
      <svg    style={{height:'100px'}} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
         <path fill="#F07F1A" d="M38.8,-47.9C51.9,-43.8,65.4,-34.7,73,-21.4C80.6,-8,82.2,9.6,76.8,24.5C71.3,39.5,58.9,51.7,44.9,52.5C31,53.4,15.5,42.8,-1.9,45.4C-19.3,48,-38.6,63.9,-48.5,61.7C-58.3,59.6,-58.7,39.4,-59,22.9C-59.3,6.3,-59.5,-6.5,-58.6,-22.1C-57.7,-37.6,-55.7,-55.8,-45.8,-60.9C-35.8,-66,-17.9,-58,-2.6,-54.5C12.8,-51,25.6,-51.9,38.8,-47.9Z" transform="translate(100 100)" />
       </svg>
      </div>
        </Col>
      <Col md={6}>
        <Card className="mt-2">
         <CardHeader>
           <CardTitle className="fw-bold">Visión</CardTitle>
         </CardHeader>
         <Card.Img  className="m-auto"variant="top" style={estilos}  src={`http://localhost/12-Dashboard/src/back-end/Fotos/img/${imagenVision.nomImagen}`} />
         <CardBody>
           <CardText>{imagenVision.descripcionImagen}</CardText>
          </CardBody>
        </Card>
      </Col>
     </Row>
    </div>
  )
}

export default MisionVision;