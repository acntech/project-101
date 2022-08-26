import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const DeleteButton = (props) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [id, setId] = React.useState(-1);
    const [title, setTitle] = React.useState('');
    const [text, setText] = React.useState('');
    

    const toggle = () => {
        setIsModalOpen(currentIsModalOpen => !currentIsModalOpen);
    }

    React.useEffect(() => {
        setId(props.id);
        setText(props.text);
        setTitle(props.title);
    }, [props.id, props.text, props.title])

    const yes = () => {
        if (typeof props.onYes === 'function') {
            props.onYes(id);
        }
        
        toggle();
    }

    const no = () => {
        if (typeof props.onNo === 'function') {
            props.onNo(id);
        }
        
        toggle();
    }

    return (
        <>
            <Button color="danger" size="sm" onClick={toggle}><FaTrashAlt /></Button>
            <Modal isOpen={isModalOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>{title}</ModalHeader>
                <ModalBody>
                    {text}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={no}>No</Button>
                    <Button color="danger" onClick={yes}>Yes</Button>
                </ModalFooter>
            </Modal>
        </>
    );

}

export default DeleteButton;
