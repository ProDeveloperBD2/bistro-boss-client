import { Link } from 'react-router-dom';
import Logo from '../../../assets/mainLogo.png'
import { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import useCart from '../../../hooks/useCart';
import useAdmin from '../../../hooks/useAdmin';
const NavBar = () => {
    const { user, logOutUser } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [cart] = useCart();
    const handleSignOut = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Sign Out it!'
        }).then((result) => {
            if (result.isConfirmed) {
                logOutUser()
                    .then(() => {
                        Swal.fire(
                            'Sign Out!',
                            'Your Account has been Sign Out.',
                            'success'
                        )
                    })
                    .catch(error => console.log(error))
            }
        })
    }
    const navOptions = <>
        <li className='mr-6 font-semibold'><Link to="/">HOME</Link></li>
        <li className='mr-6 font-semibold'><Link to={isAdmin ? '/dashboard/adminhome': '/dashboard/userhome'}>DASHBOARD</Link></li>
        <li className='mr-6 font-semibold'><Link to="/menu">OUR MENU</Link></li>
        <li className='mr-4 font-semibold'><Link to="/order/salad">
            <button className="flex items-center px-2 py-1">
                ORDER FOOD
                <FaShoppingCart className='text-xl text-green-500'></FaShoppingCart>
                <div className="badge badge-warning text-white">+{cart?.length || 0}</div>
            </button>
        </Link></li>
        {
            user
                ?
                <>
                    <li className='mr-6 font-semibold'><button onClick={handleSignOut}>SIGN OUT</button></li>
                    <img title={user.displayName} className='w-14 h-14 rounded-full' src={user.photoURL} alt="" />
                </>
                :
                <>
                    <li className='mr-6 font-semibold'><Link to="/login">LOGIN</Link></li>
                    <FaUserCircle className='text-4xl mr-2'></FaUserCircle>
                </>
        }
    </>;
    return (
        <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl mx-auto  bg-black text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  bg-black text-white bg-opacity-30 rounded-box w-60 items-center">
                        {navOptions}
                    </ul>
                </div>
                <a href='/' className='w-56 ms-6 cursor-pointer'><img className='w-full' src={Logo} alt="" /></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu-horizontal px-1 items-center">
                    {navOptions}
                </ul>
            </div>
        </div>
    );
};

export default NavBar;