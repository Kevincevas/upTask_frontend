import React, {useState, useEffect} from 'react'
import {useParams, Link } from 'react-router-dom'
import { Alerta } from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'


export const NuevoPassword = () => {

  const [tokenValido, setTokenValido] = useState(false)
  const [alerta, setAlerta] = useState({})
  const [password, setPassword] = useState('')
  const [passwordModificado, setPasswordModificado] = useState(false)
    
  const params = useParams()
  const {token} = params

  useEffect(() => {

    const comprobarToken = async() => {
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`)
        setTokenValido(true)

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    comprobarToken()


  }, [])

  const {msg} = alerta

  const handleSubmit = async(e) => {
    e.preventDefault()

    if (password.length < 6) {
      setAlerta({
        msg: 'El Password debe ser mínimo de 6 caracteres',
        error: true
      })
      return
    }

    try {
      const {data} = await clienteAxios.post(`/usuarios/olvide-password/${token}`, {password})
      
      setAlerta({
        msg: data.msg,
        error: false
      })
      setPasswordModificado(true)
      
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }


  }
  

  return (
    <>
        <h1 className='text-sky-600 font-black text-6xl capitalize'>Reestablece tu password y no pierdas acceso a tus <span className='text-slate-700'>proyectos</span></h1>

        { msg && <Alerta alerta={alerta} />}

        { tokenValido && (
          <form onSubmit={handleSubmit} className='my-10 bg-white shadow rounded-lg p-10'>
            <div className='my-5'>
                <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor="password">Nuevo Password</label>
                <input 
                  type="password" 
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50" 
                  id='password' 
                  placeholder='Escribe tu nuevo Password' 
                  value={password}
                  onChange={ e => setPassword(e.target.value)}
                />
            </div>

            <input type="submit" className="w-full mb-5 bg-sky-700 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" value={"Guardar nuevo password"} />
          </form>
        )}

        {passwordModificado && (
          <Link to={"/"} className='block text-center my-5 text-slate-500 uppercase text-sm'>
            Inicia Sesión
          </Link>
        )}
    </>
  )
}
