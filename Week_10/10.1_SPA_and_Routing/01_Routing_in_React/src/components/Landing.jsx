import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <div style={{ display: "flex", gap: 5, justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <div>Welcome to Allen</div>
            <div style={{ display: "flex", gap: 5 }}>
                <button>
                    <Link to={'/neet/online-coaching-class-11'}>
                        Neet class 11
                    </Link>
                </button>
                <button>
                    <Link to={'/neet/online-coaching-class-12'}>
                        Neet class 12
                    </Link>
                </button>
            </div>
        </div >
    )
}

export default Landing
