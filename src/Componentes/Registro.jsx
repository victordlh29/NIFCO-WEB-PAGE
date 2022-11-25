import React from 'react'
import { db } from '../firebase'

const categorias = [
    {
        nombre: "Mantenimiento Inmuebles",
        opciones: ["Baños", "Cielo raso", "Electrico", "Pared", "Puerta"]
    },

    {
        nombre: "Mantenimiento Muebles",
        opciones: ["Aire acondicionado", "Archivador", "Puesto de trabajo", "Silla"]
    },

    {
        nombre: "Servicio",
        opciones: ["Aseo", "Transporte", "Vigilancia"]
    }
]

function Registro(props) {
    const [idOpciones, setIdOpciones] = React.useState(-1)
    const cargarOpciones = function (e) {
        const opcion = e.target.value
        if (opcion === '0') {
            setCategoriaPrincipal('Mantenimiento Inmuebles')
        }
        if (opcion === '1') {
            setCategoriaPrincipal('Mantenimiento Muebles')
        }
        if (opcion === '2') {
            setCategoriaPrincipal('Servicio')
        }
        setIdOpciones(opcion)
    }

    const datosSelect = function (e) {
        const opcion = e.target.value
        setCategoriaSecundaria(opcion)
    }

    //Hooks
    const [id, setId] = React.useState('')
    const [categoriaPrincipal, setCategoriaPrincipal] = React.useState('')
    const [categoriaSecundaria, setCategoriaSecundaria] = React.useState('')
    const [descripcion, setDescripcion] = React.useState('')
    const [ubicacion, setUbicacion] = React.useState('')
    const [fecha, setFecha] = React.useState(new Date().toLocaleDateString())

    const [modoEdicion, setModoEdicion] = React.useState(false)


    //Objeto donde se estaran agreagando todas las actividades.
    const [lista, setLista] = React.useState([])

    const [error, setError] = React.useState(null)
    const [exito, setExito] = React.useState(null)

    React.useEffect(()=>{ 
        const obtenerDatos = async()=>{
          try {
          // const db = firebase.firestore()
           const data = await db.collection(props.user.email).get()
           //console.log(data.docs);
           const arrayData = data.docs.map((documento)=>({id:documento.id,...documento.data()}))
           setLista(arrayData)
           console.log(arrayData);
          } catch (error) {
            console.log(error);
          }
        }  
        obtenerDatos()
        },[])

    //Guardar datos a fireStore.
    const guardarSolicitud = async (e) => {
        e.preventDefault()
        //Validaciones:

        if (!categoriaPrincipal.trim()) {
            setError("Seleccione la categoria principal")
            return
        }
        if (!categoriaSecundaria.trim()) {
            setError("Seleccione la categoria secundaria")
            return
        }
        if (!descripcion.trim()) {
            setError("Ingrese una descripcion")
            return
        }
        if (!ubicacion.trim()) {
            setError("Ingrese la ubicacion donde se prestara el servicio")
            return
        }

        try {
            const nuevaSolicitud = {
                categoriaPrincipal, categoriaSecundaria, descripcion, ubicacion, fecha
            }
            const dato = await db.collection(props.user.email).add(nuevaSolicitud)
            //Agregar a la lista.
            setLista([
                ...lista, { ...nuevaSolicitud, id: dato.id }
            ])

            setFecha(new Date().toLocaleDateString())

        } catch (error) {
            console.log(error)
        }

        console.log("Guardado exitoso!");
        alert("Guardado exitoso!")

        //Limpiar estados y formulario.
        setIdOpciones(-1)
        setDescripcion('')
        setUbicacion('')
        setError(null)
    }

    const eliminarSolicitud = async (id) => {
        try {
            await db.collection(props.user.email).doc(id).delete()
            const listaFiltrada = lista.filter((elemento) => elemento.id !== id)
            //Lista actualizada.
            setLista(listaFiltrada)
        } catch (error) {
            console.log(error)
        }

    }

    const editar = (elemento) => {
        setModoEdicion(true)
        setIdOpciones(elemento.opcion)
        setCategoriaPrincipal(elemento.categoriaPrincipal)
        setCategoriaSecundaria(elemento.categoriaSecundaria)
        setDescripcion(elemento.descripcion)
        setUbicacion(elemento.ubicacion)
        setId(elemento.id)
    }

    const editarSolicitud = async (e) => {
        e.preventDefault()

        if (!categoriaPrincipal.trim()) {
            setError("Seleccione la categoria principal")
            return
        }
        if (!categoriaSecundaria.trim()) {
            setError("Seleccione la categoria secundaria")
            return
        }
        if (!descripcion.trim()) {
            setError("Ingrese una descripcion")
            return
        }
        if (!ubicacion.trim()) {
            setError("Ingrese la ubicacion donde se prestara el servicio")
            return
        }

        try {
            await db.collection(props.user.email).doc(id).update({
                categoriaPrincipal, categoriaSecundaria, descripcion, ubicacion, fecha
            })
            const listaEditada = lista.map(
                (elemento) => elemento.id === id ? { id: id, categoriaPrincipal: categoriaPrincipal, categoriaSecundaria: categoriaSecundaria, descripcion: descripcion, ubicacion: ubicacion, fecha: fecha } : elemento
            )

            setLista(listaEditada)//Listando nuevos valores
            setModoEdicion(false)
            setIdOpciones(-1)
            setDescripcion('')
            setUbicacion('')
            setError(null)

            console.log("Edicion exitosa")
            alert("Edicion exitosa")

        } catch (error) {
            console.log(error)
        }
    }

    const cancelar = () => {
        setIdOpciones(-1)
        setDescripcion('')
        setUbicacion('')
        setError(null)
    }

    const cancelarEdit = () => {
        setIdOpciones(-1)
        setDescripcion('')
        setUbicacion('')
        setError(null)
        setModoEdicion(!modoEdicion)
    }

    return (
        <div className='container-fluid mt-4'>
            <div className="row">
                <div className="col-12">

                    <form onSubmit={modoEdicion ? editarSolicitud : guardarSolicitud}>

                        {
                            error ? <div className="alert alert-danger" role="alert">
                                <i className='bi bi-exclamation-triangle'> {error}</i>
                            </div> : null
                        }

                        <h3 className='text-center'>{modoEdicion ? 'Editar solicitud' : 'Añadir solicitud'}</h3>

                        <div className="mb-3">
                            <label className='form-label'>Categoria principal:</label>
                            <select name="categoria" id="selectCategoria" className='form-select' onChange={cargarOpciones}>
                                <option value={-1}>Seleccione una opcion</option>
                                {
                                    categorias.map((element, i) => (
                                        <option key={'categoria' + i} value={i}>{element.nombre}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className='form-label'>Categoria secundaria:</label>
                            <select name="opciones" id="selectOpciones" className='form-select' onChange={datosSelect}>
                                <option value={-1}>Seleccione una opcion</option>
                                {
                                    idOpciones > -1 && (
                                        categorias[idOpciones].opciones.map((element, i) => (
                                            <option value={element.opciones} key={'opcion' + i}>{element}</option>
                                        ))
                                    )
                                }
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="" className='form-label'>Descripcion de la solicitud:</label>
                            <input type="text" className='form-control' onChange={(e) => { setDescripcion(e.target.value) }} value={descripcion} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="" className='form-label'>Ubicacion dentro de la empresa:</label>
                            <input type="text" className='form-control' onChange={(e) => { setUbicacion(e.target.value) }} value={ubicacion} />
                        </div>

                        <div className="d-grid gap-2">
                            {
                                modoEdicion ? (<button className='btn btn-warning'>Editar</button>) : (<button className='btn btn-primary'>Guardar</button>)
                            }

                            {
                                modoEdicion ? (<button type='button' className='btn btn-warning' onClick={() => {cancelarEdit()}}>Cancelar Edicion</button>) : (<button type='button' className='btn btn-primary' onClick={()=>cancelar()}>Cancelar</button>)
                            }
                            
                        </div>

                    </form>
                </div>

                <div className="col-12 mt-4">
                    <h3>Mis solicitudes</h3>

                    {
                        lista.map((e) => (
                            <ul className="list-group list-group" key={e.id}>

                                <li className="list-group-item d-flex justify-content-between align-items-start mb-3">
                                    <div className="ms-2 me-auto">

                                        <div className="fw-bold">{e.categoriaPrincipal}</div>
                                        <div className="fw-bold">{e.categoriaSecundaria}</div>
                                        <ul>
                                            <li>
                                                Descripcion: {e.descripcion}
                                            </li>
                                            <li>
                                                Ubicacion: {e.ubicacion}
                                            </li>
                                            <li>
                                                Fecha de solicitud: {e.fecha}
                                            </li>
                                        </ul>

                                    </div>
                                    <div className="d-grid gap-2 d-md-block align-items-end">
                                        <button className="btn btn-danger me-2" type="button" onClick={() => eliminarSolicitud(e.id)}>Eliminar</button>
                                        <button className="btn btn-success" type="button" onClick={() => editar(e)}>Editar</button>
                                    </div>
                                </li>
                            </ul>
                        ))
                    }
                </div>

            </div>
        </div>

    )
}

export default Registro