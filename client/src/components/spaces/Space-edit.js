import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import SpacesEditService from '../../service/Spaces.service'



class SpaceForm extends Component {

    constructor(props) {
        super(props)
        this.service = new SpacesEditService()
        this.state = {
                hostedEvent: this.props.space.hostedEvent,
                nameSpace: this.props.space.nameSpace,
                place: this.props.space.place,
                surface: this.props.space.surface,
                capacityPlace: this.props.space.capacityPlace,
                description: this.props.space.description,
                town: this.props.space.town
        }
    }


    handleSubmit = e => {
        e.preventDefault();
        this.service
            .SpaceEdit(this.state, this.props.space._id)
            .then(theEditedSpace => {

                this.props.updateSpacesList(this.state);
                this.props.closeModalWindow();
                // this.props.history.push("/edit");
            })
            .catch(err => console.log(err));
    };


    handleInputChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
    };

    

    render() {
        return (
            
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label>Nombre del espacio</Form.Label>
                        <Form.Control type="text" name="nameSpace" placeholder="Deja un nombre, se original .." onChange={this.handleInputChange} value={this.state.nameSpace} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Lugar</Form.Label>
                        <Form.Control type="text" name="place" placeholder="Lugar de la propiedad, salón , patio , terraza,  etc"onChange={this.handleInputChange} value={this.state.place} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Superficie</Form.Label>
                        <Form.Control type="number" name="surface" placeholder="en metros cuadrados"onChange={this.handleInputChange} value={this.state.surface} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Capacidad de aforo</Form.Label>
                        <Form.Control type="number" name="capacityPlace" placeholder="Cuantas personas entran" onChange={this.handleInputChange} value={this.state.capacityPlace} />
                </Form.Group>
                    <Form.Group>
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control as="textarea" name="description" placeholder="Caractericas del lugar"onChange={this.handleInputChange} value={this.state.description} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Ciudad</Form.Label>
                        <Form.Control type="text" name="town" placeholder="Madrid"onChange={this.handleInputChange} value={this.state.town} />
                    </Form.Group>
                <Button variant="dark" size="sm" type="submit" disabled={this.state.disabledButton}>Edita un espacio</Button>
            </Form>
            
        )
    }
}


export default SpaceForm