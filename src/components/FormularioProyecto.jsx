import React, {useState, useEffect} from 'react'
import useProyectos from '../hooks/useProyectos'
import { Alerta } from './Alerta'
import { Link, useParams } from 'react-router-dom'

export const FormularioProyecto = () => {

    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cliente, setCliente] = useState('')

    const params = useParams()
    const {mostrarAlerta, alerta, submitProyecto, proyecto} = useProyectos()
    
    useEffect(() => {
      if (params.id) {
        setId(proyecto._id)
        setNombre(proyecto.nombre)
        setDescripcion(proyecto.descripcion)
        setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
        setCliente(proyecto.cliente)
      }
    }, [params])
    


    const handleSubmit = async e => {
        e.preventDefault()

        if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })

            return
        }

        // Pasar los datos hacia el provider
        await submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente })

        setId(null)
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')


    }

    const {msg} = alerta


    return (
        <form onSubmit={handleSubmit} className="bg-white py-5 px-5 md:w-1/2 rounded-lg shadow ">

            {msg && <Alerta alerta={alerta} />}

            <div className="mb-5">
                <label 
                    htmlFor="nombre" 
                    className='text-gray-700 uppercase font-bold text-sm'
                >
                    Nombre Proyecto
                </label>
                <input
                    id='nombre'
                    type="text" 
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                    placeholder='Nombre del Proyecto'
                    value={nombre}
                    onChange={ e => setNombre(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label 
                    htmlFor="descripcion" 
                    className='text-gray-700 uppercase font-bold text-sm'
                >
                    Descripción Proyecto
                </label>
                <textarea
                    id='descripcion'
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                    placeholder='Descripción del Proyecto'
                    value={descripcion}
                    onChange={ e => setDescripcion(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label 
                    htmlFor="fecha-entrega" 
                    className='text-gray-700 uppercase font-bold text-sm'
                >
                    Fecha Entrega
                </label>
                <input
                    id='fecha-entrega'
                    type="date" 
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                    value={fechaEntrega}
                    onChange={ e => setFechaEntrega(e.target.value)}
                />
            </div>

            <div className="mb-5">
                <label 
                    htmlFor="cliente" 
                    className='text-gray-700 uppercase font-bold text-sm'
                >
                    Nombre Cliente
                </label>
                <input
                    id='cliente'
                    type="text" 
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                    placeholder='Nombre del Cliente'
                    value={cliente}
                    onChange={ e => setCliente(e.target.value)}
                />
            </div>

            <input 
                type="submit"
                value={id ? 'Actualizar Proyecto': 'Crear Proyecto'}
                className="block bg-sky-600 w-full p-3 uppercase font-bold resize-y text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
            />
            
            <Link to={'/proyectos'} className="block bg-red-600 w-full p-3 mt-1 text-center uppercase font-bold text-white rounded cursor-pointer hover:bg-red-700 transition-colors">
                Cancelar
            </Link>
            
        </form>

    )
}