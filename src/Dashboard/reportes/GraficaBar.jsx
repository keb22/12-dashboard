import React, { useState, useEffect } from 'react';
import {  Row , Col, Form } from 'react-bootstrap';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useRef } from 'react';
import TableExcel from './TableExcel';

const GraficaBar = () => {
	   //Referencia de la tabla Excel 
	   const tableRef = useRef(null);
  const [tiempo, setTiempo] = useState('ano');
  const [fecha, setFecha] = useState();
  const [data, setData] = useState([]);
	const [dataFiltrada , setDataFiltrada] = useState([]);
	// Función para filtrar los datos por año o fecha
	
	useEffect(() => {
		// Cuando el componente se monta o cambia 'tiempo' o 'fecha', realiza la solicitud de datos
		obtenerDatosDesdeAPI();
	}, []);
	
	const handleTiempoChange = (event) => {
		setTiempo(event.target.value);
		console.log(dataFiltrada)
		
	};
	
	const handleFechaChange = (event) => {
		setFecha(event.target.value);
	};
	
	useEffect(() => {
		const filtrarDatos = ({tiempo , fecha}) => {
		  if (tiempo === '2') {
			// Filtrar por año
			const añoSeleccionado = parseInt(fecha);
			const datosFiltrados = data.filter((dato) => {
			  const fechaDato = new Date(dato.fecha);
			  return fechaDato.getFullYear() === añoSeleccionado;
			});
			setDataFiltrada(datosFiltrados);
		  } else if (tiempo === '4') {
			// Filtrar por fecha específica 
			const datosFiltrados = data.filter((dato) => dato.fecha === fecha);
			setDataFiltrada(datosFiltrados);
		  } else if(tiempo === '3') {
			//Filtrar por el mes
				  const mesSeleccionado= parseInt(fecha);
				  const datosFiltrados= data.filter((dato)=>{
					  const fechaDato= new Date(dato.fecha);
					  return fechaDato.getMonth() === mesSeleccionado;
				  })
				  setDataFiltrada(datosFiltrados);
		  }else if(tiempo === '1') {
				  //Dar datos generales
				  setDataFiltrada(data);
			  }else{
				  setDataFiltrada(data);
			  }
		};
		filtrarDatos();
	}, [tiempo, fecha , data])
	
	
  const obtenerDatosDesdeAPI = (tiempo, fecha) => {
    // Realiza una solicitud a tu archivo PHP con Axios
    const apiUrl = 'https://museoprehistorico.com/src/back-end/Reportes/Ingresos.php'; // Reemplaza con la URL correcta

    // En la solicitud, puedes pasar los parámetros necesarios, por ejemplo, 'tiempo' y 'fecha'
    axios.get(apiUrl, { params: { tiempo, fecha } })
      .then((response) => {
        setData(response.data);
				setDataFiltrada(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
		<div className="w-100 p-3 bg-light rounded-3 mt-2" style={{overflowX:'visible'}}>
		<Row>
			<Col>
				<h3 className='fs-3 fw-bold'>Ingresos</h3>
			</Col>
		</Row>
		<Form className='w-100'>
		<Row className='w-100  mb-3'>
			  <Col className='py-2' md={6}>
					<Form.Group controlId="tiempo">
						<Form.Label>Tipo de Lapso:</Form.Label>
						<Form.Control as="select" value={tiempo} onChange={handleTiempoChange}>
						<option value="1">General</option>
							<option value="2">Anual</option>
							<option value="3">Mensual</option>
							<option value="4">Fecha Especifica</option>
						</Form.Control>
					</Form.Group>
				</Col>	
					{tiempo === '2' && (
			  <Col className='py-2' md={6}>
						<Form.Group controlId="year">
							<Form.Label>Año:</Form.Label>
							<Form.Control type="number" value={fecha} onChange={handleFechaChange} />
						</Form.Group>
		  	</Col>
					)}
					{tiempo === '3' && (
				<Col className='py-2' md={6}>
						<Form.Group controlId="mes">
							<Form.Label>Mes:</Form.Label>
							<Form.Control as="select" value={fecha} onChange={handleFechaChange}>
							<option value={1}>Enero</option>
							<option value={2}>Febrero</option>
							<option value={3}>Marzo</option>
							<option value={4}>Abril</option>
							<option value={5}>Mayo</option>
							<option value={6}>Junio</option>
							<option value={7}>Julio</option>
							<option value={8}>Agosto</option>
							<option value={9}>Septiembre</option>
							<option value={10}>Octubre</option>
							<option value={11}>Noviembre</option>
							<option value={12}>Diciembre</option>
						</Form.Control>
						</Form.Group>
				</Col>
					)}
					{tiempo === '4' && (
				<Col className='py-2' md={6}>
						<Form.Group controlId="fecha">
							<Form.Label>Fecha Específica:</Form.Label>
							<Form.Control type="date" value={fecha} onChange={handleFechaChange} />
						</Form.Group>
				</Col>
					)}
				<TableExcel name="Ingresos" tableRef={tableRef} data={dataFiltrada}/>
		</Row>	
			</Form>
		<Row className='w-100'>
			<ResponsiveContainer width="100%"  aspect={2}>
          <AreaChart
					  
            width={500}
            height={400}
            data={dataFiltrada}
            syncId="id2"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
						scrollY={true}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip />
            <Area  type="monotone" dataKey="total" stroke='#8884d8' fill='#FFEB3B'  />
          </AreaChart>
        </ResponsiveContainer>
		</Row>
	</div>

  );
};

export default GraficaBar;
