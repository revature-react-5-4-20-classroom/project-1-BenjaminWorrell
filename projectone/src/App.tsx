import React from "react";
import { User } from "./models/User";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { TopNav } from "./components/TopNav";
import { Jumbotron } from "reactstrap";
import { LoginComponent } from "./components/loginComponent"
import { UserPage } from "./components/userPage";
import { ReimbursementDisplay } from "./components/reimDisplay";
import { ReimForm } from "./components/reimForm";
import { HomePage } from "./components/homePage";
import { UpdateReimComponent } from "./components/updateReim";


export default class App extends React.Component<any, any>{
  constructor(props: any){
    super(props);

    this.state = {
      loggedInUser: null,
    };
  };

  updateLoggedInuser = (user: User) =>{
    this.setState({
      loggedInUser: user
    });
  };

  logoutUser =()=>{
    this.setState({
      loggedInUser: null, 
    });
  };

  render(){
    return(
      <div className = "App">
        <Router>
          <TopNav
            logoutUser={this.logoutUser}
            loggedInUser={this.state.loggedInUser}
          />
          <Jumbotron>
            <h1 className ="display-4">Employee Reimbursement System</h1>
          </Jumbotron>
          <Switch>
            <Route exact path="/">
              {this.state.loggedInUser ? (
                <Redirect to="/home" />
              ):(
                <Redirect to="/login"/>
              )}
            </Route>
            <Route
              path="/login"
              render={(props: any)=>{
                return(
                  <LoginComponent {...props} updateUser={this.updateLoggedInuser}/>
                )
              }}
            />
            <Route path="/home">
              <h2>Welcome to the home page {" "}
                {this.state.loggedInUser ? `home, ${this.state.loggedInUser.firstName}!` : "guest!" }
              </h2>
            </Route>
            <Route path="/users">
              <UserPage loggedInUser={this.state.loggedInUser}/>
            </Route>
            <Route path="/reimbursements">
              <ReimbursementDisplay loggedInUser={this.state.loggedInUser}/>
            </Route>
            <Route path="/submit">
              <ReimForm loggedInUser={this.state.loggedInUser}/>
            </Route>
            <Route path="/main">
              <HomePage loggedInUser={this.state.loggedInUser}/>
            </Route>
            <Route path="/update">
              <UpdateReimComponent/>
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }

}