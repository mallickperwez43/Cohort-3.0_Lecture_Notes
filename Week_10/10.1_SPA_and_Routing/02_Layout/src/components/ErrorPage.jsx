import React from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
    const navigate = useNavigate();

    const backHome = () => navigate('/')

    return (
        <div>
            <p> Sorry, page not found</p>
            <button onClick={backHome}>Back to Home</button>
        </div>
    )
}

export default ErrorPage
