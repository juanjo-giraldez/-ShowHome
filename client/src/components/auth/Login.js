import React, { Component } from 'react'
import { Button, Form, Container, Toast } from 'react-bootstrap'

import Service from '../../service/Auth.service'

class LoginForm extends Component {

    constructor(props) {
        super(props)
        this._service = new Service()
        this.state = {
            showToast: false,
            toastText: '',
            role: '',
            user: { username: '', password: '' }
        }
    }


    handleInputChange = e => {
        let { name, value } = e.target
        this.setState({
            user: { ...this.state.user, [name]: value }
        })
    }


    handleSubmit = e => {
        e.preventDefault()
        const { username, password, role } = this.state.user
        this._service.login(username, password, role)
            .then(theLoggedUser => {
                this.props.setUser(theLoggedUser.data)
                
                this.setState({ username: '', password: '' , role: ""})
                if (theLoggedUser.data.role === 'creator') {return(this.props.history.push('/profile/creator'))}
                if (theLoggedUser.data.role === 'host') {return (this.props.history.push('/profile/host'))}
                if (theLoggedUser.data.role === 'explorer'){return (this.props.history.push('/profile/explorer'))}   
            })
            .catch(err => {
                this.handleToastOpen(err.response.data.message)
            })
    }

    handleToastClose = () => this.setState({ showToast: false, toastText: '' })
    handleToastOpen = text => this.setState({ showToast: true, toastText: text })


    render() {
        return (
            <Container>
                < article className = "form form-login" >
                <h1>Iniciar sesión</h1>
                  
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        {/* <Form.Label>Usuario</Form.Label> */}
                        <Form.Control type="text" name="username" placeholder="Usuario"onChange={this.handleInputChange} value={this.state.username} />
                    </Form.Group>
                    <Form.Group>
                        {/* <Form.Label>Contraseña</Form.Label> */}
                        <Form.Control type="password" name="password" placeholder="Contraseña"onChange={this.handleInputChange} value={this.state.password} />
                    </Form.Group>
                    <Button  className=" form-btn"variant="dark" type="submit">Iniciar sesión</Button>
                </Form>
                </article>

                <Toast
                    onClose={this.handleToastClose}
                    show={this.state.showToast}
                    delay={3000}
                    autohide
                    style={{
                        position: 'fixed',
                        right: '10px',
                        bottom: '10px',
                        minWidth: '250px'
                    }}>
                    <Toast.Header>
                        <strong className="mr-auto">Error</strong>
                        <small>Session manager</small>
                    </Toast.Header>
                    <Toast.Body>{this.state.toastText}</Toast.Body>
                </Toast>

            </Container >
        )
    }
}


export default LoginForm