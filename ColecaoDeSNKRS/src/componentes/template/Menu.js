import './Menu.css';
import React from 'react';
import {Link} from 'react-router-dom';

export default function Menu(props) {
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
            <a href="/login/logout">
                Login/Logout
            </a>
        </nav>
    )
}