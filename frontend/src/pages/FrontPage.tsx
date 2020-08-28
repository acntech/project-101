import React from 'react';
import { Button, Jumbotron } from 'reactstrap';
import { FaBuilding } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FrontPage = () => {
    return (
        <Jumbotron>
            <h1 className="display-3">Hello, Project-101</h1>
            <p className="lead">This is a demo app implemented with ReactJS for managing Companies and Employees.</p>
            <hr className="my-2" />
            <p className="lead">
                <Button tag={Link} color="primary" size="lg" to="/companies"><FaBuilding /> Companies</Button> {' '}
            </p>
        </Jumbotron>
    );
}

export { FrontPage };
