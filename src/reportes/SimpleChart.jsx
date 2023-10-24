import React from "react";
import { BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis, Bar , Tooltip } from "recharts";
import FormTime from "./FormTime";


const SimpleChart =({datos}) =>{
  //Data
	const data = datos;
  return(
    <div className="w-100 p-2 bg-light rounded-3">
      <h3>Clientes</h3>
      <FormTime/>
      <ResponsiveContainer  aspect={1}>
        <BarChart data={data} 
          width={100} 
          height={100} 
          margin={{
           top:5,
           right:10,
           left:10,
           bottom:5,
          }}>
         <CartesianGrid strokeDasharray="4 1 2" />
         <XAxis dataKey="create_at" />
         <YAxis />
         <Tooltip />
         <Legend />
         <Bar dataKey="cantidad" fill="#FFA500" />
        </BarChart>
      </ResponsiveContainer>

    </div>
  )
}
 export default SimpleChart;