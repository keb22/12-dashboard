import React, { useState, useEffect , useRef } from 'react';
import axios from 'axios';
import { AiFillDelete, AiTwotoneEdit, AiOutlineUserAdd } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { Button ,Container, Modal , ModalBody , ModalHeader , FormGroup , ModalFooter } from 'reactstrap';
import { Col, Form, Row } from 'react-bootstrap';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { HiOutlineDocumentDownload } from 'react-icons/hi';


function Tabla() {
  //Datos sugestos a filtracion
  const [registros, setRegistros] = useState([]);

  //Referencia de la tabla 
  const tableRef = useRef(null);
  //Datos sin filtrar
  const [datos , setDatos] = useState([]);
  //Datos del formulario a editar, borrar, crear o eliminar
  const [formdata, setFormdata] = useState({
    id:'',
    nit:'',
    nombre:'',
    telefono:'',
    cantidad:'',
    correo:'',
    fecha:'',
    total:'',
  })
  
  //Limpiar formdata
  const limpiar = () =>{
    setFormdata({
      id:'',
     nit:'',
     nombre:'',
     telefono:'',
     cantidad:'',
     correo:'',
     fecha:'',
     total:'',
    })


  }

 

  //Datos para el manejo del estado del formulario modal.(Mostar=True o no mostrar=false) 
  const [states, setState] = useState({
    modalInsertar: false,
    modalActualizar: false,
  })

  //Manejo de los cambios en los datos del formulario

  //Manejo de un cambio especifico en los valores de cantidad y total
  const handleChangeCantidad = e =>{
    setFormdata({
      ...formdata,
      total:e.target.value*1000,
      cantidad:e.target.value,
    })
  }
  //Manejo General para el resto de cambios
  const handleChange = e =>{
    
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  }

  //Manejo del Formulario Modal Insertar
  const modalInsertar = () =>{
    setState({
      modalInsertar:true,
    })
    console.log(states)
  }
  const cerrarModalInsertar = () =>{
    setState({
      modalInsertar:false,
    })

    limpiar();
  }

  //Manejo del Formulario Modal Actualizar.
  
  //Abrir
  const modalActualizar = ( registro ) =>{
    setState({
      modalActualizar:true,
    });
    //El parametro registro recibe los datos del registro seleccionado en forma de objeto y se los pasa a formdata para que los muestre en el Modal y el usuario puede modificarlos. 
    setFormdata(registro); 
  }

  //Cerrar
  const cerrarModalActualizar = () =>{
    setState({
      modalActualizar:false,
    });

    limpiar();
  }
  

  //Consultas para los registros en la Base de Datos
  
  //Editar Registro  
  const editar = async () => {
    try {
      const response = await axios.put(
        "http://localhost/12-Dashboard/src/back-end/Data.php",
        formdata
      );
      console.log(response.data);
      await obtenerRegistro();
      mostrarAlertSuccess("Registro Actualizado");
      cerrarModalActualizar();
      limpiar();
    } catch (error) {
      mostrarAlertError();
      console.error("Error al editar registro:", error);
    }
  };
  
 
  //Borrar Registro
  const borrar = async (registro) =>{
    try {
      const response = await axios.delete(
      `http://localhost/12-Dashboard/src/back-end/Data.php?id=${registro.id}`
      );
      console.log(response.data);
      await obtenerRegistro();
      limpiar();
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
    }

  }

  
  //Enviar un nuevo registro
  const crearRegistro = async () => {
    
    try {
      const response = await axios.post(
        'http://localhost/12-Dashboard/src/back-end/Data.php',
        formdata
      );
      console.log(response.data.message); // Use response.data.message to access the message from the response
      await obtenerRegistro();
      limpiar();
      cerrarModalInsertar();
      mostrarAlertSuccess("Registro Exitoso");
    } catch (error) {
      mostrarAlertError();
      console.error('Error al crear registro:', error);
    }
  };

  
  // Obtener registros existentes
  const obtenerRegistro = async () => {
  
  try {
    const response = await axios.get('http://localhost/12-Dashboard/src/back-end/Data.php');
    const records = response.data;
    console.log(records);
    setRegistros(records);
    setDatos(records);
  } catch (error) {
    console.error(error);
  }
  };




  //Alerta para expresar error o éxito en cada consulta 

  const mostrarAlertSuccess =( titulo) =>{
    Swal.fire({
      title: titulo,
      icon:'success',
    })
  }
  const mostrarAlertError =() =>{
    Swal.fire({
      title:'Error',
      icon:'error',
      text:'La petición no pudo ser realizada, intentar de nuevo',
      timer:3000,
    })
  }

  const mostrarConfirmarBorrar =( registro ) =>{
    Swal.fire({
      title:'¿Estás seguro/a?',
      icon:'warning',
      text:'Ten encuenta que no se puede deshacer la acción',
      confirmButtonText:'Eliminar',
      confirmButtonColor:'blue',
      denyButtonText:'Cancelar',
      showDenyButton:true,
    }).then(response=>{
      if(response.isConfirmed){
        Swal.fire({
          title:'Registro Borrado',
          icon:'success',
          timer:2000,
        })

        borrar(registro);
      }else{
        Swal.fire({
          title:'Petición Cancelada',
          icon:'danger',
          timer:2000,
        })
      }
    })
  }

  // Llamado inicial a la BD para generar el datatable
  useEffect(() => {
    obtenerRegistro();
  }, []);
  
  
  function handleSearch( e ){

    const registrosFiltrados= datos.filter(item =>
      item.nombre.toLowerCase().includes(e.target.value.toLowerCase())
    );

    e.target.value===''?setRegistros(datos):setRegistros(registrosFiltrados);
  }
  
  

  return (
    <>
     <Container >
       <Button color='primary' className='mb-3 fw-semibold p-2 d-flex flex-row gap-1' onClick={modalInsertar}>  <AiOutlineUserAdd className='icon'/>Insertar Registro</Button>
       <div className=' mb-2 bg-light rounded-3 p-2'>
       <Form inline>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Buscar"
              className=" mr-sm-2"
              onChange={handleSearch}
            />
          </Col>
          <Col xs="auto">
            <DownloadTableExcel
            filename='Registros Museo Prehistórico'
            sheet='reservas'
            currentTableRef={tableRef.current}
            >
              <Button className='fw-semibold d-flex flex-row ' outline color='primary'>
               <HiOutlineDocumentDownload className='m-auto ' style={{height:'20px',width:'20px'}} />
                Descargar 
              </Button>
            </DownloadTableExcel>
          </Col>
        </Row>
      </Form>
       </div>
       <table className='table table-striped' ref={tableRef} >
          <thead>
          <tr>

            <th>Id</th>
            <th>NIT</th>
            <th>Nombre</th>
            <th>Telefono</th>
            <th>Cantidad</th>
            <th>Correo</th>
            <th>Reserva</th>
            <th>Total</th>
            <th></th>
            <th></th>
          </tr>
          </thead>
          <tbody>
           {registros.map(registro=>(
            <tr key={registro.id}>
          
              <td>{registro.id}</td>
              <td>{registro.nit?<span className='bg-warning rounded-2 p-1 fw-semibold'>{registro.nit}</span>:<span className='bg-info rounded-2 p-1 fw-semibold text-muted'>Cliente</span>}</td>
              <td>{registro.nombre}</td>
              <td>{registro.telefono}</td>
              <td>{registro.cantidad}</td>
              <td>{registro.correo}</td>
              <td>{registro.fecha}</td>
              <td>{registro.total}</td>
              <td><Button color='primary' onClick={()=>modalActualizar(registro)}> <AiTwotoneEdit className='profile' /></Button></td>
              <td><Button color='danger' onClick={()=>mostrarConfirmarBorrar(registro)}> <AiFillDelete className='profile' /></Button></td>
           </tr>
          ))}
        </tbody>
       </table>
     </Container>
     <Modal isOpen={states.modalActualizar}>
          <ModalHeader>
            <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={formdata.id}
              />
            </FormGroup>
            
            {formdata.nit?
            <FormGroup>
              <label>
                NIT: 
              </label>
              <input
                className="form-control"
                name="nit"
                type="text"
                onChange={handleChange}
                value={formdata.nit}
              />
            </FormGroup>
            :''}
            
            <FormGroup>
              <label>
                Nombre
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={handleChange}
                value={formdata.nombre}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Telefono
              </label>
              <input
                className="form-control"
                name="telefono"
                type="text"
                onChange={handleChange}
                value={formdata.telefono}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Cantidad
              </label>
              <input
                className="form-control"
                name="cantidad"
                type="text"
                onChange={handleChangeCantidad}
                autoComplete='off'
                value={formdata.cantidad}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Correo
              </label>
              <input
                className="form-control"
                name="correo"
                type="text"
                onChange={handleChange}
                value={formdata.correo}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Fecha
              </label>
              <input
                className="form-control"
                name="fecha"
                type="text"
                onChange={handleChange}
                value={formdata.fecha}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Total
              </label>
              <input
                className="form-control"
                name="total"
                type="text"
                readOnly
                disabled
                value={formdata.total}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => editar()}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={states.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar Registro</h3></div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                disabled
                type="text"
                value={registros.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                NIT: 
              </label>
              <input
                className="form-control"
                name="nit"
                type="text"
                onChange={handleChange}
                value={formdata.nit}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={handleChange}
                value={formdata.nombre}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Telefono
              </label>
              <input
                className="form-control"
                name="telefono"
                type="tel"
                onChange={handleChange}
                value={formdata.telefono}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Cantidad
              </label>
              <input
                className="form-control"
                name="cantidad"
                type="number"
                onChange={handleChangeCantidad}
                value={formdata.cantidad}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Correo
              </label>
              <input
                className="form-control"
                name="correo"
                type="e-mail"
                onChange={handleChange}
                value={formdata.correo}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Fecha
              </label>
              <input
                className="form-control"
                name="fecha"
                type="date"
                onChange={handleChange}
                value={formdata.fecha}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Total
              </label>
              <input
                className="form-control"
                name="total"
                type="text"
                readOnly
                disabled
                value={formdata.total}
              />
            </FormGroup>
      
          </ModalBody>


        

          <ModalFooter>
            <Button
              color="primary"
              onClick={()=>crearRegistro()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={cerrarModalInsertar}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
        

        
    </>
  );
}

export default Tabla;
