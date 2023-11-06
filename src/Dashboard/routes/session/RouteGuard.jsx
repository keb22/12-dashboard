import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Context';
import { useContext } from 'react';
import LogIn from './LogIn';

const RouteGuard = ({ children }) => {
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!userData) {
    // Si el usuario no está logueado, redirigirlo a la página de inicio de sesión
    navigate('/Dashboard/');
    return <LogIn/>;
  }else{
    // Si el usuario está logueado, renderizar el componente de la ruta
    return children;
  }

};

export default RouteGuard;
