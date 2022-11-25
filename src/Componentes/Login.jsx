import React from 'react';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  /* Hooks */
  const [email, setEmail] = React.useState('')
  const [pass, setPass] = React.useState('')
  const [modoRegistro, setModoRegistro] = React.useState(false)
  const [error, setError] = React.useState(null)
  const navigate = useNavigate()

  /* Funcion guardar datos */
  const guardarDatos = (e) => {
    /* Getout  */
    e.preventDefault()
    /* Validations */
    if (!email.trim()) {
      setError('Ingrese Email')
      return
    }
    if (!pass) {
      setError('Ingrese Password')
      return
    }
    if (pass.length < 6) {
      setError('La contraseña debe tener minímo 6 carácteres')
      return
    }
    setError(null)
    if (modoRegistro) {
      registrar()
    } else {
      Login()
    }
  }
  const Login = React.useCallback(async () => {
    try {
      const res = await auth.signInWithEmailAndPassword(email,pass)
      console.log(res.user);
      setEmail('')
      setPass('')
      setError(null)
      navigate('/inicio')
    } catch (error) {
      console.log(error.code);
      if (error.code==='auth/user-not-found') {
        setError('El usuario no existe.')
      }
      if (error.code==='auth/wrong-password') {
        setError('Contraseña errada.')
      }
    }
  }, [email, pass,navigate])

  const registrar = React.useCallback(async () => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, pass)
      console.log(res.user);
      await db.collection('usuariosdb').doc(res.user.email).set(
        {
          email: res.user.email,
          id: res.user.uid
        })
      setEmail('')
      setPass('')
      setError(null)
    } catch (error) {
      console.log(error.code);
      if (error.code === 'auth/email-already-in-use') {
        setError('Email ya registrado.')
      }
      if (error.code === 'auth/invalid-email') {
        setError('Email incorrecto.')
      }
    }
  }, [email, pass])

  return (
    <div className='login'> 
      <div className="loginContainer">
        <div className="row justify-content-center">
        <h3 className='text-center text-light' >
                        {
                            modoRegistro ? 'Registro de usuario' : 'Login'
                        }
                    </h3>
          <form onSubmit={guardarDatos}>
            {
              error && (
                <div className='alert alert-danger'>{error}</div>
              )
            }
            <input type="email"
              placeholder='Ingrese su email'
              className='form-control mb-3'
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
            <input type="password"
              placeholder='Ingrese su conraseña'
              className='form-control mb-3'
              onChange={e => setPass(e.target.value)}
              value={pass}
            />
            <div className='d-grid grap-2'>
              <button className='btn btn-outline-light mb-3'>{modoRegistro ? 'Registrarse' : 'Acceder'}</button>
              <button className='btn btn-outline-light' type='button' onClick={() => setModoRegistro(!modoRegistro)} > {modoRegistro ? 'Ya estás registrado ?' : 'No tienes cuenta?'}</button>
            </div>
          </form>
        </div>
      </div>
 </div>
    
  )
}

export default Login
