import React, { Component } from 'react';
import axios from 'axios';
import './CrudTenis.css';
import Main from '../template/Main';
import UserService from '../../Services/UserService';

const title = "Coleção de Tenis";

const urlAPI = "http://localhost:5174/api/tenis";
const initialState = {
    tenis: {id: 0, cod: '', nome:'', tamanho: 0},
    lista: []
}

const user = JSON.parse(localStorage.getItem("user"));

export default class CrudTenis extends Component {

    state = {...initialState}

    componentDidMount(){
        UserService.getColecionadorBoard()
        .then(response =>{
                this.setState({lista: response.data});
            },
            (error) => {
                const _mens = (
                    error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
                    this.setState({mens : _mens});
            }
        );
    }

    limpar(){
        this.setState({tenis: initialState.tenis});
    }

    salvar(){
        const tenis = this.state.tenis;
        tenis.cod = Number(tenis.cod);
        const metodo = 'post';

        axios[metodo](urlAPI, tenis)
            .then(resp => {
                const lista = this.getListaAtualizada(resp.data)
                this.setState({tenis: initialState.tenis, lista})
            })
    }

    getListaAtualizada(tenis){
        const lista = this.state.lista.filter(a => a.id !== tenis.id);
        lista.unshift(tenis);
        return lista;
    }

    atualizaCampo(event){
        //clonar usuário a partir do state, para não alterar o state diretamente
        const tenis = {...this.state.tenis};
        //usar o atributo NAME do input para identificar o campo a ser atualizado
        tenis[event.target.name] = event.target.value;
        //atualizar o state
        this.setState({tenis});
    }


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
                    {this.state.lista.map(
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
                {
                    (this.state.mens != null) ? 'Problema com conexão ou autorização (contactar administrador).' :
                    <>
                        {this.renderTable()}
                    </> 
                }
            </Main>
        )
    }
}