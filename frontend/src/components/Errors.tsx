import React, { Component } from 'react';
import { UncontrolledAlert } from 'reactstrap';
import { connect } from 'react-redux';
import { RootStateType } from '../types/store';

type Props = ReturnType<typeof mapStateToProps>;

class ErrorMessages extends Component<Props> {

    render() {
        const unhandledPromiseRejections = this.props.errors;
        return (
            <>
                {unhandledPromiseRejections.map((rejection: any, index: any) => (
                    <UncontrolledAlert key={index} color="danger">
                        <h4 className="alert-heading">{rejection.message}</h4>
                        <hr />
                        <p className="mb-0">{rejection.response ? rejection.response.data.message : ''}</p>
                    </UncontrolledAlert>
                ))}
            </>
        );
    }
}

const mapStateToProps = (state: RootStateType) => ({
    errors: state.errors
});

const ErrorsConnected = connect(mapStateToProps)(ErrorMessages);

export { ErrorsConnected, ErrorMessages };
