import React, { Component } from 'react';
import { Button, Form, FormGroup, FormText, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FaEdit } from 'react-icons/fa';
import CompaniesApi from '../services/CompaniesApi';

interface Props {
    id: string;
    onEdited: () => void;
}

interface State {
    id: string;
    orgNr: string;
    companyName: string;
    modal: boolean;
}

class EditCompanyModal extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            id: '',
            orgNr: '',
            companyName: '',
            modal: false
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleOrgNrChange = this.handleOrgNrChange.bind(this);
    
        this.toggle = this.toggle.bind(this);
        this.apiUpdateCompany = this.apiUpdateCompany.bind(this);
    }

    handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ companyName: event.target.value });
    }

    handleOrgNrChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ orgNr: event.target.value });
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        // Only get data from server when the modal content is actually visible
        if (this.state.modal !== prevState.modal && this.state.modal) {
            this.apiReadCompany(this.props.id);
        }
    }

    async apiReadCompany(id: any) {
        const company = await CompaniesApi.readCompanyById(id);
        this.setState({
                id: company.id,
                orgNr: company.orgNr,
                companyName: company.companyName
            }
        );
    }

    async apiUpdateCompany() {
        const company = {
            id: this.state.id,
            orgNr: this.state.orgNr,
            companyName: this.state.companyName
        };
        await CompaniesApi.updateCompany(company.id, company);

        // Inform parent component that existing company has been edited, if onEdited() defined in props
        if (typeof this.props.onEdited === 'function') {
            this.props.onEdited();
        }

        this.toggle();
    }

    render() {
        return (
            <>
                <Button color="primary" onClick={this.toggle} size="sm"><FaEdit /></Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
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
                                    onChange={this.handleOrgNrChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="companyName">Name</Label>
                                <Input
                                    type="text"
                                    name="companyName"
                                    id="companyName"
                                    placeholder="Fancy name of your company"
                                    value={this.state.companyName}
                                    onChange={this.handleNameChange} />
                                <FormText color="muted">
                                    If you leave this field empty we will lookup company with orgNr in Brreg
                                </FormText>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        <Button color="primary" onClick={this.apiUpdateCompany}>Save changes</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

export { EditCompanyModal };
