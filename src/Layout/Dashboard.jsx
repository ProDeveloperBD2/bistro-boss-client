import { FaShoppingCart, FaHome, FaCalendarAlt, FaWallet, FaShoppingBag, FaList, FaUtensils, FaListUl, FaBook, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    const [cart] = useCart();
    const [isAdmin] = useAdmin();
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <label htmlFor="my-drawer-2" className="bg-yellow-600 font-semibold text-white text-xl px-14 py-2 flex items-center gap-10 cursor-pointer drawer-button lg:hidden"><FaList></FaList> OPEN SIDBER</label>
                <div>
                    <Outlet></Outlet>
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="p-4 w-80 min-h-full bg-yellow-600">
                    {
                        isAdmin ? <>
                            <li><NavLink className="text-lg font-semibold mb-6 flex items-center gap-3" to="/dashboard/adminhome"><FaHome></FaHome> ADMIN HOME</NavLink></li>
                            <li><NavLink className="text-lg font-semibold mb-6 flex items-center gap-3" to="/dashboard/addItem"><FaUtensils></FaUtensils> ADD ITEMS</NavLink></li>
                            <li><NavLink className="text-lg font-semibold mb-6 flex items-center gap-3" to="/dashboard/manageItems"><FaListUl></FaListUl> MANAGE ITEMS</NavLink></li>
                            <li><NavLink className="text-lg font-semibold mb-6 flex items-center gap-3" to="/dashboard/history"><FaBook></FaBook> MANAGE BOOKINGS</NavLink></li>
                            <li><NavLink className="text-lg font-semibold mb-6 flex items-center gap-3" to="/dashboard/allusers"><FaUsers></FaUsers> ALL USERS</NavLink></li>
                        </> : <>
                            <li><NavLink className="text-lg font-semibold mb-6 flex items-center gap-3" to="/dashboard/userhome"><FaHome></FaHome> USER HOME</NavLink></li>
                            <li><NavLink className="text-lg font-semibold mb-6 flex items-center gap-3" to="/dashboard/reservations"><FaCalendarAlt></FaCalendarAlt> RESERVATIONS</NavLink></li>
                            <li><NavLink className="text-lg font-semibold mb-6 flex items-center gap-3" to="/dashboard/history"><FaWallet></FaWallet> PAYMENT HISTORY</NavLink></li>
                            <li><NavLink className="text-lg font-semibold mb-6 flex items-center gap-3" to="/dashboard/mycart"><FaShoppingCart></FaShoppingCart> MY CART <span className="badge badge-warning text-white">+{cart?.length || 0}</span></NavLink></li>
                        </>
                    }

                    <div className="border-2 mt-5 mb-5"></div>

                    <li><NavLink className="text-lg font-semibold mb-6 flex items-center gap-3" to="/"><FaHome></FaHome> HOME</NavLink></li>
                    <li><NavLink className="text-lg font-semibold mb-6 flex items-center gap-3" to="/menu"><FaList></FaList> OUR MENU</NavLink></li>
                    <li><NavLink className="text-lg font-semibold mb-6 flex items-center gap-3" to="/order/salad"><FaShoppingBag></FaShoppingBag> OUR SHOP</NavLink></li>
                </ul>
            </div>
        </div >
    );
};

export default Dashboard;