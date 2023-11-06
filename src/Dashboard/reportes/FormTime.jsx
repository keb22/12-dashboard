import React, { useState, useEffect } from 'react';
import { Form, Button, Select } from 'react-bootstrap';

const FormTime = () => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  

  return (
    <div className=' border-bottom p-2 mb-2'>
      <Form className='d-flex flex-row gap-2 flex-wrap '>
        <Form.Group controlId="year" className='w-20'>
          <Form.Label>Año</Form.Label>
          <Form.Select
            value={year}
            onChange={(event) => setYear(event.target.value)}
          >
         
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="month" className='w-20'>
          <Form.Label>Mes</Form.Label>
          <Form.Select
            value={month}
            onChange={(event) => setMonth(event.target.value)}
          >
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="day" className='w-20'>
          <Form.Label>Día</Form.Label>
          <Form.Select
            value={day}
            onChange={(event) => setDay(event.target.value)}
          >
          
          </Form.Select>
        </Form.Group>
        <button className='btn btn-primary m-auto h-25'>Aplicar</button>
      </Form>
    </div>
  );
};

export default FormTime;