import React, { Component } from "react";
import { Button, Form, Container } from "react-bootstrap";


import Service from "../../service/Auth.service";

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this._service = new Service();
    this.state = { username: "", password: "", lastName:"", role: "" };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { username, password, lastName, role } = this.state;
    console.log('<-------------AQUI-------------->')
    this._service
      .signup(username, password, lastName, role)
      .then(theNewUser => {
        this.props.setUser(theNewUser.data);
        this.setState({ username: "", password: "", lastName: "", role: ""});
        this.props.history.push("/login"); // REDIRECCIONAMIENTO
        console.log(`este es el nuevo user ${theNewUser.data}`)
    })
      .catch(err => console.log(err.response.data.message));
  };

  handleInputChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Container>
        <h1>Registro</h1>

        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Nombre Usuario</Form.Label>
            <Form.Control
              type="text"
              name="username"
              onChange={this.handleInputChange}
              value={this.state.username}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={this.handleInputChange}
              value={this.state.password}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              onChange={this.handleInputChange}
              value={this.state.lastName}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tipo de Usuario</Form.Label>
            <Form.Control as = "select" name="role" onChange={this.handleInputChange}selected={this.state.role}>
              <option value="explorer">Buscador de Planes</option>
              <option value="host">Anfitrión</option>
              <option value="creator">Creador</option>
            </Form.Control>
          </Form.Group>
          <Button variant="dark" type="submit">
            Registrarme
          </Button>
        </Form>
      </Container>
    );
  }
}

export default SignupForm;
