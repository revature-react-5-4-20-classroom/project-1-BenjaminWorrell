  
import React from 'react';
import { Nav, NavItem, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { User } from '../models/User';

interface ITopNavProps {
    logoutUser: ()=>void;
    loggedInUser: User | null
}

export class TopNav extends React.Component<ITopNavProps> {
    render() {
        return (
            <Nav tabs>
                <NavItem>
                    <NavLink to="/home" className="nav-link" activeClassName="active">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink hidden={!this.props.loggedInUser} to="/main" className="nav-link" activeClassName="active">Your Info</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink hidden={!!this.props.loggedInUser} to="/login" className="nav-link" activeClassName="active">Login</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink hidden={!(this.props.loggedInUser && (this.props.loggedInUser.role === "Financial Manager" || this.props.loggedInUser.role === "Admin"))} to="/users" className="nav-link" activeClassName="active">Users</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink hidden={!(this.props.loggedInUser && this.props.loggedInUser.role === "Financial Manager")} to="/reimbursements" className="nav-link" activeClassName="active">Reimbursements</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink hidden={!(this.props.loggedInUser && this.props.loggedInUser.role === "Financial Manager")} to="/update" className="nav-link" activeClassName="active">Update Reimbursements</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink hidden={!(this.props.loggedInUser)} to="/submit" className="nav-link" activeClassName="active">Sumbit New Request</NavLink>
                </NavItem>
                <NavItem tag={()=>{return <Button to="/home"  hidden={!this.props.loggedInUser} onClick={this.props.logoutUser} color="secondary" outline>Logout</Button>}} />
            </Nav>
        );
    }
}