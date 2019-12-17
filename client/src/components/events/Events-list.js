import React from "react";
import EventService from "../../service/Events.service";

import { Container, Row,} from "react-bootstrap";

import EventCardPlans from "./Events-card-plans";


class EventList extends React.Component {
  // el hijo no puede traer nada del padre sin el props
  constructor(props) {
    super(props);
    
    this._EventService = new EventService();
    this.state = {
      loggedInUser: props.loggedInUser,
      events: [],
      showModalWindow: false
    };
  }
  componentDidMount = () => this.updateEventsList();

  updateEventsList = () => {
    
    this._EventService
      .getAllEvents()
      .then(allEventsFromDB => this.setState({ events: allEventsFromDB.data }))
      .catch(err => console.log("Error", err));
  };

deleteEvent = id => {
  this._EventService
    .deleteEvent(id)
    .then(this.updateEventsList)
}
 



  

  handleShow = () => this.setState({ showModalWindow: true });
  handleClose = () => this.setState({ showModalWindow: false });

  render() {
    return (
      <section>
        <Container>
          <h1>Este son los planes , mira y unete alguno... </h1>

          {/* <Button variant="dark" onClick={this.handleShow}>Añadir evento</Button> */}

          <Row>
            {this.state.events.map(event => (
              < EventCardPlans
                key={event._id}
                {...event}
                updateEventsList={this.updateEventsList}
                
              />
            ))}
          </Row>
        </Container>

        
      </section>
    );
  }
}

export default EventList;
