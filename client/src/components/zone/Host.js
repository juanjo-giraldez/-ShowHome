import React from 'react'
import SpaceService from '../../service/Spaces.service';
import EventService from "../../service/Events.service";
import EventSelect from "../events/Events-card-mySelect";
import SpaceCard from '../spaces/Space-card'
import SpaceForm from '../spaces/Spaces-form'
import { Container, Row, Button, Modal, Col } from 'react-bootstrap'




class CreatorProfile extends React.Component {
        constructor(props) {
                super(props)
            this._EventService = new EventService();
            this._SpaceService = new SpaceService()
                this.state = {
                    loggedInUser: props.loggedInUser._id,
                    spaces: [],
                    eventsSelect: [],
                    showModalWindow: false,
                }
                
}


componentDidMount = () => {
    this.updateSpacesList()
    this.updateEventsList()
}

updateSpacesList = () => {
    this._SpaceService.getAllSpaces()
    .then(allSpaceFromDB => {
        let spacelist = allSpaceFromDB.data.filter(space => this.state.loggedInUser === space.host)
        this.setState({ spaces: spacelist }) })
        .catch(err => console.log("Error", err))
        
    };
    
    updateEventsList= () => {
        let idAll = this.props.loggedInUser && this.props.loggedInUser._id
        this._EventService.selectTheEvent(idAll)
        .then(allEventsFromDB => {
            this.setState({eventsSelect: allEventsFromDB.data});})
        .catch(err => console.log("Error", err));
    }

deleteSpace = id => {
    this._SpaceService
    .deleteSpace(id)
         .then(this.updateSpacesList)
 }


deleteSelect = (id) => {
        console.log("soy el delete")

        let idUser = this.props.loggedInUser._id
        this._EventService
            .getOut(id, idUser)
            .then(this.updateEventsList)

        }
    
handleShow = () => this.setState({ showModalWindow: true })
handleClose = () => this.setState({ showModalWindow: false })

    render() {
        console.log(this.state.spaces)
        return (


            <section>

                <Container>
                 <Row>
                    <Col md={6}>
                     <div className="row justify-content-center align-items-center ">
                     <img  src={this.props.loggedInUser.imgUrl} alt={"Foto usuario"}/>
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
                    <h1>Mis Espacios</h1>

                    <Button variant="dark" onClick={this.handleShow}>Añadir un espacio</Button>

                    <Row>
                        {this.state.spaces.map(space => (<SpaceCard key={space._id} {...space} updateSpacesList={this.updateSpacesList} deleteSpace={this.deleteSpace}/>))}
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


                <Modal show={this.state.showModalWindow} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Añadir nuevo evento</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <SpaceForm closeModalWindow={this.handleClose} updateSpacesList={this.updateSpacesList} loggedInUser={this.state.loggedInUser} />
                    </Modal.Body>
                </Modal>

            </section>

        )
    }
}


export default CreatorProfile
