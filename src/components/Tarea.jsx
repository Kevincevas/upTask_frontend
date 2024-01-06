import React from 'react'
import { formatearFecha } from '../helpers/formatearFecha'
import useProyectos from '../hooks/useProyectos'
import { useAdmin } from '../hooks/useAdmin'



export const Tarea = ({tarea}) => {

    const {handleModalEditarTarea, handleModalEliminarTarea, completarTarea} = useProyectos()

    const {nombre, descripcion, prioridad, _id, estado, fechaEntrega} = tarea

    const admin = useAdmin()
    // console.log(tarea)
    

    return (
        <>
            <div className='border-b p-5 flex justify-between items-center'>
                <div className='flex flex-col items-start md:w-3/4'>
                    <p className='mb-1text-xl'>{nombre}</p>
                    <p className='mb-1text-sm text-gray-500 uppercase'>{descripcion}</p>
                    <p className='mb-1text-sm'>{formatearFecha(fechaEntrega)}</p>
                    <p className='mb-1text-xl text-gray-600'>Prioridad: {prioridad}</p>
                    {estado && <p className='text-xs bg-green-600 uppercase p-1 rounded-lg text-white'>Completada por: {tarea.completado?.nombre}</p>}
                </div>

                <div className='flex flex-col lg:flex-row gap-2'>
                    {admin && (
                        <button className='bg-indigo-600 px-4 py-3 text-white uppercase font-bold rounded-lg' onClick={ () => handleModalEditarTarea(tarea) }>
                            Editar
                        </button>
                    )}
                    
                    <button onClick={ () => completarTarea(_id)} className={`${estado ? 'bg-sky-600' : 'bg-gray-600'} px-4 py-3 text-white uppercase font-bold rounded-lg`}>
                            {estado ? 'Completa' : 'Incompleta'}
                    </button>

                    {admin && (
                        <button onClick={ () => handleModalEliminarTarea(tarea) } className='bg-red-600 px-4 py-3 text-white uppercase font-bold rounded-lg'>
                            Eliminar
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}
