import React, { Component } from 'react'
import { Navbar, Nav} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AutService from '../../service/Auth.service'

class Navigation extends Component {

  constructor(props) {
    super(props)
    this._AutService = new AutService()
  }

  logoutUser = () => {
    this._AutService.logout()
      .then(x => this.props.setUser(false))
      .catch(err => console.log(err))
  }


  render() {

    const saludo = this.props.loggedInUser ? this.props.loggedInUser.username : null
    
    if (this.props.loggedInUser){
      if (this.props.loggedInUser.role === 'creator') {
 
        return (
          <Navbar bg="dark" variant="dark" expand="md">
              <Navbar.Brand>Show Home!</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse>
                  <Nav className="mr-auto">
                      <Nav.Link as="li"><Link to="/profile/creator" className="anchorNav">Mi perfil</Link></Nav.Link>
                      <Nav.Link as="li"><Link to="/plans" className="anchorNav">Planes</Link></Nav.Link>
                      <Nav.Link as="li"><Link to = "/search" className = "anchorNav"> Busqueda </Link></Nav.Link >
                      <Nav.Link as="li"><Link to ="/spaceSearch" className = "anchorNav"> Espacios </Link></Nav.Link >
                      <Nav.Link as="li"><Link onClick = {this.logoutUser} className="anchorNav"> Salir </Link></Nav.Link >
                  </Nav>
                  <Nav className="ml-auto">
                      <Navbar.Text>Bienvenid@ {saludo}</Navbar.Text>
                  </Nav>
              </Navbar.Collapse>
          </Navbar>
        )
      }
       if (this.props.loggedInUser.role === 'host') {
                
        return (
          <Navbar bg="dark" variant="dark" expand="md">
              <Navbar.Brand>Show Home!</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse>
                  <Nav className="mr-auto">
                      <Nav.Link as="li"><Link to= "/profile/host"className="anchorNav" >Mi perfil</Link></Nav.Link>
                      {/* <Nav.Link as="li"><Link to= "/profile/spaces" className="anchorNav">Mis Espacios</Link></Nav.Link> */}
                      <Nav.Link as = "li" > < Link to = "/plans"  className="anchorNav"> Planes </Link></Nav.Link >
                      <Nav.Link as="li" > < Link to= "/search" className="anchorNav"> Busqueda </Link></Nav.Link >
                      <Nav.Link as="li" onClick={this.logoutUser}className="anchorNav">Salir</Nav.Link>
                     
                  </Nav>
                  <Nav className="ml-auto">
                      <Navbar.Text>Bienvenid@ {saludo}</Navbar.Text>
                  </Nav>
              </Navbar.Collapse>
          </Navbar>
        )  
      }
      else  {
        return (
          <Navbar bg="dark" variant="dark" expand="md">
              <Navbar.Brand>Show Home!</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse>
                  <Nav className="mr-auto">
                      
                        <Nav.Link as="li"><Link to="/profile/explorer"className="anchorNav">Mi perfil</Link></Nav.Link>
                        <Nav.Link as="li" > < Link to= "/plans" className="anchorNav"> Planes </Link></Nav.Link >
                        <Nav.Link as="li" > < Link to= "/search" className="anchorNav"> Busqueda </Link></Nav.Link >
                        <Nav.Link as="li" onClick={this.logoutUser}className="anchorNav">Salir</Nav.Link>
                     

                  </Nav>
                  <Nav className="ml-auto">
                      <Navbar.Text>Bienvenid@ {saludo}</Navbar.Text>
                  </Nav>
              </Navbar.Collapse>
          </Navbar>
        )
      }
    }
    else {
  return(
     <Navbar bg="dark" variant="dark" expand="md">
              <Navbar.Brand>Show Home!</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse>
                  <Nav className="mr-auto">
                      
                      <Nav.Link as="li"><Link to="/signup" className="anchorNav">Registro</Link></Nav.Link>
                      <Nav.Link as="li"><Link to="/login" className="anchorNav">Iniciar sesión</Link></Nav.Link>
                      
                  </Nav>
                  
              </Navbar.Collapse>
          </Navbar>
  )
}
}
}

        
        
        


export default Navigation