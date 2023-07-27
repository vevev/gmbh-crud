import moment from "moment";
import DeleteUser from "../Buttons/DeleteUser";
import EditUser from "../Buttons/EditUser";

export default function (props) {
    const {user} = props;

    const timeFormatted = v => v && moment(v).format('YYYY-MM-DD HH:mm:ss');

    const statusTrans = v => ({ACTIVE: 'Hoạt động', PENDING: 'Bị tạm ngưng', DELETED: 'Đã xóa'}[v])

    return (
        <tr>
            <td>{ user.email }</td>
            <td>{ user.first_name }</td>
            <td>{ user.last_name }</td>
            <td>{ statusTrans(user.status) }</td>
            <td>{timeFormatted(user.created_at)}</td>
            <td>{timeFormatted(user.updated_at)}</td>
            <td>{timeFormatted(user.deleted_at)}</td>
            <td>
                { user.status !== 'DELETED' && <EditUser user={user} /> }
                { user.status !== 'DELETED' && <DeleteUser user={user} /> }
            </td>
        </tr>
    )
}