import React from "react";
import EventsEdit from "./Events-edit";
import { Col, Button, Modal } from "react-bootstrap";



class EventCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalWindow: false
    };
  }

  handleShow = () => this.setState({ showModalWindow: true });
  handleClose = () => this.setState({ showModalWindow: false });

  render() {


    return (
      <Col className="event-card" md={4}>
        <img src={this.props.imgUrl} alt={"Foto evento"}/>
        <h3>
          <strong>{this.props.nameEvent}</strong>
        </h3>
        <h4>
          <strong>Ciudad:</strong>
          {this.props.town}
        </h4>
        <h5>
          <strong>Categoria:</strong>
          {this.props.category}
        </h5>
        <h5>
          <strong>Superficie: </strong>
          {this.props.surface} metros cuadrados
        </h5>
        <h6>
          <strong>Plazas:</strong>
          {this.props.capacityPlace} personas
        </h6>
        <p className="paragraph">
          <strong>Descripción:</strong>
          {this.props.description}
        </p>
        <br></br>

        <Button className="button-card" variant="dark" onClick={this.handleShow}>
          Editar
        </Button>

        < Button className="btn-top button-card"
          variant="dark"
          onClick={() => this.props.deleteEvent(this.props._id)}
        >
          Eliminar
        </Button>

        <Modal show={this.state.showModalWindow} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Editar espacio</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EventsEdit
              event={this.props}
              updateEventsList={this.props.updateEventsList}
              closeModalWindow={this.handleClose}
            />
          </Modal.Body>
        </Modal>
      </Col>
    );
  }
}

export default EventCard;


