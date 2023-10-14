import { Link, useNavigate } from 'react-router-dom';
import LoginBg from '../../assets/others/authentication.png';
import LoginPic from '../../assets/others/authentication2.png'
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const Register = () => {
    const { createUser, userProfileUpdate } = useContext(AuthContext);
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onSubmit = data => {
        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                const createdUser = result.user;
                console.log(createdUser)
                navigate('/')
                userProfileUpdate(data.name, data.photo)
                    .then(() => {
                        const saveUser = { name: data.name, email: data.email };
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
                        console.log('user has been Updated')
                    })
                    .catch(error => console.log(error))
                reset()
                Swal.fire({
                    title: 'Success!',
                    text: 'Do you want to continue',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
            })
            .catch(error => console.log(error))
    };

    return (
        <>
            <Helmet>
                <title>Bistro Boss Restaurant | Register</title>
            </Helmet>
            <div className='min-h-screen w-full pt-24 pb-16' style={{ backgroundImage: `url('${LoginBg}')` }}>
                <div className="hero lg:w-4/5 md:w-4/5 w-full shadow-2xl mx-auto" style={{ backgroundImage: `url('${LoginBg}')` }}>
                    <div className="hero-content flex-col-reverse lg:flex-row-reverse">
                        <div className=''>
                            <img className='w-full' src={LoginPic} alt="" />
                        </div>
                        <div className="card flex-shrink-0 bg-white bg-opacity-0 w-full max-w-sm">
                            <h2 className='text-3xl font-bold mt-5 text-center'>Sign Up</h2>
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" {...register("name", { required: true })} name='name' placeholder="Name" className="input-bordered text-xl py-1 px-2" />
                                    {errors.name && <span className='text-red-600'>Name is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo URL</span>
                                    </label>
                                    <input type="text" {...register("photo", { required: true })} name='photo' placeholder="Photo URL" className="input-bordered text-xl py-1 px-2" />
                                    {errors.photo && <span className='text-red-600'>Photo URL is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" {...register("email", { required: true })} name='email' placeholder="Email" className="input-bordered text-xl py-1 px-2" />
                                    {errors.email && <span className='text-red-600'>Email is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input {...register("password", {
                                        required: true,
                                        maxLength: 20,
                                        minLength: 6,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                    })} type="password" name='password' placeholder="Password" className="input-bordered text-xl py-1 px-2" />
                                    {errors.password?.type === 'required' && <span className='text-red-600'>Password is required
                                    </span>}
                                    {errors.password?.type === 'minLength' && <span className='text-red-600'>Password Must Be 6 Characters
                                    </span>}
                                    {errors.password?.type === 'maxLength' && <span className='text-red-600'>Password Must Be Less Then 20 Characters
                                    </span>}
                                    {errors.password?.type === 'pattern' && <div className='p-2 mt-2 bg-red-300'>
                                        <h4 className='text-xl font-semibold text-red-600 mb-3'>Password Must Have</h4>
                                        <li>One Uppercase</li>
                                        <li>One Lowercase</li>
                                        <li>One Number</li>
                                        <li>One Special Character</li>
                                    </div>}
                                </div>
                                <div className="form-control mt-6">
                                    <input type="submit" value="Sign Up" className='bg-[#d8b682] py-2 font-semibold text-xl text-white cursor-pointer' />
                                </div>
                            </form>
                            <p className='text-center mb-2 text-[#d8b682]'>Allready Have an Account? <Link to="/login" className='font-semibold'>Login</Link></p>
                            <div className='mb-5'>
                                <h4 className='text-center mb-4 font-semibold'>Or Sign Up With</h4>
                                <div>
                                    <SocialLogin></SocialLogin>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;