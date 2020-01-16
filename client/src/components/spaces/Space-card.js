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
      console.log(this.props)
        return (
          <Col  className="event-card" md={4}>
            <img src={this.props.imgUrl} alt={"Foto espacio"} />
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
            <p className="paragraph">
              <strong>Descripción:</strong>
              {this.props.description}
            </p>
            <br></br>
         
            <Button className="button-card" variant="dark" onClick={this.handleShow}>
              Editar
            </Button>
           
            <Button className="btn-top button-card"
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
                  space={this.props}
                  updateSpacesList={this.props.updateSpacesList}
                  closeModalWindow={this.handleClose}
                                />
              </Modal.Body>
            </Modal>
          </Col>
        );
    }
}


export default SpaceCard

