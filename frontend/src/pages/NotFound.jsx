import React from 'react';
import { Alert } from 'reactstrap';

function NotFound() {
    return (
        <Alert color="danger">
            <h1>Whoops, we can´t find this page</h1>
        </Alert>
    );
}

export default NotFound;