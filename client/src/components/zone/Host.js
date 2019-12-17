import React from 'react'
import SpaceService from '../../service/Spaces.service'

import { Container, Row, Button, Modal } from 'react-bootstrap'

import SpaceCard from '../spaces/Space-card'
import SpaceForm from '../spaces/Spaces-form'


class CreatorProfile extends React.Component {
        // el hijo no puede traer nada del padre sin el props
        constructor(props) {
                super(props)
            this._SpaceService = new SpaceService()
                this.state = {
                    loggedInUser: props.loggedInUser._id,
                    spaces: [],
                    showModalWindow: false,
                }
                
}


componentDidMount = () => this.updateSpacesList()

updateSpacesList = () => {
    this._SpaceService.getAllSpaces()
        .then(allSpaceFromDB => {
            let spacelist = allSpaceFromDB.data.filter(space => this.state.loggedInUser === space.host)
            this.setState({ spaces: spacelist }) })
            .catch(err => console.log("Error", err))
}

handleShow = () => this.setState({ showModalWindow: true })
handleClose = () => this.setState({ showModalWindow: false })

    render() {
        return (


            <section>

                <Container>

                    <h1>Mis Espacios</h1>

                    <Button variant="dark" onClick={this.handleShow}>Añadir un espacio</Button>

                    <Row>
                        {this.state.spaces.map(space => <SpaceCard key={space._id} {...space} />)}
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
