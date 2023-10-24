import React ,{ useContext} from 'react';

//Componentes de página
import Inicio from './routes/Inicio';
import Reportes from './routes/Reportes';
import Administracion from './routes/Administracion';
import Novedades from './routes/Novedades';
import Configuracion from './routes/Configuracion';
import Error from './routes/Error';

//Herramientas para iniciar la sesión
import LogIn from './routes/session/LogIn';
import { RouterProvider , createBrowserRouter} from 'react-router-dom';
import { AuthContext } from './context/Context'; 



function App(){
  //Variable de Acceso con la información 
  const {userData} = useContext(AuthContext);



  const router = createBrowserRouter([
    {
      path:'/',
      element:<Inicio />,
      errorElement:<Error />
    },
    {
      path:'/Reportes',
      element:< Reportes />
    },
    {
      path:'/Administracion',
      element:< Administracion />
    },
    
    {
      path:'/Novedades',
      element:<Novedades />,
    },
   /* {
      path:'/Configuracion',
      element:<Configuracion />
    },*/
  ])
  
  return(
   
     <React.StrictMode>
      {userData?
        <RouterProvider router={router} /> : <LogIn />
      }
     </React.StrictMode>
   
  );
}

export default App;