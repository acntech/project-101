import React from 'react';
import { Link } from 'react-router-dom';

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
                        <Link to="/employees" className="nav-link">Employees</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/companies" className="nav-link">Companies</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavigationAppBar;
