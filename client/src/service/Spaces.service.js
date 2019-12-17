import axios from 'axios'

export default class Services {

    constructor() {
        this._service = axios.create({
            baseURL: 'http://localhost:5000/api/space',
            withCredentials: true // RUTAS PERSISTENTES
        })
    }

    getAllSpaces = () => this._service.get('/getAllSpaces')
    getOneSpace = id => this._service.get(`/${id}`)
    postSpace = space => this._service.post('/newSpace', space)
    SpaceEdit = (space, spaceID) => {return this._service.post('/edit', { space, spaceID})}
    deleteSpace = (spaceID) => {return this._service.get(`/delete/${spaceID}`)}
}