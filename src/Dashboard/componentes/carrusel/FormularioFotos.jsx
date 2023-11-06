import { Form , FormGroup , Label, FormText, Input , Button } from "reactstrap";
import { useState } from "react";
import axios from "axios";

function Formulario ({obtenerFoto}){

  const [archivoSeleccionado, setArchivoSeleccionado] = useState(1);
  const [option , setOption] = useState('');
  const [descripcion , setDescripcion] = useState('');
  //Manejo del cambio en el input foto
  const handleCambioArchivo = (event) => {
    setArchivoSeleccionado(event.target.files[0]);
  };

  function limpiarFormulario() {
    setOption(1);
    setArchivoSeleccionado('');
    setDescripcion('');
   
    // Obtén el formulario por su ID (ajusta el ID según tu estructura HTML)
    const formulario = document.getElementById('Formulario');

    // Resetea el formulario
    formulario.reset();
  }
  //Enviar información al servidor 
  const handleEnviar = (e) => {
    e.preventDefault();    
    
    const formData = new FormData();
    formData.append('file', archivoSeleccionado);
    formData.append('tipoImagen', option )
    formData.append('descripcionImagen', descripcion);
    
    axios.post('https://museoprehistorico.com/src/back-end/Fotos/AgregarFotos.php', formData) // Cambiar la URL según el dominio
    .then(response => {console.log(response.data.message);
      obtenerFoto();
    })
    .catch(error => console.error('Error subiendo imagen:', error));
    limpiarFormulario();
  };
  return(
    <Form className="bg-light px-2 w-100 py-3" id="Formulario"> 
      <FormGroup>
        <Label for="tipoImagen" className="fw-bold">Tipo de imagen</Label>
        <Input 
          id="tipoImagen"
          name="selectMulti" 
          type="select" value={option} 
          onChange={(e)=>setOption(e.target.value)} 
          required >
          <option value={0} >Selecciona Opcion</option>
          <option value={1} >Carrusel</option>
          <option value={2} >Anuncio</option>
          <option value={3} >Mision</option>
          <option value={4} >Vision</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="foto" className="fw-bold"> 
          Foto
        </Label>
        <Input
         required
         id="foto"
         name="file"
         type="file"
         files={archivoSeleccionado}
         onChange={handleCambioArchivo}
        />
       <FormText>
         Sube una foto que se mostrará en la página principal del museo en la seccioón de Nosotros. Formatos permitido JPG PNG.
       </FormText>
      </FormGroup>
      <FormGroup>
        <Label className="fw-bold" for="descripcion">
         Descripcion
        </Label>
        <Input
         id="descripcion"
         name="descripcion"
         type="text"
         maxLength={200}
         value={descripcion}
         onChange={(e)=>setDescripcion(e.target.value)}
        />
      </FormGroup>
      <Button className="w-100 fw-semibold" color="primary" outline onClick={handleEnviar} >
       Publicar Foto
      </Button>
    </Form>
  ) 
}

export default Formulario;