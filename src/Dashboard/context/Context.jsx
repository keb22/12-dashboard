import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  
  //Datos proporcionados por el contexto
  const [userData, setUserData] = useState(null);

  //Funcion de Ingreso 
  const login = (userDatos) => {
    localStorage.setItem("sesion-administrador", JSON.stringify(userDatos));
    setUserData(userDatos);
  };

  //Función de Salida 
  const logout = () => {
    localStorage.removeItem("sesion-administrador");
    setUserData(null);
  };
  
  // Obtener los datos del local storage para sesiones previas
  useEffect(() => {
    const localData = localStorage.getItem("sesion-administrador");
    if (localData) {
      setUserData(JSON.parse(localData));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
