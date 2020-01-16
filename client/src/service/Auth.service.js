import axios from 'axios'

export default class Services {

    constructor() {
        this._service = axios.create({
            baseURL: `${process.env.REACT_APP_URL}`,
            withCredentials: true 
        })
    }

    signup = (username, password, firstName, lastName, role, category, imgUrl) => this._service.post('/auth/signup', {
        username,
        password,
        firstName,
        lastName,
        role,
        category,
        imgUrl

    })
    login = (username, password) => this._service.post('/auth/login', { username,password})
    logout = () => this._service.post('/auth/logout')
    loggedin = () => this._service.get('/auth/loggedin')
    uploadCloudinary = theFile => this._service.post('/auth/upload', theFile)
}