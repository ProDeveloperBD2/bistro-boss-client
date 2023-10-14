import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";


const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users');
        return res.data;
    })
    const handleDelete = user => {
        console.log(user)
    }
    const handleMakeAdmin = user => {
        fetch(`https://bistro-boss-server-bn9kits5n-prodeveloperbd2.vercel.app/users/admin/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    refetch();
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'success',
                        title: `${user.name} is an Admin Now!`
                    })
                }
            })
    }
    return (
        <div className="m-5">
            <Helmet>
                <title>Bistro Boss Restaurant | All Users</title>
            </Helmet>
            <div>
                <SectionTitle subHeading="How Many??" heading="manage all users"></SectionTitle>
            </div>
            <div className="bg-slate-100 p-4 shadow-lg">
                <div className="mt-4 uppercase font-medium mb-4">
                    <h2 className="text-2xl">Total Users: {users.length}</h2>
                </div>
                <div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead className="bg-yellow-600 text-white">
                                <tr>
                                    <th>#</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>ROLE</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user, index) => <tr key={user._id}>
                                        <th>{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {user.role === 'admin' ? 'admin' :
                                                <button onClick={() => handleMakeAdmin(user)} className="bg-yellow-600 px-2 py-2 text-lg text-white"><FaUsers></FaUsers></button>
                                            }
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(user)} className="bg-red-600 px-2 py-2 text-lg text-white"><FaTrashAlt></FaTrashAlt></button>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;