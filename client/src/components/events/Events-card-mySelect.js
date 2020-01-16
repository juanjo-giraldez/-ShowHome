import React from "react";

import { Col, Button } from "react-bootstrap";



class EventSelect extends React.Component {
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
      <Col className="event-card special-margin" md={4}>
        <img src={this.props.imgUrl} alt={"Foto evento"} />
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
        <h6>
          <strong>Plazas:</strong>
          {this.props.capacityPlace} personas
        </h6>
        <p>
          <strong>Descripción:</strong>
          {this.props.description}
        </p>

        < Button className = "button-card "
          variant="dark"
          onClick={() => {
            console.log("se ha pulsado");
            this.props.deleteSelect(this.props._id);
          }}
        >
          Eliminar
        </Button>
      </Col>
    );
  }
}

export default EventSelect;