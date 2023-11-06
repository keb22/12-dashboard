import React from 'react';

//Componentes de página
import Inicio from './Dashboard/routes/Inicio.jsx';
import Reportes from './Dashboard/routes/Reportes.jsx';
import Administracion from './Dashboard/routes/Administracion.jsx';
import Novedades from './Dashboard/routes/Novedades.jsx';

//Herramientas para iniciar la sesión
import LogIn from './Dashboard/routes/session/LogIn';
import { RouterProvider , createBrowserRouter} from 'react-router-dom';

import { RouteError } from './Dashboard/routes/session/RouteError';
import RouteGuard from './Dashboard/routes/session/RouteGuard.jsx';
import Inicio2 from './Reservas/routes/Inicio.js';
import Nosotros from './Reservas/routes/Nosotros.js';
import Experencias from './Reservas/routes/Experencias.js';
import InicioSelect from './Dashboard/Option.jsx';


function App(){

  //Hijos Ruta para el Dashboard
  const  rutasDashboard=[
    
    {
      path:'/Dashboard/',
      element:<LogIn />,
    },
    {
      path:'/Dashboard/Inicio',
      element: <RouteGuard><Inicio /></RouteGuard>,
    },
    {
      path:'/Dashboard/Reportes',
      element:<RouteGuard><Reportes/></RouteGuard>,
    },
    {
      path:'/Dashboard/Administracion',
      element:<RouteGuard><Administracion /> </RouteGuard>,
    },
    {
      path:'/Dashboard/Novedades',
      element:<RouteGuard><Novedades /></RouteGuard>,
    }
  ] ;
 
  //Hijos Ruta para las Reservas Museo

  const rutasMuseo=[
    {
      path:'/Reservas/',
      element:<Inicio2/>,
    },
    {
      path:'/Reservas/Inicio',
      element:<Inicio2 />
    },
    {
      path:'/Reservas/Nosotros',
      element:< Nosotros />
    },
    {
      path:'/Reservas/Experencias',
      element:< Experencias />
    },
  ]
  //Rutas 
  const router = createBrowserRouter([
    {
      path:'/',
      element:<InicioSelect />,
      errorElement:<RouteError/>
    },
    {
      path:'/Reservas',
      children:rutasMuseo,
      errorElement:<RouteError/>
    },
    {
      path:'/Dashboard',
      errorElement:<RouteError />,
      children:rutasDashboard,
    }
  ]);



  return(
   
     <React.StrictMode>
        <RouterProvider router={router} />
     </React.StrictMode>
   
  );
}

export default App;