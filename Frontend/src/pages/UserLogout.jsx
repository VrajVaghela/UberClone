import React, { useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'

const UserLogout = () => {
    const navigate = useNavigate()
    const { setUser } = useContext(UserDataContext)
    
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
            return
        }

        const logout = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/users/logout`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                if (response.status === 200) {
                    localStorage.removeItem('token')
                    setUser(null)
                    navigate('/login')
                }
            } catch (error) {
                console.error('Logout failed:', error)
                localStorage.removeItem('token')
                navigate('/login')
            }
        }

        logout()
    }, [navigate, setUser])

    return (
        <div className="flex items-center justify-center h-screen">
            <p>Logging out...</p>
        </div>
    )
}

export default UserLogout