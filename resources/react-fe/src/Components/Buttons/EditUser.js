import Swal from 'sweetalert2'
import {useState } from "react";
import axios from '../../Utils/axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {FormCheck, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {pub, sub, unsub} from '../../Utils/event';

export default function (props) {
    const {user} = props;

    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [status, setStatus] = useState(user.status || 'ACTIVE');

    const onClickSaveBtn = () => {
        axios.put(`/users/${user.id}`, {first_name: firstName, last_name: lastName, status})
            .then(userEdited)
            .catch(err => {
                Swal.fire('Error!', '', 'error')
            })
    }

    const userEdited = async (res) => {
        try {
            await Swal.fire({
                title: 'Success!',
                html: 'User added.',
                icon: 'success',
                timer: 1000
            });

            setShow(false);
            pub('user-edited', res.data);
        } catch (e) {
            console.log(e)
        }
    }

    const statusTrans = v => ({ACTIVE: 'Hoạt động', PENDING: 'Bị tạm ngưng', DELETED: 'Bị xóa'})[v]

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const statusLabel = statusTrans(status);

    const onChangeStatus = (e) => {
        setStatus(e.target.checked ? 'ACTIVE' : 'PENDING');
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow} className="btn btn-primary btn-sm me-3">
                Edit
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <FormGroup>
                        <FormLabel>First Name</FormLabel>
                        <FormControl type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="form-control form-control-sm"/>
                    </FormGroup>

                    <FormGroup className="pt-3">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="form-control form-control-sm"/>
                    </FormGroup>

                    <FormGroup className="pt-3">
                        <FormLabel>Status</FormLabel>
                        <FormCheck type="switch" name="status" value={status} checked={status === 'ACTIVE'} onChange={onChangeStatus} label={statusLabel}/>
                    </FormGroup>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onClickSaveBtn}>Add</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}