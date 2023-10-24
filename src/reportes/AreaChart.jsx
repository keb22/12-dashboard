import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import React  from 'react';
import FormTime from './FormTime';

function AreaGrafica ( {datos ,color , area ,titulo}){
  //Data
	const data = datos;
  
  return(
    <div className="w-100 p-2 bg-light rounded-3">
    <h3>{titulo}</h3>
    <FormTime/>
    <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            width={500}
            height={200}
            data={data}
            syncId="id"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="total" stroke={color} fill={area} />
          </AreaChart>
        </ResponsiveContainer>
    </div>
  )
}

export default AreaGrafica;