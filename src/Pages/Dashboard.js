import React, { useEffect, useState } from 'react'
import axios from 'axios'

//Este es el componente que renderiza la pagina del dashboard
function Dashboard() {

  //Las variables  que serviran para renderizar el contenido de la tabla 
  //cuando se reciba la data, se cambie la paginacion, etc. (al necesitarse
  //volver a renderizar la data que contienen estas variables, se declaran como hooks)  
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  //Se llama a la funcion que jala la data del api. Se ejecuta al inicio de la carga
  //de la pagina
  useEffect(() => {
    fetchData();
  }, [currentPage, sortOrder, search]);

  //Funcion que recoge los datos a mostrar en la tabla desde la api
  const fetchData = async () => {
    const response = await axios.get(`API_URL/data?search=${search}&sortOrder=${sortOrder}&page=${currentPage}`);
    setData(response.data);
  };

  //Funcion para gestionar la busqueda en la tabla
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  //Funcion para ordenar los registros de la tabla
  const handleSort = (column) => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  //Funcion para cambiar la pagina de la tabla
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    //Renderizado de la pagina del dashboard
    <div className="dashboard-container">
      <input 
        type="text" 
        placeholder="Search..." 
        value={search} 
        onChange={handleSearchChange} 
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('age')}>Age</th>
            {/* other headers */}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              {/* other columns */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {[...Array(Math.ceil(100 / itemsPerPage)).keys()].map((page) => (
          <button key={page} onClick={() => handlePageChange(page + 1)}>
            {page + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
