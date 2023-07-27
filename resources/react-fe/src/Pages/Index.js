import {useEffect, useState } from "react";
import axios from '../Utils/axios';

import UserRow from "../Components/Table/UserRow";
import AddUser from "../Components/Buttons/AddUser";
import {sub} from "../Utils/event";

export default function (props) {
    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
        axios.get('/users').then(res => setUsers(res.data));
    }

    useEffect(fetchUsers, []);

    sub('user-added', (data) => {
        setUsers([...users, data.detail]);
    })

    sub('user-deleted', (data) => {
        setUsers([...users.map(u => u.id === data.detail.id ? data.detail : u)]);
    })

    sub('user-edited', (data) => {
        setUsers([...users.map(u => u.id === data.detail.id ? data.detail : u)]);
    })

    return (
        <table className="table table-bordered table-striped ">
            <thead className="thead">
                <tr>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Deleted At</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                { users.map((u, i) => <UserRow user={u} key={i}/>) }
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={7}>
                        <AddUser />
                    </td>
                </tr>
            </tfoot>
        </table>
    )
}