import React from 'react';
import {Reimbursement} from "../models/Reimbursements";
import { Form, FormGroup, Label, Input, Button, Container, Row, Col, Spinner } from 'reactstrap';
import { toast } from 'react-toastify';
import { updateReimbursement, getPendingReimbursements } from '../api/backend-client';
import { ObjectTable } from './objectTable';

interface IUpdateReimComponentState
{
    id: number,
    author: number | undefined, 
    amount: number | undefined, 
    dateSubmitted: number | undefined, 
    dateResolved: number | undefined, 
    description: string | undefined, 
    resolver: number | undefined, 
    status: number | undefined, 
    type: number | undefined,
    reimbursements: Reimbursement[],
    reimsLoaded: boolean

}

export class UpdateReimComponent extends React.Component<any,IUpdateReimComponentState>
{

    constructor(props: any)
    {
        super(props)
        this.state={
            id: 0,
            author: undefined, 
            amount: undefined, 
            dateSubmitted: undefined, 
            dateResolved: undefined, 
            description: undefined, 
            resolver: undefined, 
            status: undefined, 
            type: undefined, 
            reimbursements: [],
            reimsLoaded: false
        }
    }
    async componentDidMount()
    {
        try
        {
            this.setState({
                reimbursements: await getPendingReimbursements(),
                reimsLoaded: true
            })
        }
        catch(e)
        {
            throw e;
        }
    }

    updateReim=async (submitEvent: any)=>
    {
        submitEvent.preventDefault();
        try
        {
            await updateReimbursement(this.state.id, this.state.author, this.state.amount, this.state.dateSubmitted, this.state.dateResolved, this.state.description, this.state.resolver, this.state.status, this.state.type);
            toast(`Reimbursement updated!`)
            this.clearForm();
        }
        catch(e)
        {
            throw e;
        }
    }
    clearForm =()=>
    {
        this.setState({
            author: undefined,
            amount: undefined,
            dateSubmitted: undefined, 
            dateResolved: undefined, 
            description: undefined,
            resolver: undefined,
            status: undefined,
            type: undefined
        })
    }
    bindInputChangeTostate = (changeEvent: any) =>
    {
        //@ts-ignore
        this.setState({[changeEvent.currentTarget.name]: changeEvent.currentTarget.value})
    }
    render()
    {
        return(
            <div>
                <Container>
                        <Row>
                        <Col md={{ size: 5 }}>
                            <h4>Pending Reimbursements</h4>
                            {this.state.reimsLoaded ? (
                            <ObjectTable objects={this.state.reimbursements} />
                            ) : (
                            <Spinner />
                            )}
                        </Col>
                        </Row>
                </Container>
                <Form md={{size: 6}} onSubmit={this.updateReim}>
                    <FormGroup>
                        <Label for="id">ID for Reimbursement</Label>
                        <Input
                            onChange={this.bindInputChangeTostate}
                            value={this.state.id}
                            type="number"
                            name="id"
                            id="id"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="status">Status: 2-Approved 3-Denied</Label>
                        <Input
                            onChange={this.bindInputChangeTostate}
                            value={this.state.status}
                            type="number"
                            name="status"
                            id="status"
                        />
                    </FormGroup>
                    <Button>Update</Button>
                </Form>
            </div>
        )
    }

}