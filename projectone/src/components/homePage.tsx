import React from "react";
import { Container, Row, Col, Spinner, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { ObjectTable } from "./objectTable";
import { toast } from "react-toastify";
import { getUserById, updateUser } from "../api/backend-client";
import { User } from "../models/User";
import {Reimbursement} from "../models/Reimbursements"
import {  getReimbursementByUserId } from "../api/backend-client";

interface IHomePageState
{
    users: User[],
    reimbursements: Reimbursement[], 
    usersLoaded: boolean, 
    reimsLoaded: boolean,
    username: string | undefined,
    password: string | undefined, 
    email: string | undefined 
}
interface IHomePageProps
{
    loggedInUser: User;
}

export class HomePage extends React.Component<IHomePageProps, IHomePageState> {
    constructor(props: any) {
      super(props);
      this.state = {
        users: [],
        reimbursements: [],
        usersLoaded: false,
        reimsLoaded: false,
        username: undefined,
        password: undefined, 
        email: undefined

      };
    }

    updateUserInfo = async(submitEvent: any) =>
    {
        submitEvent.preventDefault();
        try
        {
            await updateUser(this.props.loggedInUser.id, this.state.username, this.state.password, this.state.email)
        }
        catch(e)
        {
            throw e;
        }
    }
    clearForm=()=>
    {
        this.setState({
            username: undefined, 
            password: undefined, 
            email: undefined
        })
    }

    bindInputChangeTostate = (changeEvent: any) =>
    {
        //@ts-ignore
        this.setState({[changeEvent.currentTarget.name]: changeEvent.currentTarget.value})
    }
  
    async componentDidMount() {
        try 
        {
            this.setState({
                  users: await getUserById(this.props.loggedInUser.id),
                  usersLoaded: true,
                  reimbursements: await getReimbursementByUserId(this.props.loggedInUser.id),
                  reimsLoaded: true
              })
            
      } 
      catch (e) {
          toast(e.message, {type:"error"});
      }
    }
    render()
    {
        return(
        <div>
            <Container>
                <Row>
                    <Col md={{ size: 5 }}>
                        <h4>Your user info</h4>
                        {this.state.usersLoaded ? (
                        <ObjectTable objects={this.state.users} />
                        ) : (
                        <Spinner />
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col md={{ size: 5 }}>
                        <h4>Your Reimbursement Requests</h4>
                        {this.state.reimsLoaded ? (
                        <ObjectTable objects={this.state.reimbursements} />
                        ) : (
                        <Spinner />
                        )}
                    </Col>
                </Row>
        </Container>
        <br />
        <h2>Update User Information Here</h2>
        <Form onSubmit={this.updateUserInfo}>
            <FormGroup>
                <Label for="username">Username</Label>
                <Input
                    onChange={this.bindInputChangeTostate}
                    value={this.state.username}
                    type="text"
                    name="username"
                    id="username"
                />
            </FormGroup>
            <FormGroup>
                <Label for="password">Password</Label>
                <Input
                    onChange={this.bindInputChangeTostate}
                    value={this.state.password}
                    type="text"
                    name="password"
                    id="password"
                />
            </FormGroup>
            <FormGroup>
                <Label for="email">email</Label>
                <Input
                    onChange={this.bindInputChangeTostate}
                    value={this.state.email}
                    type="text"
                    name="email"
                    id="email"
                />
            </FormGroup>
            <Button>Update</Button>
        </Form>
      </div>
        )
    }
}