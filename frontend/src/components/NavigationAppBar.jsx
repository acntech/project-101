import React, { Component } from 'react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

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
                <NavbarBrand>
                    <Link to="/" className="navbar-brand">Project-101</Link>
                </NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse isOpen={!this.state.collapsed} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink>
                                <RouterNavLink to="/employees/" className="nav-link">Employees</RouterNavLink>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>
                                <RouterNavLink to="/companies/" className="nav-link">Companies</RouterNavLink>
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default NavigationAppBar;
