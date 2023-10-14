import { useContext } from "react";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const SocialLogin = () => {
    const { googleCreateUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const handleGoogleUser = () => {
        googleCreateUser()
            .then(result => {
                const googleCreatedUser = result.user;
                console.log(googleCreatedUser)
                const saveUser = { name: googleCreatedUser.displayName, email: googleCreatedUser.email };
                fetch('https://bistro-boss-server-bn9kits5n-prodeveloperbd2.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.insertedId) {
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
                                title: 'Your Account Has Been Created'
                            })
                        }
                    })
                navigate(from, { replace: true })
            })
            .catch(error => console.log(error))
    }
    return (
        <div className='flex lg:gap-6 md:gap-4 gap-3 w-40 mx-auto'>
            <button><FaFacebook className='text-4xl text-blue-500'></FaFacebook></button>
            <button onClick={handleGoogleUser}> <FaGoogle className='text-4xl text-[#d8b682]'></FaGoogle></button>
            <button><FaGithub className='text-4xl text-black'></FaGithub></button>
        </div>
    );
};

export default SocialLogin;