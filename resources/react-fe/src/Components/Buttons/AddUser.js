import Swal from 'sweetalert2'
import {useState } from "react";
import axios from '../../Utils/axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {FormCheck, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {pub, sub, unsub} from '../../Utils/event';

export default function () {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [status, setStatus] = useState('ACTIVE');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onClickSaveBtn = () => {
        axios.post(`/users`, {first_name: firstName, last_name: lastName, status, email, password})
            .then(userAdded)
            .catch(err => {
                Swal.fire('Error!', err?.response?.data?.message, 'error')
            })
    }

    const userAdded = async (res) => {
        try {
            await Swal.fire({
                title: 'Success!',
                html: 'User added.',
                icon: 'success',
                timer: 1000
            });

            setShow(false);
            pub('user-added', res.data);

            setFirstName('')
            setLastName('')
            setStatus('ACTIVE')
            setEmail('')
            setPassword('')
        } catch (e) {
            console.log(e)
        }
    }

    const statusTrans = v => ({ACTIVE: 'Hoạt động', PENDING: 'Bị tạm ngưng'})[v]

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const statusLabel = statusTrans(status);

    const onChangeStatus = (e) => {
        setStatus(e.target.checked ? 'ACTIVE' : 'PENDING');
    }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add User
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add User</Modal.Title>
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
                        <FormLabel>Email</FormLabel>
                        <FormControl type="text" value={email} onChange={e => setEmail(e.target.value)} className="form-control form-control-sm"/>
                    </FormGroup>

                    <FormGroup className="pt-3">
                        <FormLabel>Password</FormLabel>
                        <FormControl type="text" value={password} onChange={e => setPassword(e.target.value)} className="form-control form-control-sm"/>
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