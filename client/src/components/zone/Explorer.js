import React from "react";
import EventService from "../../service/Events.service";
import EventSelect from "../events/Events-card-mySelect";
import { Container, Row, Col} from "react-bootstrap";







class ExplorerProfile extends React.Component {
  // el hijo no puede traer nada del padre sin el props
  constructor(props) {
    super(props);
    console.log(props)
   
    this._EventService = new EventService();
    this.state = {
      loggedInUser: props.loggedInUser._id,
      
      eventsSelect: [], 
    };
}
      
componentDidMount = () => this.updateEventsList();
updateEventsList = () => {
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
      
        deleteSelect = (id) => {
          console.log("soy el delete")
    
          let idUser = this.props.loggedInUser._id
          this._EventService
          .getOut(id, idUser)
          .then(this.updateEventsList)
    }
    
    
    render() {
      
      return (
        <section>
          <Container>
            <Row>
              <Col md={6}>
                <h2> Usuario: {this.props.loggedInUser.username}</h2>
                <h4> Nombre: {this.props.loggedInUser.firtName}</h4>
                <h4> Apellidos: {this.props.loggedInUser.lastName}</h4>
                <h4> Gustos y preferencias: {this.props.loggedInUser.category}</h4>
              </Col>
              <Col md={6}>
                <img
                  src={this.props.loggedInUser.imgUrl}
                  alt={"Foto usuario"}
                />
              </Col>
            </Row>
            <Row></Row>

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
        </section>
      );
    }
  }
  
  export default ExplorerProfile;

  
    
    

      
      
      



 



     

    
     
    
