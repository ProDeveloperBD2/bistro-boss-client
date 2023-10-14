import { Link } from "react-router-dom";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items, routeName }) => {
    return (
        <div>
            <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-10 mb-4  lg:max-w-screen-xl md:max-w-screen-lg md:gap-10 gap-1 mx-auto">
                {
                    items.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <div className="w-[270px] mx-auto mb-16">
                <Link to={`/order/${routeName}`}><button className="mt-10 font-semibold border-b-4 hover:bg-black hover:text-white border-black text-black duration-200 py-2 px-4 rounded-lg">ORDER YOUR FAVOURITE FOOD</button></Link>
            </div>
        </div>
    );
};

export default MenuCategory;