import React, { useEffect, useState } from "react";
import {Routes, Route} from "react-router-dom";
import Main from "./componentes/template/Main";
import CrudTenis from "./componentes/CrudTenis/CrudTenis";
import CrudEdtTenis from "./componentes/CrudEdtTenis/CrudEdtTenis"
import AuthService from "./Services/AuthService";
import Login from "./componentes/Login/Login";
import Logout from "./componentes/Logout/Logout";

export default function Rotas() {
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() =>{
        const user = AuthService.getCurrentUser();
        if(user){
            setCurrentUser(user);
        }
    }, []);

    return (
        <Routes>
            <Route exact path='/'
                element={
                    <Main title="Bem Vindo!">
                        <div className="cssRotas">Cadastro de tenis, Edição coleção e Login/Logout 👟😁</div>
                    </Main> }
        />
            <Route path='/tenis' element={<CrudTenis />} />
            <Route path='/editar' element={<CrudEdtTenis />} />
            <Route path='*' element={
                <Main title="Bem Vindo!">
                    <div>Página não encontrada</div>
                </Main>} />
                {currentUser ?(
                    <Route exact path='/tenis'
                        element={<CrudTenis/>}
                    />
                ) : (
                    <Route exact path='/tenis'
                        element={
                            <Main title="Cadastro de Tenis">
                                <div>Não autorizado!</div>
                            </Main>
                        }
                    />
                )}
                {currentUser ? (
                    <Route exact path='/editar'
                        element={
                            <Main title="Editar">
                                <div>Página de Edição...</div>
                            </Main>
                        }
                    />
                ) : (
                    <Route exact path='/editar'
                        element={
                            <Main title="editar">
                                <div>Não autorizado!</div>
                            </Main>
                        }
                    />
                )}

                <Route path='/login' element={<Login />} />
                <Route path='/logout' element={<Logout />} />
                <Route path="*" to='/' />

        </Routes>
    )
}