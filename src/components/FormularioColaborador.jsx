import React, {useState} from 'react'
import useProyectos from '../hooks/useProyectos'
import { Alerta } from './Alerta'


export const FormularioColaborador = () => {

    const [email, setEmail] = useState('')

    const {mostrarAlerta, alerta, submitColaborador} = useProyectos()

    const handleSubmit = e => {
        e.preventDefault()

        if (email === '') {
            mostrarAlerta({
                msg: 'El Email es Obligatorio',
                error: true
            })
            return
        }

        submitColaborador(email)

    }

    const {msg} = alerta

    return (
        <form action="" onSubmit={handleSubmit} className='bg-white py-10 px-5 w-full md:w-3/4 rounded-lg shadow'>
            {msg && <Alerta alerta={alerta} />}
            <div className='mb-5'>
                <label 
                    htmlFor="email" 
                    className='text-gray-700 uppercase font-bold text-sm'>Email Colaborador</label>

                <input 
                    type="email" 
                    id='email' 
                    placeholder='Email del Usuario' 
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
                    value={email}
                    onChange={ e => setEmail(e.target.value) }
                />
            </div>

            <input 
                className='bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm'
                type="submit" 
                value={'Buscar Colaborador'}
            />
            
        </form>        
    )
}
