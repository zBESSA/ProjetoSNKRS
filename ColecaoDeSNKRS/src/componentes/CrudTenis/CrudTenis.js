import React, { Component } from 'react';
import './CrudTenis.css';
import Main from '../template/Main';

const title = "Cadastro de Tenis";

const Tenis = [
    { 'id': 1, 'cod': '1111', 'nome': 'Air Force 1', 'tamanho': 42 },
    { 'id': 2, 'cod': '2222', 'nome': 'Jordan 13', 'tamanho': 39 },
    { 'id': 3, 'cod': '3333', 'nome': 'Aunt Pearl', 'tamanho': 35 },
    { 'id': 4, 'cod': '4444', 'nome': 'Cut Out', 'tamanho': 43 },
];

export default class CrudTenis extends Component {
    renderTable() {
        return (
            <div className="listagem">
                <table className="listaTenis" id="tblListaTenis">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTituloCod">Codigo</th>
                            <th className="tabTituloNome">Nome do Sneaker</th>
                            <th className="tabTituloTamanho">Tamanho</th>
                        </tr>
                    </thead>

                    <tbody>
                        {Tenis.map(
                            (tenis) =>
                            <tr key={tenis.id}>
                                <td>{tenis.cod}</td>
                                <td>{tenis.nome}</td>
                                <td>{tenis.tamanho}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        return (
            <Main title={title}>
                {this.renderTable()}
            </Main>
        )
    }
}