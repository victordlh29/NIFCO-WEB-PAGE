import './Estilos/App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './Componentes/Login';
import Inicio from './Componentes/Inicio';
import Navbar from './Componentes/Navbar';
import React from 'react';
import { auth } from './firebase';
import Admin from './Componentes/Admin';
import Footer from './Componentes/Footer';

function App() {
  const [firebaseUser, setFirebaseUser] = React.useState(false)
  React.useEffect(()=>{
    auth.onAuthStateChanged(user =>{
     console.log(user);
      if (user) {
        setFirebaseUser(user)
      }else{
        setFirebaseUser(null)
      }
    })
  },[])

   return firebaseUser !== false ? (
    <Router>
          <Navbar firebaseUser={firebaseUser}/>
        <Routes>
         <Route path='/' element={<Inicio />} />
          <Route path='inicio' element={<Inicio />} />
          <Route path='login' element={<Login />} />
          <Route path='servicio' element={<Admin />} />
        </Routes>
        <Footer/>
    </Router>
  ) :
    (
      <h1 className='text-center'>Loading...</h1>
    );
    
}

export default App;
