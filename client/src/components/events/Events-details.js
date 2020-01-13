import React, { Component } from "react";
import EventsDetailsService from "../../service/Events.service";
import { Container, Row, Col, Button, Toast } from "react-bootstrap";
import { Link } from "react-router-dom";

class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      event: {},
      showToast: false,
      toastText: '',
      text: '' 
    };
    this._service = new EventsDetailsService();
  }
  
  
  componentDidMount = () => {
    
    const eventId = this.props.match.params.id;
    this._service
    .getOneEvent(eventId)
    .then(theEvent => this.setState({ event: theEvent.data }))
    .then(e => this.changesText())
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
  
  role() {
   let userRole = this.props.loggedInUser.role
     if(userRole === 'creator') { return (this.props.history.push('/profile/creator')) }
     if (userRole === 'host') { return (this.props.history.push('/profile/host')) }
     if (userRole === 'explorer') { return (this.props.history.push('/profile/explorer')) }
  }
  
  
  
  joinThePlan = () => {
    let id = this.props.match.params.id
    let idUser = this.props.loggedInUser._id
    let inclued = this.state.event.participant
    let capacity = this.state.event.capacityPlace
    // inclued.length === capacity ? this.handleToastOpen('Evento completo') :(inclued.includes(idUser)) ? this.handleToastOpen('Ya estas apuntado, consulta tu pérfil') : this._service.joinedEvent(id, idUser).role()
    if (inclued.length === capacity){
      return this.handleToastOpen('Evento completo')
    }else if (inclued.includes(idUser)) { this.handleToastOpen('Ya estas apuntado, consulta tu pérfil')}
   //this.role()
      else{
        this._service.joinedEvent(id, idUser)
        this.role()
      }
    }
  
  
  changesText = () => this.state.event.participant.includes(this.props.loggedInUser._id) ? this.newText('Estas apuntado') : this.newText('Me apunto') 
    newText = (theText) => this.setState({ text: theText })
  


  handleToastClose = () => this.setState({ showToast: false, toastText: '' })
  handleToastOpen = text => this.setState({ showToast: true, toastText: text })
  
  
  render() {
    
    return (
      <Container>
        <section>
          <Row>
            <Col md={6} >
              <img className="event-img" src={this.state.event.imgUrl} alt={'foto de detalles '}></img>
              
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
                <Button className="button-card" variant="dark" onClick={this.joinThePlan}>{this.state.text}</Button> 
              </Row>
              < Row >
              < Link to = "/plans" className = "btn btn-dark button-card btn-top  " > Volver </Link>
              </Row>
            </Col>
            
          </Row>
        </section>

        <Toast
          onClose={this.handleToastClose}
          show={this.state.showToast}
          delay={3000}
          autohide
          style={{
            position: 'fixed',
            right: '10px',
            bottom: '10px',
            minWidth: '250px'
          }}>
          <Toast.Header>
            <strong className="mr-auto">Aviso</strong>
            
          </Toast.Header>
          <Toast.Body>{this.state.toastText}</Toast.Body>
        </Toast>
      </Container>
    );
  }
}

export default EventDetail;
