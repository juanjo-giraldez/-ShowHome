import axios from 'axios'

export default class Services {

    constructor() {
        this._service = axios.create({
            baseURL: `${process.env.REACT_APP_URL}`,
            withCredentials: true 
        })
    }

    getAllSpaces = () => this._service.get('/space/getAllSpaces')
    getOneSpace = id => this._service.get(`/space/${id}`)
    postSpace = space => this._service.post('/space/newSpace', space)
    SpaceEdit = (space, spaceID) => {return this._service.post('/space/edit', { space, spaceID})}
    deleteSpace = (spaceID) => {return this._service.get(`/space/delete/${spaceID}`)}
    joinedSpace = (idSpace, idUser) => this._service.post(`/space/join`, { idSpace, idUser})
    uploadFileCloudinary = theFile => this._service.post('/space/fileUpload', theFile)
}