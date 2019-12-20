import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import EventEditService from "../../service/Events.service";
// import FilesService from '../../service/Files.service'

class EventEdit extends Component {
  constructor(props) {
    super(props);
    this.service = new EventEditService();
    this.state = {
      nameEvent: this.props.event.nameEvent,
      category: this.props.event.category,
      email: this.props.event.email,
      town: this.props.event.town,
      capacityPlace: this.props.event.capacityPlace,
      description: this.props.event.description
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.service
      .EventEdit(this.state, this.props.event._id)
      .then(theEditedEvent => {
        
        this.props.updateEventsList(this.state);
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
          <Form.Label>Nombre del evento</Form.Label>
          <Form.Control
            type="text"
            name="nameEvent"
            onChange={this.handleInputChange}
            value={this.state.nameEvent}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Evento</Form.Label>
          <Form.Control
            type="text"
            name="category"
            onChange={this.handleInputChange}
            value={this.state.category}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            onChange={this.handleInputChange}
            value={this.state.description}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Ciudad</Form.Label>
          <Form.Control
            type="text"
            name="town"
            onChange={this.handleInputChange}
            value={this.state.town}
          />
        </Form.Group>
        <Form.Group>
          < Form.Label > Plazas </Form.Label>
          <Form.Control
            type="number"
            name="capacityPlace"
            onChange={this.handleInputChange}
            value={this.state.capacityPlace}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={this.handleInputChange}
            value={this.state.email}
          />
        </Form.Group>

        <Button
          variant="dark"
          size="sm"
          type="submit"
          disabled={this.state.disabledButton}
        >
          Editar plan
        </Button>
      </Form>
    );
  }
}
export default EventEdit;
