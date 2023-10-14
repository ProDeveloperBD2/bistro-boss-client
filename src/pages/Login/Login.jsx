import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoginBg from '../../assets/others/authentication.png';
import LoginPic from '../../assets/others/authentication2.png'
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { AuthContext } from '../../providers/AuthProvider';
import { Helmet } from 'react-helmet-async';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const Login = () => {
    const { signInUser } = useContext(AuthContext);
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const [disabled, setDisabled] = useState(true);
    const handleLoginSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(`
         Email: ${email}
         Password: ${password}
        `);
        signInUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                navigate(from, { replace: true })
                Swal.fire({
                    title: 'Success!',
                    text: 'Do you want to continue',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
                form.reset()
            })
            .catch(error => console.log(error))
    }
    const handleValidateCaptcha = event => {
        const user_captcha_value = event.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        }
    }
    return (
        <>
            <Helmet>
                <title>Bistro Boss Restaurant | Login</title>
            </Helmet>
            <div className='min-h-screen w-full pt-24 pb-16' style={{ backgroundImage: `url('${LoginBg}')` }}>
                <div className="hero lg:w-4/5 md:w-4/5 w-full shadow-2xl mx-auto" style={{ backgroundImage: `url('${LoginBg}')` }}>
                    <div className="hero-content flex-col lg:flex-row">
                        <div className=''>
                            <img className='w-full' src={LoginPic} alt="" />
                        </div>
                        <div className="card flex-shrink-0 bg-white bg-opacity-0 w-full max-w-sm">
                            <h2 className='text-3xl font-bold mt-5 text-center'>Login</h2>
                            <form onSubmit={handleLoginSubmit} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name='email' placeholder="Email" className="input-bordered text-xl py-1 px-2" required />
                                </div>
                                <div className="form-control mb-2">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" name='password' placeholder="Password" className="input-bordered text-xl py-1 px-2" required />
                                </div>
                                <div className="form-control">
                                    <label className="mb-2">
                                        <LoadCanvasTemplate />
                                    </label>
                                    <input onBlur={handleValidateCaptcha} type="text" name='captcha' placeholder="Type Here" className="input-bordered text-xl py-1 px-2" />
                                </div>
                                <div className="form-control mt-6">
                                    <input disabled={disabled} type="submit" value="Sign In" className={`${disabled ? 'bg-[#EBEBE4] py-2 font-semibold text-xl text-white cursor-pointer' : 'bg-[#d8b682] py-2 font-semibold text-xl text-white cursor-pointer'}`} />
                                </div>
                            </form>
                            <p className='text-center mb-2 text-[#d8b682]'>New Here? <Link to="/register" className='font-semibold'>Create a New Account</Link></p>
                            <div className='mb-5'>
                                <h4 className='text-center mb-4 font-semibold'>Or Sign in With</h4>
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

export default Login;