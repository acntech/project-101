import React from 'react';
import { FaDog } from 'react-icons/fa';

function NotFoundPage() {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Woof woof, we can´t find this page</h1>
            <FaDog size="10em" />
        </div>
    );
}

export default NotFoundPage;
