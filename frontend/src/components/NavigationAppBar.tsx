import React, { Component } from 'react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarToggler, NavItem } from 'reactstrap';

interface State {
    collapsed: boolean;
}

class NavigationAppBar extends Component<{}, State> {
    state = {
        collapsed: true
    };

    toggleNavbar = () => {
        this.setState(prevState => ({
            collapsed: !prevState.collapsed
        }));
    }

    render() {
        return (
            <Navbar color="dark" dark expand="md" fixed="top">
                <Link to="/" className="navbar-brand">Project-101</Link>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse isOpen={!this.state.collapsed} navbar>
                    <Nav navbar>
                        <NavItem>
                            <RouterNavLink to="/companies/" className="nav-link">Companies</RouterNavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export { NavigationAppBar };
