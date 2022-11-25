import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import Register from './Registro'
import Swal from 'sweetalert2'
const Admin = () => {
    const navigate = useNavigate()
    const [user,setUser]= React.useState(null)
    React.useEffect(()=>{
      if (auth.currentUser) {
        setUser(auth.currentUser)
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error de usuario',
          text: 'Inicia sesión para poder continuar.'
        })
        navigate('/login')
      }
    },[navigate])
    return (
      <div>
      {
       user && (
            <Register user={user}/>
          )
       }  
  
      </div>
    )
  }
      
  
  export default Admin