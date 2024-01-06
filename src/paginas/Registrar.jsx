import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { Alerta } from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'

export const Registrar = () => {

    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')
    const [alerta, setAlerta] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault();

        if ([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({
                msg: 'Todos lo campos son obligatorios',
                error:true
            })
            return
        }

        if (password !== repetirPassword) {
            setAlerta({
                msg: 'Los Passwords no son iguales',
                error:true
            })
            return
        }

        if (password.length < 6) {
            setAlerta({
                msg: 'El Password es muy corto, agrega mínimo 6 caracteres',
                error:true
            })
            return
        }

        setAlerta({})

        //Crear usuario en la api

        try {
            const {data} = await clienteAxios.post(`/usuarios`, {nombre, email, password})
            setAlerta({
                msg: data.msg,
                error: false
            })

            setNombre('')
            setEmail('')
            setPassword('')
            setRepetirPassword('')

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }

    }

    const { msg } = alerta

    return (
        <>
            <h1 className='text-sky-600 font-black text-6xl capitalize'>Registrate y administra tus <span className='text-slate-700'>proyectos</span></h1>

            {msg && <Alerta alerta={alerta}/>}

            <form onSubmit={handleSubmit} action="" className='my-10 bg-white shadow rounded-lg p-10'>
                <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor="nombre">Nombre</label>
                    <input type="text" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" id='nombre' value={nombre} onChange={e => setNombre(e.target.value)} placeholder='Nombre de registro' />
                </div>

                <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor="email">Email</label>
                    <input type="email" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" id='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Email de registro' />
                </div>

                <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor="password">Password</label>
                    <input type="password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" id='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Password de registro' />
                </div>

                <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor="password2">Repetir Password</label>
                    <input type="password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" id='password2' value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)} placeholder='Repite tu password' />
                </div>

                <input type="submit" className="w-full mb-5 bg-sky-700 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" value={"Crear cuenta"} />

            </form>

            <nav className="lg:flex lg:justify-between">
                <Link to={"/"} className='block text-center my-5 text-slate-500 uppercase text-sm'>
                    ¿Ya tienes cuenta? Inicia Sesión
                </Link>

                <Link to={"/olvide-password"} className='block text-center my-5 text-slate-500 uppercase text-sm'>
                    Olvide mi Password
                </Link>
            </nav>

        </>
    )
}
