import React from "react";
import { Container, Row, Col, Spinner } from "reactstrap";
import { ObjectTable } from "./objectTable";
import { toast } from "react-toastify";
import { getAllUsers, getUserById } from "../api/backend-client";
import { User } from "../models/User";

interface IUserPageProps{
    loggedInUser: User;
}


export class UserPage extends React.Component<IUserPageProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      users: [],
      usersLoaded: false,
    };
  }

  async componentDidMount() {
      try {
          if(this.props.loggedInUser.role === "Financial Manager" || this.props.loggedInUser.role === "Admin")
          {
            this.setState({
                users: await getAllUsers(),
                usersLoaded: true,
            });
          }
          else
          {
            this.setState({
                users: await getUserById(this.props.loggedInUser.id),
                usersLoaded: true,
            })
          }
    } catch (e) {
        toast(e.message, {type:"error"});
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col md={{ size: 5 }}>
            <h4>Users</h4>
            {this.state.usersLoaded ? (
              <ObjectTable objects={this.state.users} />
            ) : (
              <Spinner />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}