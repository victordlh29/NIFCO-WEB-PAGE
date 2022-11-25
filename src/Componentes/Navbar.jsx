import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth} from '../firebase'

const Navbar = (props) => {
    const navigate = useNavigate()

    const cerrarSesion = () => {
        auth.signOut()
            .then(() => {
                navigate('/login')
            })
    }

    return (     
        <div className='navbar navbar-dark bg-dark'>
            <div className='container-fluid'> 
            <Link className='navbar-brand' to="/inicio">NIFICO</Link>       
                <div className='d-flex'>
                    <Link to="/inicio" className='btn btn-outline-light mx-1'>Inicio</Link>
                    {
                        props.firebaseUser !== null ? (
                            <Link to="/servicio" className='btn btn-outline-light  float-end mx-1'>Servicio</Link>
                        ) : null
                    }

                    {
                        props.firebaseUser !== null ? (
                            <button className='btn btn-outline-light  float-end mx-3' onClick={() => cerrarSesion()}><i className='bi bi-box-arrow-right'></i>
                            </button>
                        ) : (<Link to="/login" className='btn btn-outline-light'>Login</Link>)
                    }
                    
                </div>
            </div>
        </div>
        
    )
}

export default Navbar
