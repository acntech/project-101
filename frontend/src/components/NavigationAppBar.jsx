import React, { Component } from 'react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarToggler, NavItem } from 'reactstrap';

class NavigationAppBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true
        };

        this.toggleNavbar = this.toggleNavbar.bind(this);
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <Navbar color="dark" dark expand="md" fixed="top">
                <Link to="/" className="navbar-brand">Project-101</Link>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse isOpen={!this.state.collapsed} navbar>
                    <Nav navbar>
                        <NavItem>
                            <RouterNavLink to="/companies" className="nav-link">Companies</RouterNavLink>
                        </NavItem>
                        <NavItem>
                            <RouterNavLink to="/employees" className="nav-link">Employees</RouterNavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default NavigationAppBar;
