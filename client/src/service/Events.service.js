import axios from 'axios'

export default class Services {

    constructor() {
        this._service = axios.create({
            baseURL: `${process.env.REACT_APP_URL}`,
            withCredentials: true // RUTAS PERSISTENTES
        })
    }

    getAllEvents = () => this._service.get('/event/getAllEvents')
    getOneEvent = id => this._service.get(`/event/${id}`)
    postEvent = event => this._service.post('/event/newEvent', event)
    EventEdit = (event, eventID) => {return this._service.post('/event/edit', { event, eventID})}
    deleteEvent = (eventID) => this._service.get(`/event/delete/${eventID}`)
    getOut = (idEvent, idUser) => this._service.post('/event/exitEvent', {idEvent,idUser})
    joinedEvent = (idEvent, idUser) => this._service.post(`/event/join`, {idEvent, idUser})
    selectTheEvent = id => this._service.post('/event/selectEvent',{id})
    uploadFileCloudinary = theFile => this._service.post('/event/fileUpload', theFile)
}
