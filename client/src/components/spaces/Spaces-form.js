import React, { Component } from 'react'
import { Container, Button, Form } from 'react-bootstrap'

import SpacesService from '../../service/Spaces.service'


class SpaceForm extends Component {

    constructor(props) {
        super(props)
        this.SpacesService = new SpacesService()
        this.state = {
            disabledButton: false,
            buttonText: 'Crear un espacio',
            space: {
                host: props.loggedInUser,
                nameSpace: "",
                place: "",
                surface: 0,
                capacityPlace: 0,
                description: "",
                town: "",
            }
        }
    }


    handleSubmit = e => {
        e.preventDefault()
        this.SpacesService.postSpace(this.state.space)
            .then(x => {
                this.props.closeModalWindow()
                this.props.updateSpacesList()
            })
            .catch(err => console.log(err))
    }


    handleInputChange = e => {
        let { name, value } = e.target
        this.setState({
            space: { ...this.state.space, [name]: value }
        })
    }

    

    render() {
        return (
            <Container>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label>Nombre del espacio</Form.Label>
                        <Form.Control type="text" name="nameSpace"placeholder="Deja un nombre, se original .." onChange={this.handleInputChange} value={this.state.space.nameSpace} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Lugar</Form.Label>
                        <Form.Control type="text" name="place" placeholder="Lugar de la propiedad, salón , patio , terraza,  etc"onChange={this.handleInputChange} value={this.state.space.place} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Superficie</Form.Label>
                        <Form.Control type="number" name="surface" placeholder="en medtros cuadrados"onChange={this.handleInputChange} value={this.state.space.surface} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Capacidad de aforo</Form.Label>
                        <Form.Control type="number" name="capacityPlace"placeholder="Cuantas personas entran" onChange={this.handleInputChange} value={this.state.space.capacityPlace} />
                </Form.Group>
                    <Form.Group>
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control as="textarea" name="description" placeholder="Caractericas del lugar"onChange={this.handleInputChange} value={this.state.space.description} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Ciudad</Form.Label>
                        <Form.Control type="text" name="town" placeholder="Madrid"onChange={this.handleInputChange} value={this.state.space.town} />
                    </Form.Group>
                <Button variant="dark" size="sm" type="submit" disabled={this.state.disabledButton}>{this.state.buttonText}</Button>
            </Form>
            </Container>
        )
    }
}


export default SpaceForm