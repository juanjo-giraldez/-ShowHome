import React from "react";
import EventService from "../../service/Events.service";

import { Container, Row, Button, Modal , Col} from "react-bootstrap";

import EventCard from "../events/Events-card";

import EventSelect from "../events/Events-card-mySelect";
import EventForm from "../events/Events-form";


class CreatorProfile extends React.Component {
  // el hijo no puede traer nada del padre sin el props
  constructor(props) {
    super(props);
   
    this._EventService = new EventService();
    this.state = {
      loggedInUser: props.loggedInUser._id,
      events: [],
      eventsSelect: [], 
      
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
      
      let idAll = this.props.loggedInUser && this.props.loggedInUser._id
      
      this._EventService
      .selectTheEvent(idAll)
      .then(allEventsFromDB => {
        
        
        this.setState({
          eventsSelect: allEventsFromDB.data
        });
        
      })
      
      .catch(err => console.log("Error", err));
    };
    
    
    deleteEvent = id => {
      this._EventService
      .deleteEvent(id)
      .then(this.updateEventsList)
    }
    
    deleteSelect = (id) => {
      console.log("soy el delete")
      
      let idUser = this.props.loggedInUser._id
      this._EventService
      .getOut(id, idUser)
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
              <Row>
              <Col md={6}>
                <div className="row justify-content-center align-items-center ">
                <img  src={this.props.loggedInUser.imgUrl} alt={"Foto usuario"}
                />
                </div>
              </Col>
                <Col md={6}>
                <h2> Usuario: {this.props.loggedInUser.username}</h2>
                <h4> Nombre: {this.props.loggedInUser.firstName}</h4>
                <h4> Apellidos: {this.props.loggedInUser.lastName}</h4>
                <h4> Gustos y preferencias: {this.props.loggedInUser.category}</h4>
              </Col>
            </Row>
              
              <hr></hr>
              <h1> Mis Eventos </h1>
              < Button 
              variant = "dark"
              onClick = {
                this.handleShow
              } >
                {" "}
                Añadir evento{" "}
              </Button>
              <Row>
                {this.state.events.map(event => (
                  <EventCard
                    key={event._id}
                    {...event}
                    updateEventsList={this.updateEventsList}
                    deleteEvent={this.deleteEvent}
                  />
                ))}
              </Row>
              <hr></hr>
              <h2> Mis planes seleccionados </h2>
              <Row>
                {this.state.eventsSelect.map(event => (
                  <EventSelect
                    key={event._id}
                    {...event}
                    updateEventsList={this.updateEventsList}
                    deleteSelect={this.deleteSelect}
                  />
                ))}
              </Row>
            </Container>

            <div>
              <Modal 
                show={this.state.showModalWindow}
                onHide={this.handleClose}
              >
                < Modal.Header closeButton>
                  <Modal.Title> Añadir nuevo evento </Modal.Title>
                </Modal.Header>
                < Modal.Body>
                  <EventForm
                    closeModalWindow={this.handleClose}
                    updateEventsList={this.updateEventsList}
                    loggedInUser={this.state.loggedInUser}
                  />
                </Modal.Body>
              </Modal>
            </div>
          </section>
        );
      }
    }
    
    export default CreatorProfile;

  



