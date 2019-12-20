import React, { Component } from "react";
import { Button, Form, Container } from "react-bootstrap";


import Service from "../../service/Auth.service";

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this._service = new Service();
    this.state = {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      role: "",
      category: "",
      imgUrl: ""
    };
  }

  signupImage = e => {
    console.log("entra en signupImage")
    const uploadData = new FormData()
    uploadData.append('imgUrl', e.target.files[0])

    this._service.uploadCloudinary(uploadData)
    .then(theFile => {
      console.log("respuesta ok de cloudinary", theFile)
      this.setState({imgUrl: theFile.data.secure_url})
       })

    .catch(err => console.log('error upload image', err));
    
  }

  handleSubmit = e => {
    e.preventDefault();
    const {
      username,
      password,
      firstName,
      lastName,
      role,
      category,
      imgUrl
    } = this.state;
    
    this._service
      .signup(username, password, firstName, lastName, role, category, imgUrl)
      .then(theNewUser => {
        this.props.setUser(theNewUser.data);
        this.setState({
          username: "",
          password: "",
          firstName: "",
          lastName: "",
          role: "",
          category: "",
          imgUrl: ""
        });
        this.props.history.push("/login"); // REDIRECCIONAMIENTO
        console.log(`este es el nuevo user ${theNewUser.data}`);
      })
      .catch(err => console.log(err));
  };

  handleInputChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Container>
        < article className = "form" >
        <h1>Registro</h1>

        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            {/* <Form.Label> Usuario</Form.Label> */}
            <Form.Control
              type="text"
              name="username"
              placeholder = "Usuario"
              onChange={this.handleInputChange}
              value={this.state.username}
            />
          </Form.Group>
          <Form.Group>
            {/* <Form.Label>Contraseña</Form.Label> */}
            <Form.Control
              type="password"
              name="password"
              placeholder = "Contraseña"
              onChange={this.handleInputChange}
              value={this.state.password}
            />
          </Form.Group>
          <Form.Group>
            {/* <Form.Label>Nombre</Form.Label> */}
            <Form.Control
              type="text"
              name="firstName"
              placeholder = "Nombre"
              onChange={this.handleInputChange}
              value={this.state.firstName}
            />
          </Form.Group>
          <Form.Group>
            {/* <Form.Label>Apellidos</Form.Label> */}
            <Form.Control
              type="text"
              name="lastName"
              placeholder = "Apellidos"
              onChange={this.handleInputChange}
              value={this.state.lastName}
            />
          </Form.Group>
          <Form.Group>
            {/* <Form.Label>Tipo de Usuario</Form.Label> */}
            <Form.Control
              as="select"
              name="role"
              placeholder = "Tipo de Usuario"
              onChange={this.handleInputChange}
              selected={this.state.role}
            >
              < option value = "" > ¿Qué tipo de usuarios erés? </option>
              <option value="explorer">Buscador de Planes</option>
              {/* <option value="host">Anfitrión</option> */}
              <option value="creator">Creador de planes</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            {/* <Form.Label>Preferencia</Form.Label> */}
            <Form.Control
              as="select"
              name="category"
              placeholder = "Preferencia"
              onChange={this.handleInputChange}
              value={this.state.category}
            > 
              < option value = "" > Selecciona una categoria </option>
              < option value = "Cine" > Cine </option>
              < option value = "Música" > Música </option>
              < option value = "Clases" > Clases </option>
              < option value = "Encuentros" > Encuentros </option>
              < option value = "Espectaculos" > Expectáculo </option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Subir imagen </Form.Label>
            <Form.Control
              type="file"
              name="imgUrl"
              onChange={this.signupImage}
            />
          </Form.Group>

          <Button  className="form-btn"variant="dark" type="submit">
            Registrarme
          </Button>
        </Form>
        </article>
      </Container>
    );
  }
}

export default SignupForm;
