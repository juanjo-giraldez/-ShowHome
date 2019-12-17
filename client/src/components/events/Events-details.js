import React, { Component } from "react";
import EventsDetailsService from "../../service/Events.service";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { event: {} };
    this._service = new EventsDetailsService();
    console.log(this.state);
  }

  componentDidMount = () => {
    console.log(this.props);
    const eventId = this.props.match.params.id;
    this._service
      .getOneEvent(eventId)
      .then(theEvent => this.setState({ event: theEvent.data }))
      .catch(err => console.log(err));
  };

joinThePlan = () => {
  alert('con este botón me apunto a este plan')
}


  render() {
    return (
      <Container>
        <section>
          <Row>
            <Col md={6}>
              <h1> {this.state.event.nameEvent}</h1>
              <h3>
                <strong>Ciudad: </strong> {this.state.event.town}
              </h3>
              <p>
                <strong>Descripción:</strong> {this.state.event.description}
              </p>
              <hr></hr>
              <p>
                <strong>Aforo:</strong> {this.state.event.capacityPlace} personas|{" "}
                <strong>Superficie:</strong> {this.state.event.surface}
              </p>
              <Link to="/profile" className="btn btn-dark">
                Volver
              </Link>
            </Col>
            <Col md={{ span: 4, offset: 2 }}>
              {/* <img src={this.state.event.imageUrl} alt={this.state.event.nameEvent}></img> */}
              <Button variant="dark" onClick={this.joinThePlan}>
                Me apunto
              </Button>
            </Col>
          </Row>
        </section>
      </Container>
    );
  }
}

export default EventDetail;
