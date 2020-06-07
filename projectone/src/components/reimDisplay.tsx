import React from "react";
import { User } from "../models/User";
import { getAllReimbursements, getReimbursementByUserId } from "../api/backend-client";
import { toast } from "react-toastify";
import { Container, Row, Col, Spinner } from "reactstrap";
import { ObjectTable } from "./objectTable";
//import {reimbursements} from "../models/Reimbursements"


interface IReimbursementProps{
    loggedInUser: User;
}

export class ReimbursementDisplay extends React.Component<IReimbursementProps, any>
{
    constructor(props: any)
    {
        super(props)
        this.state = {
            reimbursements: [],
            reimbursementsLoaded: false,
        }
    }

    async componentDidMount() 
    {
        try 
        {
            if(this.props.loggedInUser.role === "Financial Manager" || this.props.loggedInUser.role === "Admin")
            {
                this.setState({
                    reimbursements: await getAllReimbursements(),
                    reimbursementsLoaded: true,
                });
            }
            else
            {
                this.setState({
                    reimbursements: await getReimbursementByUserId(this.props.loggedInUser.id),
                    reimbursementsLoaded: true,
                })
            }
        }
        catch (e) 
        {
                toast(e.message, {type:"error"});
        }
    }
    render() {
    return (
      <Container>
        <Row>
          <Col md={{ size: 5 }}>
            <h4>Reimbursements</h4>
            {this.state.reimbursementsLoaded ? (
              <ObjectTable objects={this.state.reimbursements} />
            ) : (
              <Spinner />
            )}
          </Col>
        </Row>
      </Container>
    );
  }

}