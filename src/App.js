import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import PrivateRoute from './Components/PrivateRoute'

//En el componente app, se estructuran las rutas que contendra el sistema.
//La ruta de la pagina login no esta protegida, el resto si al encontrarse dentro
//del componente Route que tiene como elemento PrivateRoute
function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PrivateRoute/>}>
          <Route exact path="/dashboard" element = {<Dashboard/>}/>
        </Route>
        <Route exact path="/login" element = {<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
