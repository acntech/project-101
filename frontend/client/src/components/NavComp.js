import React, { Component } from "react";
import { Link } from "@reach/router";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

class NavComp extends Component {
    render() {
        return (
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/" to="/">Dashboard</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link ><Link to="companies">Company</Link></Nav.Link>
                    </Nav>
                </Navbar>
        );
    }
}

export default NavComp;
