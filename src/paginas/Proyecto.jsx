import React, {useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'
import { useAdmin } from '../hooks/useAdmin'
import { AnimacionEspera } from '../components/AnimacionEspera'
import ModalFormularioTarea from '../components/ModalFormularioTarea'
import { Tarea } from '../components/Tarea'
import { ModalEliminarTarea } from '../components/ModalEliminarTarea'
import { Alerta } from '../components/Alerta'
import { Colaborador } from '../components/Colaborador'
import { ModalEliminarColaborador } from '../components/ModalEliminarColaborador'
import io from 'socket.io-client'

let socket



export const Proyecto = () => {
  const params = useParams()
  
  const {obtenerProyecto, proyecto, cargando, handleModalTarea, alerta, submitTareaProyecto, eliminarTareaProyecto, editarTareaProyecto, cambiarEstadoTarea} = useProyectos()
  
  const admin = useAdmin()

  // console.log(admin)

  useEffect(() => {
    obtenerProyecto(params.id)
  }, [])

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit('abrir proyecto', params.id)
  }, [])

  useEffect(() => {
    socket.on('tarea agregada', (tareaNueva) => {
      if (tareaNueva.proyecto === proyecto._id) {
        submitTareaProyecto(tareaNueva)
      }
    })

    socket.on('tarea eliminada', tareaEliminada => {
      if (tareaEliminada.proyecto === proyecto._id) {
        eliminarTareaProyecto(tareaEliminada)
      }
    })

    socket.on('tarea editada', tareaEditada => {
      if (tareaEditada.proyecto._id === proyecto._id) {
        editarTareaProyecto(tareaEditada)
      }
    })

    socket.on('nuevo estado', nuevoEstadoTarea => {
      if (nuevoEstadoTarea.proyecto._id === proyecto._id) {
        cambiarEstadoTarea(nuevoEstadoTarea)
      }
    })

  })
  
  
  
  
  const {nombre} = proyecto
  // console.log(proyecto)

  const {msg} = alerta

  
  
  return (

    msg && alerta.error ?  <Alerta alerta={alerta} /> : (

      cargando ? <AnimacionEspera /> : (
        <>
          <div className='flex justify-between'>
            <h1 className="font-black text-4xl ">{nombre}</h1>

            {admin && (
              <div className='flex items-center gap-2 text-gray-400 hover:text-black'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>

                <Link
                  to={`/proyectos/editar/${params.id }`} 
                  className='uppercase font-bold'
                >
                  Editar
                </Link>
              </div>
            )}

          </div>

          {admin && (
            <button 
              type='button'
              className='text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-5 flex gap-2 items-center justify-center'
              onClick={ handleModalTarea }
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>

              Nueva Tarea
            </button>
          )}

          <p className='font-bold text-xl mt-10'>Tareas del Proyecto</p>

          
          {msg && <Alerta alerta={alerta} />}
          

          <div className='bg-white shadow mt-10 rounded-lg'>
            {proyecto.tareas?.length 
              ? proyecto.tareas?.map( tarea => (
                <Tarea key={tarea._id} tarea={tarea} />
              ))
              : <p className='text-center my-5 p-10'>No hay tareas en este proyecto</p>}
          </div>

          {admin && (
            <div className='flex items-center justify-between mt-10'>
              <p className='font-bold text-xl'>Colaboradores</p>

              <Link
                to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
                className='text-gray-400 hover:text-black uppercase font-bold'
              >
                  Añadir
              </Link>

            </div>
          )}

          <div className='bg-white shadow mt-10 rounded-lg'>
            {proyecto.colaboradores?.length 
              ? proyecto.colaboradores?.map( colaborador => (
                <Colaborador key={colaborador._id} colaborador={colaborador} />
              ))
              : <p className='text-center my-5 p-10'>No hay Colaboradores en este proyecto</p>}
          </div>


          <ModalFormularioTarea />
          <ModalEliminarTarea />
          <ModalEliminarColaborador />
        </>
        
      )

    )
  )
}
