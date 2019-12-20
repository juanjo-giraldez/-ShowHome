import React, { Component } from 'react'
import { Container, Button, Form } from 'react-bootstrap'


import EventsService from '../../service/Events.service'


class EventForm extends Component {

    constructor(props) {
        super(props)
        
        this.EventsService = new EventsService()
        this.state = {
            disabledButton: false,
            buttonText: 'Crear plan',
            event: {
                creator: props.loggedInUser,
                nameEvent: "",
                participant: [],
                category: "Cine",
                email: "",
                town: "",
                capacityPlace: 0,
                description: "",
                imgUrl: ""
            }
        }
    }

    signupFileImage = e => {
        console.log("entra en signupImage")
        const uploadData = new FormData()
        uploadData.append('imgUrl', e.target.files[0])

        this.EventsService.uploadFileCloudinary(uploadData)
            .then(theFile => {
                console.log("respuesta ok de cloudinary", theFile)
                this.setState({
                   disabledButton: false,
                     buttonText: 'Crear plan',
                     event: {
                       ...this.state.event,
                       imgUrl: theFile.data.secure_url
                     }
                })
            })

            .catch(err => console.log('error upload image', err));

        }

    handleSubmit = e => {
        e.preventDefault()
        this.EventsService.postEvent(this.state.event)
            .then(x => {
                this.props.closeModalWindow()
                this.props.updateEventsList()
            })
            
            .catch(err => console.log(err))
        
    }


    handleInputChange = e => {
        let { name, value } = e.target
        this.setState({
            event: { ...this.state.event, [name]: value }
        })
    }

    

    render() {
        return (
          <Container>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Nombre del evento</Form.Label>
                <Form.Control
                  type="text"
                  name="nameEvent"
                  onChange={this.handleInputChange}
                  value={this.state.event.nameEvent}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Evento</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  onChange={this.handleInputChange}
                  value={this.state.event.category}
                >
                  'Cine', 'Música', 'Clases', 'Encuentros', 'Espectaculos'
                  < option value = "Cine" > Cine </option>
                  < option value = "Música" > Música </option>
                  < option value = "Clases" > Clases </option>
                  < option value = "Encuentros" > Encuentros </option>
                  < option value = "Espectaculos" > Espectaculos </option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Descripción:</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  placeholder="Breve descripción del evento"
                  onChange={this.handleInputChange}
                  value={this.state.event.description}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Ciudad:</Form.Label>
                <Form.Control
                  type="text"
                  name="town"
                  placeholder="Madrid"
                  onChange={this.handleInputChange}
                  value={this.state.event.town}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Plazas: </Form.Label>
                <Form.Control
                  type="number"
                  name="capacityPlace"
                  onChange={this.handleInputChange}
                  value={this.state.event.capacityPlace}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Correo electrónico:</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="@dominio.com"
                  onChange={this.handleInputChange}
                  value={this.state.event.email}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Subir imagen </Form.Label>
                <Form.Control
                  type="file"
                  name="imgUrl"
                  onChange = {
                    this.signupFileImage
                  }
                />
              </Form.Group>
              <Button
              className = "button-card "
                variant="dark"
                size="sm"
                type="submit"
                disabled={this.state.disabledButton}
              >
                {this.state.buttonText}
              </Button>
            </Form>
          </Container>
        );
    }
}


export default EventForm