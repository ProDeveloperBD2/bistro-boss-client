import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaPenSquare, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useMenu from "../../../hooks/useMenu";


const ManageItems = () => {
    const [menu, , refetch] = useMenu();
    const [axiosSecure] = useAxiosSecure();
    const handleDeleteMenu = item => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/menu/${item._id}`)
                    .then(menuRes => {
                        console.log('deleted res', menuRes.data);
                        if (menuRes.data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })

            }
        })
    }
    return (
        <div className="m-5">
            <Helmet>
                <title>Bistro Boss Restaurant | Manage Items</title>
            </Helmet>
            <div>
                <SectionTitle subHeading="Hurry Up!" heading="manage all items"></SectionTitle>
            </div>
            <div className="bg-slate-100 p-4 shadow-lg">
                <div className="mt-4 uppercase font-medium mb-4">
                    <h2 className="text-2xl">Total Users: {menu.length}</h2>
                </div>
                <div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead className="bg-yellow-600 text-white">
                                <tr>
                                    <th>#</th>
                                    <th>ITEM IMAGE</th>
                                    <th>ITEM NAME</th>
                                    <th>PRICE</th>
                                    <th>UPDATE</th>
                                    <th>DELETE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    menu.map((item, index) => <tr key={item._id}>
                                        <td>
                                            <label>
                                                {index + 1}
                                            </label>
                                        </td>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="">{item.name}</span>
                                        </td>
                                        <td>${item.price}</td>
                                        <td>
                                            <button className="bg-yellow-600 px-2 py-2 text-lg text-white"><FaPenSquare></FaPenSquare></button>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDeleteMenu(item)} className="bg-red-600 px-2 py-2 text-lg text-white"><FaTrashAlt></FaTrashAlt></button>
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

export default ManageItems;