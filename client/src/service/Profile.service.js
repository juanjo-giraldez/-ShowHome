import axios from 'axios'

export default class Services {

    constructor() {
        this._service = axios.create({
            baseURL: `${process.env.REACT_APP_URL}`,
            withCredentials: true   // RUTAS PERSISTENTES
        })
    }

       getOneProfile = id => this._service.get(`/auth/${id}`)

}