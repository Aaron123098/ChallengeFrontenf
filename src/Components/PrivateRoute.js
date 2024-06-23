import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

//Este componente sirve para proteger todas las paginas que no sean el login
//Si se intenta ingresar a alguna pagina y no se ha iniciado sesion, 
//se cargara la pagina del login

const PrivateRoute = () => {
    //Se intenta obtener el token guardado en el almacenamiento local del navegador.
    //Si no existe el token, no se podra ingresar a la pagina
    const auth = localStorage.getItem('token'); 

    //Si existe la variable auth, se carga el componente Outlet que renderiza la pagina a la que se
    //quiera ingresar, si no, se regresa al login
    return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute