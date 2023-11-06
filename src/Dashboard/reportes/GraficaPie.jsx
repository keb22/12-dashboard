import React, { useState, useEffect } from 'react';
import {  Row , Col} from 'react-bootstrap';
import { Pie, PieChart, ResponsiveContainer , Tooltip} from 'recharts';
import axios from 'axios';

const GraficaPie = () => {
  const [data, setData] = useState([]);
	const [dataFiltrada , setDataFiltrada] = useState([]);

	
  
  const obtenerDatosDesdeAPI = ( ) => {
    // Realiza una solicitud a tu archivo PHP con Axios
    const apiUrl = 'http://localhost/12-Dashboard/src/back-end/Reportes/Ingresos.php'; // Reemplaza con la URL correcta
    
    // En la solicitud, puedes pasar los parámetros necesarios, por ejemplo, 'tiempo' y 'fecha'
    axios.get(apiUrl)
    .then((response) => {
      setData(response.data);
      setDataFiltrada(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  };
  
  
    useEffect(() => {
      obtenerDatosDesdeAPI();
      console.log(dataFiltrada);
    }, [])
  return (
		<div className="w-100 p-2 bg-light rounded-3">
		<Row>
			<Col>
				<h3>Pie</h3>
			</Col>
		</Row>
		<Row className='w-100'>
    <ResponsiveContainer>
          <PieChart>
            <Pie dataKey="total" data={data} fill="#82ca9d"  >
            </Pie>
            <Tooltip/>
          </PieChart>
    </ResponsiveContainer>
		</Row>
	</div>

  );
};

export default GraficaPie;
