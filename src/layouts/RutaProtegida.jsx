import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { Header } from '../components/Header'
import { SideBar } from '../components/SideBar'
import { Footer } from '../components/Footer'
import { AnimacionEspera } from '../components/AnimacionEspera'

export const RutaProtegida = () => {

    const {auth, cargando} = useAuth()

    if (cargando) return <AnimacionEspera />

    return(
        <>
            {auth._id ? 
            (
                <div className='bg-gray-100'>
                    <Header />

                    {/* <div className='md:flex md:min-h-screen'> */}
                    <div className='md:flex'>
                        <SideBar />

                        <main className="flex-1 p-10">
                            <Outlet />
                        </main>
                    </div>

                    {/* <Footer /> */}
                </div>
            ): <Navigate to="/" />}
        </>
    )
}
