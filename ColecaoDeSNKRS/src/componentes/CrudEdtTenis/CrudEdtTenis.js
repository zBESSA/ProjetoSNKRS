import React, { Component } from 'react';
import axios from 'axios';
import './CrudEdtTenis.css';
import Main from '../template/Main';
import UserService from '../../Services/UserService';

const title = "Editar Coleção de Tenis";

const urlAPI = "http://localhost:5174/api/tenis";
const initialState = {
    tenis: {id: 0, cod: '', nome:'', tamanho: 0},
    lista: []
}
const user = JSON.parse(localStorage.getItem('user'))

export default class CrudTenis extends Component {

    state = {...initialState}

    componentDidMount() {
        UserService.getDonoBoard().then(
            (response) => {
                this.setState({ lista: response.data })
            },
            (error) => {
                const _mens =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString()
                this.setState({mens: _mens})
                console.log('_mens: ' + _mens)
            }
        )
    }

    limpar(){
        this.setState({tenis: initialState.tenis});
    }

    salvar(){
        const tenis = this.state.tenis;
        const metodo =  tenis.id ? 'put' : 'post';
        const url = tenis.id ? `${urlAPI}/${tenis.id}` : urlAPI;
        tenis.tamanho = Number(tenis.tamanho)
        tenis.id = Number(tenis.id)
        console.log(this.state.tenis)

        axios[metodo](url, tenis,{headers:{Authorization:'Bearer ' + user.token}})
            .then(resp => {
                const lista = this.getListaAtualizada(resp.data)
                this.setState({tenis: initialState.tenis, lista})
            })
    }

    getListaAtualizada(tenis, add = true){
        const lista = this.state.lista.filter(a => a.id !== tenis.id);
         if(add){
            lista.unshift(tenis);
         }
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

    carregar(tenis){
        this.setState({tenis})
    }

    remover(tenis){
        const url = urlAPI + "/" + tenis.id;
        if(window.confirm("Confirma excluimento do tenis: " + tenis.cod)){
            console.log("entrou no confirm")

            axios['delete'](url, tenis,{headers:{Authorization:'Bearer ' + user.token}})
                .then(resp => {
                    const lista = this.getListaAtualizada(tenis, false)
                    this.setState({tenis: initialState.tenis, lista})
                })
        }
    }

    renderForm(){
        return(
            <div className='inclui-container'>
                <label>Codigo</label>
                <input
                    type='text'
                    id='cod'
                    placeholder='Cod do Tênis'
                    className='form-input1'
                    name='cod'
                    value={this.state.tenis.cod}
                    onChange={e => this.atualizaCampo(e)}
                />
                <label>Nome</label>
                <input
                    type='text'
                    id='nome'
                    placeholder='Nome do Tênis'
                    className='form-input2'
                    name='nome'
                    value={this.state.tenis.nome}
                    onChange={e => this.atualizaCampo(e)}
                /> 
                <label>Tamanho</label>
                <input
                    type='text'
                    id='tamanho'
                    placeholder='Tamanho do Tênis'
                    className='form-input'
                    name='tamanho'
                    value={this.state.tenis.tamanho}
                    onChange={e => this.atualizaCampo(e)}
                />
                <button className='btnSalvar'
                    onClick={e => this.salvar(e)}>
                        Salvar
                </button>
                <button className="btnCancelar"
                    onClick={e => this.limpar(e)} >
                        Cancelar
                </button>
            </div>
        )
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
                                <td>
                                    <button onClick={() => this.carregar(tenis)}>
                                        Altera
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => this.remover(tenis)}>
                                        Remove
                                    </button>
                                </td>
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
                {console.log(this.state.mens)}
                {
                    (this.state.mens != null) ? 'Problema com conexão ou autorização (contactar administrador).' :
                    <>
                        {this.renderForm()}
                        {this.renderTable()}
                    </> 
                }
            </Main>
        )
    }
}