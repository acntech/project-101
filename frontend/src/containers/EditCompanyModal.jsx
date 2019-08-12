import React, { Component } from 'react';
import { Button, Form, FormGroup, FormText, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import PropTypes from 'prop-types';
import { FaEdit } from 'react-icons/fa';

class EditCompanyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            orgNr: '',
            companyName: '',
            modal: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.apiEditCompany = this.apiEditCompany.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [ name ]: value });
    }

    toggle() {
        this.setState((prevState) => ({
            modal: !prevState.modal
        }));
    }

    componentDidUpdate(prevProps, prevState) {
        // Only get data from server when the modal content is actually visible
        if (this.state.modal !== prevState.modal && this.state.modal) {
            this.apiGetCompany(this.props.id);
        }
    }

    apiGetCompany(id) {
        console.log('Get company');
        this.setState({
                id: id,
                orgNr: '12343459',
                companyName: 'My company'
            }
        );
    }

    apiEditCompany() {
        console.log('Edit company clicked');
        this.toggle();
    }

    render() {
        return (
            <>
                <Button color="primary" onClick={this.toggle} size="sm"><FaEdit /></Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Edit {this.state.companyName}</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="id">Id</Label>
                                <Input
                                    type="number"
                                    name="id"
                                    id="id"
                                    value={this.state.id}
                                    disabled />
                            </FormGroup>
                            <FormGroup>
                                <Label for="orgNr">Orgnr</Label>
                                <Input
                                    type="text"
                                    name="orgNr"
                                    id="orgNr"
                                    placeholder="Valid orgNr, 9 digits"
                                    value={this.state.orgNr}
                                    onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="companyName">Name</Label>
                                <Input
                                    type="text"
                                    name="companyName"
                                    id="companyName"
                                    placeholder="Fancy name of your company"
                                    value={this.state.companyName}
                                    onChange={this.handleChange} />
                                <FormText color="muted">
                                    If you leave this field empty we will lookup company with orgNr in Brreg
                                </FormText>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        <Button color="primary" onClick={this.apiEditCompany}>Save changes</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

EditCompanyModal.propTypes = {
    id: PropTypes.number.isRequired
};

export default EditCompanyModal;
