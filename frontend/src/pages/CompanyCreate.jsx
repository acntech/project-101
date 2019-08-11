import React, { Component } from 'react';
import ModalDialog, { ModalDialogBody, ModalDialogFooter, ModalDialogHeader } from '../containers/ModalDialog';

class CompanyCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orgNr: '',
            companyName: '',
            modal: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [ name ]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    toggle() {
        this.setState({ modal: !this.state.modal });
    }

    render() {
        return (
            <div className="App">

                <ModalDialog isOpen={this.state.modal}>
                    <ModalDialogHeader>
                        <h3>Create new company</h3>
                        <button
                            type="button"
                            className="close"
                            aria-label="Close"
                            onClick={this.toggle}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </ModalDialogHeader>
                    <ModalDialogBody>
                        <form onSubmit={this.handleSubmit}>
                            <div className="modal-body">

                                <div className="form-row">
                                    <div className="col">
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Orgnr"
                                            name="orgNr"
                                            required
                                            value={this.state.orgNr}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="col">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Company name"
                                            name="companyName"
                                            value={this.state.companyName}
                                            onChange={this.handleChange} />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </ModalDialogBody>
                    <ModalDialogFooter>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={this.toggle}
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.toggle}
                        >
                            Save changes
                        </button>
                    </ModalDialogFooter>
                </ModalDialog>
            </div>
        );
    }
}

export default CompanyCreate;