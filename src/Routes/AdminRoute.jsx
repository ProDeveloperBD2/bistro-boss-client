import { Navigate, useLocation } from 'react-router-dom';
import loadinImg from '../assets/others/cupcake-dribbble.gif'
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();
    if (loading || isAdminLoading) {
        return <div className='flex min-h-screen justify-center items-center'>
            <img className='w-72' src={loadinImg} alt="" />
        </div>;
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;