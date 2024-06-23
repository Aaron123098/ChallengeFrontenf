import React, {useState} from "react";
import axios from 'axios';

//Este es el componente que renderiza la página de Login
function Login () {
    //Las variables para manejar el inicio de sesion (hooks)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    //Esta funcion asincrona se ejecutara cuando se clickee el boton "Login"
    const submit = async (e) => {

        //Se intenta llamar al api para verificar la validez de las credenciales. Si son validas, devolveran un token. Si no, 
        //devolverá error
        try{
            const response = await axios.post('https://reqres.in/api/login', { "email": username, "password": password });
            console.log(response)
            localStorage.setItem('token', response.data.token);
            if(response){
                localStorage.setItem('token', response.data.token);
                
            }else{
                setError("Usuario o contraseña incorrectos. Intente nuevamente")
                alert("Usuario o contraseña incorrectos. Intente nuevamente")

            }
        }catch (err){
            setError("Usuario o contraseña incorrectos. Intente nuevamente")
            alert("Usuario o contraseña incorrectos. Intente nuevamente")

        }
    }

    return (
        //Se retorna el renderizado de la pagina
        <div className="login-container">
          <form onSubmit={submit}>
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <input 
              type="text" 
              placeholder="Username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <button type="submit">Login</button>
          </form>
        </div>
      )
}

export default Login;