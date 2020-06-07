import React from 'react';
import {Reimbursement} from "../models/Reimbursements";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import {submitReimbursement} from "../api/backend-client"



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
            const reim = new Reimbursement(0, this.state.author, this.state.amount, this.state.dateSubmitted, this.state.dateResolved, this.state.description, this.state.resolver, this.state.status, this.state.type);
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
                    <Label for="author">Author: Using UserID</Label>
                    <Input
                        onChange={this.bindInputChangeTostate}
                        value={this.state.author}
                        type="number"
                        name="author"
                        id="author"
                        required
                    />
                </FormGroup>
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
                    <Label for="resolver">Resolving Manager: UserID</Label>
                    <Input
                        onChange={this.bindInputChangeTostate}
                        value={this.state.resolver}
                        type="number"
                        name="resolver"
                        id="resolver"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="status">Status: Please enter 1</Label>
                    <Input
                        onChange={this.bindInputChangeTostate}
                        value={this.state.status}
                        type="number"
                        name="status"
                        id="status"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="type">Type</Label>
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
