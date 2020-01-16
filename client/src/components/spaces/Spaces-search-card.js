import React from "react";
// import { Link } from "react-router-dom";
import SpaceService from "../../service/Spaces.service"

import { Col, Button} from "react-bootstrap";

class SpaceSearchCards extends React.Component {
  constructor(props) {
    super(props);
    this._service = new SpaceService();
  }

  joinSpace = () => {
    let id = this.props._id
    let idUser = this.props.loggedInUser._id
    this._service.joinedSpace(id, idUser)
    // this.role()
  }

  render() {
    console.log(this.props)
    return (
      <Col className="event-card" md={3}>
        
        <img src={this.props.imgUrl} alt={"foto de detalles "} />
        <h4>
          <strong> Ciudad: </strong> {this.props.town}
        </h4>
        <h5>
          <strong> Superficie: </strong> {this.props.surface}
          metros cuadrados
        </h5>
        <h6>
          <strong> Plazas: </strong> {this.props.capacityPlace}
          personas
        </h6>
        
        < Button className="button-card " variant="dark" onClick={this.joinSpace()} >
          Solicitar
        </Button>
      </Col>
    );
  }
}

export default SpaceSearchCards;