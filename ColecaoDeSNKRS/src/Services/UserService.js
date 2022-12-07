import axios from "axios";

const API_URL = "http://localhost:5174/api/";
const user = JSON.parse(localStorage.getItem('user'));

const getPublicContent = () => {
    //return axios.get(API_URL + "tenis");
};

const getDonoBoard = async () => {
    return await axios.get(API_URL + "Tenis", {headers: {Authorization: 'Bearer ' + user.token}});
};

const getColecionadorBoard = async () => {
    return await axios.get(API_URL + "Colecao", {headers: {Authorization: 'Bearer ' + user.token}});
};

const UserService = {
    getPublicContent,
    getColecionadorBoard,
    getDonoBoard
};

export default UserService;