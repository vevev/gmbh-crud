import Swal from 'sweetalert2'
import axios from '../../Utils/axios';
import {pub} from '../../Utils/event';

export default function (props) {
    const {user} = props;

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success btn-sm',
            cancelButton: 'btn btn-danger btn-sm me-2'
        },
        buttonsStyling: false
    })

    const doDelete = async () => {
        try {
            const res = await axios.delete(`/users/${user.id}`);

            await swalWithBootstrapButtons.fire({
                title: 'Deleted!',
                html: 'User has been deleted.',
                icon: 'success',
                timer: 1000
            })
            
            pub('user-deleted', res.data)
        } catch (err) {
            await Swal.fire({title: 'Error!', html: err.message, icon: 'error'})
        }
    }

    const onClickDeleteBtn = async () => {
        try {
            const result= await swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            })

            result.isConfirmed && doDelete();
        } catch (e) {
            console.log(e)
        }

    };

    return (
        <button className="btn btn-sm btn-danger" onClick={onClickDeleteBtn}>Delete</button>
    )
}