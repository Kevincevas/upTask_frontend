import React from 'react'
import useProyectos from '../hooks/useProyectos'
import { useAdmin } from '../hooks/useAdmin'


export const Colaborador = ({colaborador}) => {

    const {nombre, email} = colaborador
    const {handleModalEliminarColaborador} = useProyectos()
    const admin = useAdmin()


    return (
        <div className='border-b p-5 flex justify-between items-center'>
            <div>
                <p>{nombre}</p>
                <p className='text-sm text-gray-700'>{email}</p>
            </div>
            {admin && (
                <div>
                    <button type='button' onClick={ () => handleModalEliminarColaborador(colaborador) } className='bg-red-600 px-4 py-3 uppercase font-bold text-sm rounded-lg text-white'>Eliminar</button>
                </div>
            )}
        </div>
    )
}
