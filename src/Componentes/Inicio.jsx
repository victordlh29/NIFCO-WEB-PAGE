import React from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'

const Inicio = () => {
  const navigate = useNavigate()
  const [user, setUser] = React.useState(null)
  React.useEffect(() => {
    if (auth.currentUser) {
      setUser(auth.currentUser)
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error de usuario',
        text: 'Inicia sesión para poder continuar.'
      })
      navigate('/login')
    }
  }, [navigate])

  return (
    <div className='container'>
      <div className="row">
        <div className="col mt-5">
          <img src="https://www.omniumdigital.com/wp-content/uploads/2018/01/ventajas-de-trabajar-en-la-nube.jpg" alt="" className='img-fluid' />
        </div>
        <div className="col mt-5">
          <p>Somos una empresa fundada por profesionales de la información con experiencia en diseño, programación, soporte, mantenimiento y seguridad. Nuestra misión es brindar a nuestros clientes soluciones integrales, brindándoles servicios de alta calidad y asesorándolos en el desarrollo de todos nuestros proyectos.</p>

          <h2>Algunos de nuestros clientes</h2>
          <div>
            <img src="https://starteq.net/wp-content/uploads/2019/11/mcdonalds-png-logo-picture-3-1024x1001.png" alt="mcdonalds" className='img-fluid logo' />
            <img src="https://elmatecreativos.com/wp-content/uploads/2022/10/logo_kissimmee_color_screen_300_RGB.jpg" alt="kissimmee" className='img-fluid logo' />
            <img src="https://st3.depositphotos.com/35102928/37168/v/600/depositphotos_371684314-stock-illustration-colorful-bear-logo-suitable-for.jpg" alt="bear" className='img-fluid logo' />
            <img src="https://cdn.pixabay.com/photo/2016/08/15/18/18/bmw-1596080__480.png" alt="bmw" className='img-fluid logo' />
          </div>
        </div>
      </div>
    </div>

  )
}

export default Inicio


