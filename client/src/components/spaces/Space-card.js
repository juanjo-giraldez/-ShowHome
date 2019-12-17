import React from 'react'
import SpacesEdit from './Space-edit'
import {Col, Button, Modal } from "react-bootstrap";



class SpaceCard extends React.Component {
    constructor(props) {
        super(props)
             

        this.state = {
            showModalWindow: false
        }
    }
   
    handleShow = () => this.setState({ showModalWindow: true })
    handleClose = () => this.setState({ showModalWindow: false })
    render() {
        return (
          <Col md={4}>
            <h3>
              <strong>{this.props.nameSpace}</strong>
            </h3>
            <h4>
              <strong>Ciudad:</strong>
              {this.props.town}
            </h4>
            <h5>
              <strong>Lugar:</strong>
              {this.props.place}
            </h5>
            <h5>
              <strong>Superficie: </strong>
              {this.props.surface} metros cuadrados
            </h5>
            <h6>
              <strong>Aforo:</strong>
              {this.props.capacityPlace} personas
            </h6>
            <p>
              <strong>Descripción:</strong>
              {this.props.description}
            </p>
            <br></br>
         
            <Button variant="dark" onClick={this.handleShow}>
              Editar
            </Button>
           
            <Button
              variant="dark"
              onClick={() => this.props.deleteSpace(this.props._id)}
            >
              Eliminar
            </Button>

            <Modal show={this.state.showModalWindow} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Editar espacio</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <SpacesEdit
                  //   match={this.props}
                  updateSpacesList={this.props.updateSpacesList}
                  closeModalWindow={this.handleClose}
                
                deleteSpace={this.props} updateSpaceList={this.props.updateSpaceList} closeModalWindow={this.handleClose} />
              </Modal.Body>
            </Modal>
          </Col>
        );
    }
}


export default SpaceCard

// const SpaceCard = ({props, _id, creator, nameSpace, place, surface, capacityPlace, description, town}) => {

//     return (
//         <Col md={4}>
//             <h3><strong>{nameSpace}</strong></h3>
//             <h4><strong>Ciudad:</strong> {town}</h4>
//             <h5><strong>Lugar:</strong> {place}</h5>
//             <h5><strong>Superficie: </strong>{surface}</h5>
//             <h6><strong>Aforo:</strong>{capacityPlace} personas</h6>
//             <p><strong>Descripción:</strong>{description}</p>
//             <br></br>
//             <Link className="btn btn-sm btn-dark" to={`/events/${_id}`}>Ver detalles</Link>
//             < Link className="btn btn-sm btn-dark" onclick={props.loggedInUser._id === creator ? < Link className = "btn btn-sm btn-dark"to = {`/eventEdit/${_id}`} > Editar </Link> : null} />
//         </Col >
           
            
//     )
// }