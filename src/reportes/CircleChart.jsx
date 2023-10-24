import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import React, {useState , useEffect} from 'react';

function TortaGrafica (){

  //Data
  const [data, setData] = useState([]);
   
  //Función para obtener los datos
  const obtenerRegistro = async () => { 
    try {
      const response = await axios.get('http://localhost/12-Dashboard/src/back-end/Data.php');
      const records = response.data;
      console.log(records);
      setData(records);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    obtenerRegistro();
  }, []);
  
  
  return(
    <>
    </>
  )
}

export default TortaGrafica;