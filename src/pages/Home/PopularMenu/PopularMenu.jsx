import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";
import { Link } from "react-router-dom";

const PopularMenu = () => {
    const [menu] = useMenu();
    const popularItems = menu.filter(pl => pl.category === 'popular');
    return (
        <section>
            <SectionTitle
                subHeading="Popular Items"
                heading="From Our Menu"
            ></SectionTitle>
            <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-10 mb-4  lg:max-w-screen-xl md:max-w-screen-lg md:gap-10 gap-1 mx-auto">
                {
                    popularItems.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <div className="w-44 mx-auto mb-16">
                <Link to="/menu">
                    <button className="mt-10 font-semibold border-b-4 hover:bg-black hover:text-white border-black text-black duration-200 py-2 px-4 rounded-lg">VIEW FULL MENU</button>
                </Link>
            </div>
        </section>
    );
};

export default PopularMenu;