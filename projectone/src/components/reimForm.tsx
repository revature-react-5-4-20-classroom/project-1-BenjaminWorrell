import React from 'react';
import {Reimbursement} from "../models/Reimbursements";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import {submitReimbursement} from "../api/backend-client"
import { User } from '../models/User';



interface IReimFormState{
    author: number, 
    amount: number, 
    dateSubmitted: number, 
    dateResolved: number, 
    description: string, 
    resolver: number, 
    status: number, 
    type: number

}

interface IReimFormProps
{
    loggedInUser: User;
}

export class ReimForm extends React.Component<any, IReimFormState>
{
    constructor(props: any)
    {
        super(props);
        this.state={
            author: 0,
            amount: 0,
            dateSubmitted: 0, 
            dateResolved: 0, 
            description: '',
            resolver: 0,
            status: 0,
            type: 0
        }
    }
    
    submitReim = async (submitEvent: any) =>
    {
        submitEvent.preventDefault();
        try
        {
            const reim = new Reimbursement(0, this.props.loggedInUser.id, this.state.amount, this.state.dateSubmitted, this.state.dateResolved, this.state.description, 2, 1, this.state.type);
            await submitReimbursement(reim);
            toast(`New reimbursement request added successfully!`, {type: "success"});
            this.clearForm();
        }
        catch(e)
        {
            toast(e.message, {type: "error"});
        }
    }

    clearForm =()=>
    {
        this.setState({
            author: 0,
            amount: 0,
            dateSubmitted: 0, 
            dateResolved: 0, 
            description: '',
            resolver: 0,
            status: 0,
            type: 0
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
            <Form onSubmit={this.submitReim}>
                <FormGroup>
                    <Label for="amount">Amount in USD</Label>
                    <Input
                        onChange={this.bindInputChangeTostate}
                        value={this.state.amount}
                        type="number"
                        name="amount"
                        id="amount"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="dateSubmitted">Date Submitted</Label>
                    <Input
                        onChange={this.bindInputChangeTostate}
                        value={this.state.dateSubmitted}
                        type="number"
                        name="dateSubmitted"
                        id="dateSubmitted"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="dateResolved">Date Resolved</Label>
                    <Input
                        onChange={this.bindInputChangeTostate}
                        value={this.state.dateResolved}
                        type="number"
                        name="dateResolved"
                        id="dateResolved"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input
                        onChange={this.bindInputChangeTostate}
                        value={this.state.description}
                        type="text"
                        name="description"
                        id="description"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="type">Type 1-Lodging 2-Travel 3-Food</Label>
                    <Input
                        onChange={this.bindInputChangeTostate}
                        value={this.state.type}
                        type="number"
                        name="type"
                        id="type"
                        required
                    />
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        )
    }
}
