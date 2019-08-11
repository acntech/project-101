import React from 'react';
import {Link, NavLink} from 'react-router-dom';

function NavigationAppBar() {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <Link to="/" className="navbar-brand">Project-101</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink to="/employees" className="nav-link">Employees</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/companies" className="nav-link">Companies</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavigationAppBar;
