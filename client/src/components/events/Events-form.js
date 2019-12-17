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
                category: "cinema",
                email: "",
                town: "",
                capacityPlace: 0,
                description: ""
            }

        }

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

    // handleFileUpload = e => {
    //     this.setState({ disabledButton: true, buttonText: 'Subiendo imagen...' })

    //     const uploadData = new FormData()
    //     uploadData.append("imageUrl", e.target.files[0])
    //     this._filesService.handleUpload(uploadData)
    //         .then(response => {
    //             console.log('Subida de archivo finalizada! La URL de Cloudinray es: ', response.data.secure_url)
    //             this.setState({
    //                 disabledButton: false,
    //                 buttonText: 'Crear montaña rusa',
    //                 coaster: { ...this.state.coaster, imageUrl: response.data.secure_url }
    //             })
    //         })
    //         .catch(err => console.log(err))
    // }

    render() {
        return (
            <Container>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label>Nombre del evento</Form.Label>
                    <Form.Control type="text" name="nameEvent" onChange={this.handleInputChange} value={this.state.event.nameEvent} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Evento</Form.Label>
                    <Form.Control as="select" name="category" onChange={this.handleInputChange} value={this.state.event.category}>
                    
                        <option value="cinema">Cine en casa</option>
                        <option value="concert">Concierto</option>
                        <option value="monologue">Monólogo</option>
                        <option value="masterClass">Clase magistral</option>
                        <option value="show">Expectáculo</option>

                        </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Descripción</Form.Label>
                        <Form.Control as="textarea" name="description" placeholder="Breve descripción del evento"onChange={this.handleInputChange} value={this.state.event.description} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Ciudad</Form.Label>
                        <Form.Control type="text" name="town" placeholder="Madrid" onChange={this.handleInputChange} value={this.state.event.town} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Capacidad de aforo</Form.Label>
                    <Form.Control type="number" name="capacityPlace" onChange={this.handleInputChange} value={this.state.event.capacityPlace} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control name="email" type="email" placeholder="@dominio.com" onChange={this.handleInputChange} value={this.state.event.email}/>
                </Form.Group>
                <Button variant="dark" size="sm" type="submit" disabled={this.state.disabledButton}>{this.state.buttonText}</Button>
            </Form>
            </Container>
        )
    }
}


export default EventForm