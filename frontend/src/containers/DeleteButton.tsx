import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FaTrashAlt } from 'react-icons/fa';

interface State {
    modal: boolean;
    id: number;
    size: string;
    title: string;
    text: string;
}

interface Props {
    id: number;
    title: string;
    text: string;
    onYes?: (id: number) => void;
    onNo?: (id: number) => void;
}

class DeleteButton extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            modal: false,
            id: -1,
            size: 'sm',
            title: '',
            text: ''
        };

        this.toggle = this.toggle.bind(this);
        this.yes = this.yes.bind(this);
        this.no = this.no.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    componentDidMount() {
        this.setState({
            id: this.props.id,
            text: this.props.text,
            title: this.props.title
        });
    }

    yes() {
        if (typeof this.props.onYes === 'function') {
            this.props.onYes(this.state.id);
        }
        this.toggle();
    }

    no() {
        if (typeof this.props.onNo === 'function') {
            this.props.onNo(this.state.id);
        }
        this.toggle();
    }

    render() {
        return (
            <>
                <Button color="danger" size={this.state.size} onClick={this.toggle}><FaTrashAlt /></Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{this.state.title}</ModalHeader>
                    <ModalBody>
                        {this.state.text}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.no}>No</Button>
                        <Button color="danger" onClick={this.yes}>Yes</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }

}

export { DeleteButton };
