import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item }) => {
    const { name, recipe, image, price, _id } = item;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [, refetch] = useCart();
    const handleAddToCart = item => {
        if (user && user.email) {
            const cartItem = { menuItemId: _id, name, image, price, email: user.email };
            fetch('https://bistro-boss-server-bn9kits5n-prodeveloperbd2.vercel.app/carts', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
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
                            title: 'Food Added on The Cart'
                        })
                    }
                })
        }
        else {
            Swal.fire({
                title: 'Warning',
                text: "Please Login to Order the Food",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login Now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }
    }
    return (
        <div>
            <div className="card w-80 mx-auto h-[450px] shadow-xl">
                <figure><img src={image} alt="Food" /></figure>
                <h4 className="absolute right-0 mr-4 px-2 py-1 font-semibold mt-4 bg-black text-white">${price}</h4>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions justify-center">
                        <button onClick={() => handleAddToCart(item)} className="mt-10 font-semibold border-b-4 hover:bg-yellow-500 hover:text-white border-yellow-500 text-black duration-200 py-2 px-4 rounded-lg">ADD TO CART</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;