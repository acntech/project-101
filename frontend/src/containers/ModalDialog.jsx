import React, { Component } from 'react';

export const ModalDialogHeader = props => {
    return <div className="modal-header">{props.children}</div>;
};

export const ModalDialogBody = props => {
    return <div className="modal-body">{props.children}</div>;
};

export const ModalDialogFooter = props => {
    return <div className="modal-footer">{props.children}</div>;
};

class ModalDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: '',
            display: 'none'
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({
            modalShow: 'show',
            display: 'block'
        });
    }

    closeModal() {
        this.setState({
            modalShow: '',
            display: 'none'
        });
    }

    componentDidMount() {
        this.props.isOpen ? this.openModal() : this.closeModal();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isOpen !== this.props.isOpen) {
            this.props.isOpen ? this.openModal() : this.closeModal();
        }
    }

    render() {
        return (
            <div
                className={'modal fade ' + this.state.modalShow}
                tabIndex="-1"
                role="dialog"
                aria-hidden="true"
                style={{ display: this.state.display }}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">{this.props.children}</div>
                </div>
            </div>
        );
    }
}

export default ModalDialog;