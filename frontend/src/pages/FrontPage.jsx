import React from 'react';
import {Button, ButtonGroup} from 'reactstrap';
import { FaBuilding, FaUserTie } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function FrontPage() {
    return (
        <div className="rounded px-3 px-sm-4 py-3 py-sm-5">
            <h1 className="display-3">Hello, Project-101</h1>
            <p className="lead">This is a demo app implemented with React for managing Companies and Employees.</p>
            <hr className="my-4" />
            <ButtonGroup>
                <Button tag={Link} color="primary" size="lg" to="/companies"><FaBuilding /> Companies</Button>
                <Button tag={Link} color="primary" size="lg" to="/employees"><FaUserTie /> Employees</Button>
            </ButtonGroup>
        </div>
    );
}

export default FrontPage;