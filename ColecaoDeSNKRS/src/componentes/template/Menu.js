import './Menu.css';
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../../Services/AuthService';

export default function Menu(_props) {
    const [currentUser, setCurrentUser] = useState(undefined)

    useEffect(() => {
        const user = AuthService.getCurrentUser()
        if (user){
            setCurrentUser(user)
        }
    })
    return(
        <nav className='menu'>
            <a href="/tenis">
                Coleção
            </a>
            <div className='espaco'></div>
            <a href="/editar">
                Editar Coleção
            </a>
            <div className='espaco'></div>
            
            {currentUser ? (
                <Link to="/logout">
                    Logout
                </Link>
            ) : (
                <Link to="/login">
                    Login
                </Link>
            )}
        </nav>
    )
}