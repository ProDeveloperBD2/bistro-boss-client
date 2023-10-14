import { Helmet } from "react-helmet-async";
import useCart from "../../../hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";

const MyCart = () => {
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((sum, item) => item.price + sum, 0);
    const handleDelete = item => {
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
                fetch(`https://bistro-boss-server-bn9kits5n-prodeveloperbd2.vercel.app/carts/${item._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your Item has been deleted.',
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
                <title>Bistro Boss Restaurant | My Cart</title>
            </Helmet>
            <div>
                <SectionTitle subHeading="My Cart" heading="wanna add more?"></SectionTitle>
            </div>
            <div className="bg-slate-100 p-4 shadow-lg">
                <div className="flex items-center mt-4 uppercase justify-between font-medium mb-4">
                    <h2 className="text-2xl">Total Items: {cart.length}</h2>
                    <h2 className="text-2xl">Total Price: {totalPrice}</h2>
                    <Link to="/dashboard/payment">
                        <button className="bg-yellow-600 px-3 py-1 rounded-lg text-white">PAY</button></Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-yellow-600 text-white">
                            <tr>
                                <th>#</th>
                                <th>ITEM IMAGE</th>
                                <th>ITEM NAME</th>
                                <th>PRICE</th>
                                <th>ACTION</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map((item, index) => <tr
                                    key={item._id}
                                >
                                    <td>
                                        {index + 1}
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
                                        <h3 className="text-xl font-semibold">{item.name}</h3>
                                    </td>
                                    <td>
                                        <h5 className="text-lg">${item.price}</h5>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(item)} className="bg-red-600 px-2 py-2 text-lg text-white"><FaTrashAlt></FaTrashAlt></button>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyCart;