import React, { Component } from "react";
import EventsDetailsService from "../../service/Events.service";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.state =  {event: {} };
    this._service = new EventsDetailsService();
  }
  
  
  
  componentDidMount = () => {
    
    const eventId = this.props.match.params.id;
    this._service
    .getOneEvent(eventId)
    .then(theEvent => this.setState({ event: theEvent.data }))
    .catch(err => console.log(err));
  };
  
  updateEventsList = () => {
    this._service
    .getAllEvents()
    .then(allEventsFromDB => this.setState({
      events: allEventsFromDB.data
    }))
    .catch(err => console.log("Error", err));
  };
  
  
  
  
  
  joinThePlan = () => {
    let id = this.props.match.params.id
    let idUser = this.props.loggedInUser._id
    this._service.joinedEvent(id, idUser)
    let userRole = this.props.loggedInUser.role
    if (userRole === 'creator') {return (this.props.history.push('/profile/creator'))}
    if (userRole === 'host') {return (this.props.history.push('/profile/host'))}
    if (userRole === 'explorer') {return (this.props.history.push('/profile/explorer'))}
    }
    

  render() {
    
    
    return (
      <Container>
        <section>
          <Row>
            <Col md={6}>
              <img src={this.state.event.imgUrl} alt={'foto de detalles '}></img>
              
            </Col>
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
                <strong>Plazas:</strong> {this.state.event.capacityPlace} personas|
                <strong>Correo eletrónico</strong> {this.state.event.email}

              
              </p>
               < Row >
              <Button className="button-card"variant="dark" onClick={this.joinThePlan}>Me apunto</Button> 
              </Row>
              < Row >
              < Link 
              to = "/plans"
              className = "btn btn-dark button-card btn-top  " > Volver </Link>
              </Row>
            </Col>
            
          </Row>
        </section>
      </Container>
    );
  }
}

export default EventDetail;
