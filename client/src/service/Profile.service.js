import axios from 'axios'

export default class Services {

    constructor() {
        this._service = axios.create({
            baseURL: `${process.env.REACT_APP_URL}`,
            withCredentials: true   
        })
    }

       getOneProfile = id => this._service.get(`/auth/${id}`)

}