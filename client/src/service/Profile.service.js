import axios from 'axios'

export default class Services {

    constructor() {
        this._service = axios.create({
            baseURL: 'http://localhost:5000/api/auth',
            withCredentials: true   // RUTAS PERSISTENTES
        })
    }

       getOneProfile = id => this._service.get(`/${id}`)

}