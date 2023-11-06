import React, { useState , useEffect } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Input, Label , Row, Col } from "reactstrap";
import axios from "axios";
const FormularioCal = ({active, setActive , datos , obtenerRegistro}) => {
  const [data, setData] = useState({
  });

  useEffect(() => {
    setData(datos);
    console.log(datos);
  }, [datos]);


  const handleClose = () => {
    setActive(false);
  };

 

  //Editar Registro  
  const editar = async () => {
    try {
      const response = await axios.put(
        "https://museoprehistorico.com/src/back-end/Data.php",
        data
      );
      console.log(response.data);
      await obtenerRegistro();
      handleClose();
     
    } catch (error) {
      console.error("Error al editar registro:", error);
    }
  };

  

  const handleChange = ( e ) => {
    setData({
        ...data,
        [e.target.name]:e.target.value,
    })
  }

  return (
    <div className="w-100">
      <Modal isOpen={active} toggle={handleClose}>
        <ModalHeader toggle={handleClose}>Formulario</ModalHeader>
        <ModalBody>
          <Form >
            {/* Columna 1 */}
            <Row>
              <Col sm="6">
                <FormGroup>
                  <Label for="id">ID</Label>
                  <Input type="text" name="id" placeholder="ID" value={data.id} onChange={handleChange} />
                </FormGroup>
              </Col>
              <Col sm="6">
                <FormGroup>
                  <Label for="documento">Nit</Label>
                  <Input type="text" name="documento" placeholder="Documento" value={data.nit} onChange={handleChange} />
                </FormGroup>
              </Col>
            </Row>

            {/* Columna 2 */}
            <Row>
              <Col sm="6">
                <FormGroup>
                  <Label for="nombre">Nombre</Label>
                  <Input type="text" name="nombre" placeholder="Nombre" value={data.nombre} onChange={handleChange} />
                </FormGroup>
              </Col>
              <Col sm="6">
                <FormGroup>
                  <Label for="telefono">Teléfono</Label>
                  <Input type="text" name="telefono" placeholder="Teléfono" value={data.telefono} onChange={handleChange} />
                </FormGroup>
              </Col>
            </Row>

            {/* Columna 3 */}
            <Row>
              <Col sm="6">
                <FormGroup>
                  <Label for="correo">Correo</Label>
                  <Input type="email" name="correo" placeholder="Correo" value={data.correo} onChange={handleChange} />
                </FormGroup>
              </Col>
              <Col sm="6">
                <FormGroup>
                  <Label for="cantidad">Cantidad</Label>
                  <Input type="number" name="cantidad" placeholder="Cantidad" value={data.cantidad} onChange={handleChange} />
                </FormGroup>
              </Col>
            </Row>
             {/* Columna 4 */}
             <Row>
              <Col sm="6">
                <FormGroup>
                  <Label for="fecha">Fecha</Label>
                  <Input type="date" name="fecha" placeholder="Fecha" value={data.fecha} onChange={handleChange} />
                </FormGroup>
              </Col>
              <Col sm="6">
                <FormGroup>
                  <Label for="total">Total</Label>
                  <Input type="number" name="total" placeholder="total a pagar" value={data.total} onChange={handleChange} />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button  color="primary" type="submit" onClick={editar}>Guardar</Button>
          <Button color="secondary" onClick={handleClose}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default FormularioCal;
