import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import SpaceService from "../../service/Spaces.service"
import SpaceSearch from "../spaces/Spaces-search-card"
import { Link } from "react-router-dom";

class AllSpaces extends Component {
    constructor(props) {
        super(props);
        
        this._service = new SpaceService(); 
        this.state = {
            spaces: [],
            search: ""
        };
        
    }       
    componentDidMount = () => this.updateSpaceList();
    
    
    updateSpaceList = () => {
        this._service.getAllSpaces()
        .then(allSpacesFromDB => { this.setState({spaces: allSpacesFromDB.data})})
        
        .catch(err => console.log("Error", err));
        
    };
    


    handleSerchChange = e => this.setState({search: e.target.value });


    
    render() {
      const filterItems = () => {
        let searchs = this.state.search;
        return this.state.spaces.filter(
          el => el.nameSpace.toLowerCase().indexOf(searchs.toLowerCase()) > -1 ||
          el.town.toLowerCase().indexOf(searchs.toLowerCase()) > -1 ||
          el.surface.toString().toLowerCase().indexOf(searchs.toString().toLowerCase()) > -1 ||
          el.capacityPlace.toString().toLowerCase().indexOf(searchs.toString().toLowerCase()) > -1 
          ); 
        } 
        console.log(this.props.loggedInUser._id)
        
            return (
                <>
          <Container>
              <h1 className="text-center" > Busqueda de espacios </h1>
                <br></br>
                < div className = "text-center" >
                  <label className="label-search" htmlFor="search">
                    Buscador
                  </label>
                  <input
                    className="input-search"
                    name="search"
                    type="search"
                    id="search"
                    value={this.state.search}
                    onChange={this.handleSerchChange}
                  />
                </div>
                <br></br>
                <Row>
                  {filterItems().map(spaces => (
                    <SpaceSearch key={spaces._id} {...spaces} loggedInUser={this.props.loggedInUser._id}/>
                  ))}
                </Row>
              <Row>
                  <div>
                    < Link  to="/profile/creator"  className="btn btn-dark button-card btn-top  " > Volver </Link>
                  </div>
              </Row>
          </Container>
          </>  
        )
}



}
export default AllSpaces;