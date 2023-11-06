import React from 'react';
import '../estilos-de-componente/Boton.css';


const Boton = ( props ) => {

    function handleClick(){
        const setForm = props.onclick;
        const form = props.form;
        var nuevoValor = form? '':'1';
        setForm(nuevoValor);
    }
    return(
        <button className='reserva imonster shadow' onClick={handleClick}>Rerservar {props.onclick}</button>
    );
}

export default Boton;