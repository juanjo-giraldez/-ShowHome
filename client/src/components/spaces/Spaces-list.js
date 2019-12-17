import React from 'react'
import SpaceService from '../../service/Spaces.service'

import { Container, Row, Button, Modal } from 'react-bootstrap'

import SpaceCard from './Space-card'
import SpaceForm from './Spaces-form'

class SpaceList extends React.Component {

    constructor(props) {
        super(props)
        this._SpaceService = new SpaceService()
        this.state = {
            loggedInUser: props.loggedInUser,
            spaces: [],
            showModalWindow: false
        }
    }
    componentDidMount = () => this.updateSpacesList()

    updateSpacesList = () => {
        this._SpaceService.getAllSpaces()
            .then(allSpacesFromDB => this.setState({ spaces: allSpacesFromDB.data }))
            .catch(err => console.log("Error", err))
    }

    handleShow = () => this.setState({ showModalWindow: true })
    handleClose = () => this.setState({ showModalWindow: false })

    render() {
        return (


            <section>

                <Container>

                    <h1>Mis Eventos</h1>

                    <Button variant="dark" onClick={this.handleShow}>Añadir evento</Button>

                    <Row>
                        {this.state.spaces.map(event => <SpaceCard key={event._id} {...event} />)} {this.state.loggedInUser}
                    </Row>
                </Container>


                <Modal show={this.state.showModalWindow} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Añadir nuevo evento</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <SpaceForm closeModalWindow={this.handleClose} updateSpacesList={this.updateSpacesList} />
                    </Modal.Body>
                </Modal>

            </section>

        )
    }
}


export default SpaceList