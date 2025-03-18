import React, { useEffect, useContext } from 'react'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {
    const navigate = useNavigate()
    const { setCaptain } = useContext(CaptainDataContext)
    
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/captain-login')
            return
        }

        const logout = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/captains/logout`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                if (response.status === 200) {
                    localStorage.removeItem('token')
                    setCaptain(null)
                    navigate('/captain-login')
                }
            } catch (error) {
                console.error('Logout failed:', error)
                navigate('/captain-login')
            }
        }

        logout()
    }, [navigate, setCaptain])

    return (
        <div className="flex items-center justify-center h-screen">
            <p>Logging out...</p>
        </div>
    )
}

export default CaptainLogout