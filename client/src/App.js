import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Service from "./service/Auth.service";
import Index from "./components/pages/Index";
// import Plans from "./components/pages/plans";
import EventDetails from "./components/events/Events-details";
import EventsList from "./components/events/Events-list";
import SpacesList from "./components/spaces/Spaces-list";
import Search from "./components/pages/Search";
import SpaceSearch from "./components/pages/Space-Search";
import Creator from "./components/zone/Creator";
import Host from "./components/zone/Host";
import Explorer from "./components/zone/Explorer";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Navbar from "./components/ui/Navbar";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedInUser: null
    };
    this._service = new Service();
  }

  setTheUser = user => {
    this.setState({
      loggedInUser: user
    });
    console.log(
      "El método 'setTheUser' de App.js se ha invocado, pasando al estado 'loggedInUser:"
    );
  };

  fetchUser = () => {
    if (this.state.loggedInUser === null) {
      this._service
        .loggedin()
        .then(theLoggedInUserFromTheServer =>
          this.setState({
            loggedInUser: theLoggedInUserFromTheServer.data
          })
        )
        .catch(err => {
          this.setState({
            loggedInUser: false
          });
          console.log({
            err
          });
        });
    }
  };

  render() {
    this.fetchUser();

    return (
      <>
        <Navbar loggedInUser={this.state.loggedInUser} setUser={this.setTheUser} />
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/search" render={() => this.state.loggedInUser ? (<Search loggedInUser={this.state.loggedInUser} />) : (<Redirect to="/"/>)}/>
          <Route exact path="/spaceSearch" render={() => this.state.loggedInUser ? (<SpaceSearch loggedInUser={this.state.loggedInUser} />) : (<Redirect to="/"/>)}/>
          {/* < Route exact path = "/plans"  render = {() => this.state.loggedInUser ? ( < Plans loggedInUser = {this.state.loggedInUser}/>) : ( <Redirect to = "/" />)} /> */}
          <Route exact path="/profile/creator" render={(props) => this.state.loggedInUser ? (<Creator loggedInUser={this.state.loggedInUser} {...props}/>) : (<Redirect to="/"/>)}/>
          <Route exact path="/profile/spaces"  render={() => this.state.loggedInUser ? (<SpacesList loggedInUser={this.state.loggedInUser} />) : (<Redirect to="/"/>)}/>
          <Route exact path="/plans" render={() => this.state.loggedInUser ? (<EventsList loggedInUser={this.state.loggedInUser} />) : (<Redirect to="/"/>)}/>
          <Route exact path="/profile/host" render={(props) => this.state.loggedInUser ? (<Host loggedInUser={this.state.loggedInUser} {...props}/>) : (<Redirect to="/"/>)}/>
          <Route exact path="/profile/explorer" render={() => this.state.loggedInUser ? (<Explorer loggedInUser={this.state.loggedInUser} />) : (<Redirect to="/"/>)}/>
          <Route exact path="/eventsDetails/:id" render={(props)=> this.state.loggedInUser ? (<EventDetails loggedInUser={this.state.loggedInUser}{...props}/>) : (<Redirect to="/"/>)}/>
          <Route path="/signup"render={match => <Signup setUser={this.setTheUser} {...match} />}/>
          <Route path="/login" render={match => <Login setUser={this.setTheUser} {...match} />}/>
        </Switch>
      </>
    );
  }
}

export default App;

// setUser={this.setTheUser}
