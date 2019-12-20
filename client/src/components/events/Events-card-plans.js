import React from "react";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";

class EventCardPlans extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Col md={4}>
        <article className="event-card">
          <img src={this.props.imgUrl} alt={"Foto evento"} />
          <h3>
            <strong> {this.props.nameEvent} </strong>
          </h3>
          <h4>
            <strong> Ciudad: </strong> {this.props.town}
          </h4>
          < h5 className = " paragraph" >
            <strong> Categoria: </strong> {this.props.category}
          </h5 >
          {/* <h5>
          <strong> Correo electrónico:</strong> {this.props.email}
          
        </h5> */}
        {/* <h6>
          <strong> Plazas: </strong> {this.props.capacityPlace}
          personas
        </h6>
        <p>
          <strong> Descripción: </strong> {this.props.description}
        </p> */}
          <Link
            className = "btn btn-sm btn-dark button-card"
            to={`/eventsDetails/${this.props._id}`}
          >
            Ver detalles
          </Link>
    
        </article>
      </Col>
    );
  }
}

export default EventCardPlans;
