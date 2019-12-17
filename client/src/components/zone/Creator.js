import React from "react";
import EventService from "../../service/Events.service";

import { Container, Row, Button, Modal } from "react-bootstrap";

import EventCard from "../events/Events-card";
import EventForm from "../events/Events-form";

class CreatorProfile extends React.Component {
  // el hijo no puede traer nada del padre sin el props
  constructor(props) {
    super(props);
    this._EventService = new EventService();
    this.state = {
      loggedInUser: props.loggedInUser._id,
      events: [],
      showModalWindow: false
    };
  }

  componentDidMount = () => this.updateEventsList();

  updateEventsList = () => {
    this._EventService
      .getAllEvents()
      .then(allEventsFromDB => {
        let eventlist = allEventsFromDB.data.filter(
          event => this.state.loggedInUser === event.creator
        );
        this.setState({
          events: eventlist
        });
      })
      .catch(err => console.log("Error", err));
  };
  deleteEvent = id => {
    this._EventService
      .deleteEvent(id)
      .then(this.updateEventsList)
  }

  handleShow = () =>
    this.setState({
      showModalWindow: true
    });
  handleClose = () =>
    this.setState({
      showModalWindow: false
    });

  render() {
    return (
      <section>
        <Container>
          <h1> Mis Eventos </h1>
          <Button variant="dark" onClick={this.handleShow}>
            {" "}
            Añadir evento{" "}
          </Button>
          <Row>
            {" "}
            {this.state.events.map(event => (
              < EventCard key = {
                event._id
              } {
                ...event
              }
              updateEventsList = {
                this.updateEventsList
              }
                deleteEvent={
                  this.deleteEvent
                }
              />
            ))}{" "}
          </Row>{" "}
        </Container>

        <Modal show={this.state.showModalWindow} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> Añadir nuevo evento </Modal.Title>{" "}
          </Modal.Header>{" "}
          <Modal.Body>
            <EventForm
              closeModalWindow={this.handleClose}
              updateEventsList={this.updateEventsList}
              loggedInUser={this.state.loggedInUser}
            />{" "}
          </Modal.Body>{" "}
        </Modal>
      </section>
    );
  }
}

export default CreatorProfile;

// import React from "react";

// const Creator = props =>  <h1> Bienvenid @ {props.loggedInUser.username} tu categoria es {props.loggedInUser.role} Kultural</h1>;;

// export default Creator;
