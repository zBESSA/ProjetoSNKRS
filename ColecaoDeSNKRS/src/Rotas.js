import React from "react";
import {Routes, Route} from "react-router-dom";
import Main from "./componentes/template/Main";
import CrudTenis from "./componentes/CrudTenis/CrudTenis";
import CrudEdtTenis from "./componentes/CrudEdtTenis/CrudEdtTenis"

export default function Rotas() {
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
        </Routes>
    )
}