import React from 'react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarToggler, NavItem } from 'reactstrap';

const NavigationAppBar = (props) => {

    const [isCollapsed, setIsCollapsed] = React.useState(true);

    const toggleNavbar = () => {
        setIsCollapsed(currentIsCollapsed => !currentIsCollapsed);
    }

    return (
        <Navbar color="dark" dark expand="md" fixed="top">
            <Link to="/" className="navbar-brand">Project-101</Link>
            <NavbarToggler onClick={toggleNavbar} className="mr-2" />
            <Collapse isOpen={!isCollapsed} navbar>
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

export default NavigationAppBar;
