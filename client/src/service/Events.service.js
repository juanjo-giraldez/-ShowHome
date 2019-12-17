import axios from 'axios'

export default class Services {

    constructor() {
        this._service = axios.create({
            baseURL: 'http://localhost:5000/api/event',
            withCredentials: true // RUTAS PERSISTENTES
        })
    }

    getAllEvents = () => this._service.get('/getAllEvents')
    getOneEvent = id => this._service.get(`/${id}`)
    postEvent = event => this._service.post('/newEvent', event)
    EventEdit = (event, eventID) => {return this._service.post('/edit', { event, eventID})}
    deleteEvent = (eventID) => this._service.get(`/delete/${eventID}`)
}