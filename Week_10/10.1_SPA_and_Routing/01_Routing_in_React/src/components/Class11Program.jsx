import React from 'react'
import { useNavigate } from 'react-router-dom'

const Class11Program = () => {
    const navigate = useNavigate();

    const redirectUser = () => navigate('/');

    return (
        <div>
            NEET Programs for class 11th
            <button onClick={redirectUser}>Back to Landing</button>
        </div>
    )
}

export default Class11Program
