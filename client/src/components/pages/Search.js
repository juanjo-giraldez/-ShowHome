

import React, { Component } from "react";
import EventService from "../../service/Events.service";
import { Container, Row } from "react-bootstrap";
import EventsSearch from "../events/Events-search-card"

import { Link } from "react-router-dom";

class AllEvents extends Component {
    constructor() {
        super();
        this._service = new EventService();
        this.state = {
            events: [],
            search: ""
        };
    }

    componentDidMount = () => this.updateEventsList();

    updateEventsList = () => {
        this._service
            .getAllEvents()
            .then(allEventsFromDB => {
                this.setState({ events: allEventsFromDB.data });
            })
            .catch(err => console.log("Error", err));
    };
    handleSearchChange = e => this.setState({ search: e.target.value });
    render() {
        const filterItems = () => {
            let searchs = this.state.search;
            return this.state.events.filter(
                el => el.nameEvent.toLowerCase().indexOf(searchs.toLowerCase()) > -1 ||
                el.category.toLowerCase().indexOf(searchs.toLowerCase()) > -1 ||
                el.town.toLowerCase().indexOf(searchs.toLowerCase()) > -1 

            );
        };
        return (
          <div>
            <section>
              <Container>
                <h1 className="text-center" > Busqueda de eventos </h1>
                <br></br>
                < div className = "text-center" >
                  <label className="label-search" htmlFor="search">
                    Buscador
                  </label>
                  <input
                    className="input-search"
                    name="search"
                    type="text"
                    id="search"
                    value={this.state.search}
                    onChange={this.handleSearchChange}
                  />
                </div>
                <br></br>
                <Row>
                  {filterItems().map(events => (
                    <EventsSearch key={events._id} {...events} />
                  ))}
                </Row>
              </Container>
            </section>
          </div>
        );
    }
}

export default AllEvents;

