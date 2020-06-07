import React from 'react';
import {Reimbursement} from "../models/Reimbursements";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import { updateReimbursement } from '../api/backend-client';

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
    type: number | undefined

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
            type: undefined
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
                <Form onSubmit={this.updateReim}>
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
                        <Label for="author">Author: Using UserID</Label>
                        <Input
                            onChange={this.bindInputChangeTostate}
                            value={this.state.author}
                            type="number"
                            name="author"
                            id="author"
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
                    <FormGroup>
                        <Label for="type">Type</Label>
                        <Input
                            onChange={this.bindInputChangeTostate}
                            value={this.state.type}
                            type="number"
                            name="type"
                            id="type"
                        />
                    </FormGroup>
                    <Button>Update</Button>
                </Form>
            </div>
        )
    }

}