import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import menuBG from '../../../assets/menu/banner3.jpg'
import dessertBG from '../../../assets/menu/dessert-bg.jpeg'
import pizzaBG from '../../../assets/menu/pizza-bg.jpg'
import saladBG from '../../../assets/menu/salad-bg.jpg'
import soupBG from '../../../assets/menu/soup-bg.jpg'
import useMenu from '../../../hooks/useMenu';
import MenuCategory from '../MenuCategory/MenuCategory';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
const Menu = () => {
    const [menu] = useMenu();
    const offered = menu.filter(item => item.category === 'offered');
    const desserts = menu.filter(item => item.category === 'dessert');
    const pizzas = menu.filter(item => item.category === 'pizza');
    const salads = menu.filter(item => item.category === 'salad');
    const soups = menu.filter(item => item.category === 'soup');
    return (
        <div>
            <Helmet>
                <title>Bistro Boss Restaurant | Our Menu</title>
            </Helmet>
            <Cover
                bgImg={menuBG}
                title="our menu"
                details="WOULD YOU LIKE TO TRY A DISH?"
            ></Cover>
            <div>
                <SectionTitle subHeading="Don't miss" heading="today's offer"></SectionTitle>
                <MenuCategory routeName={"drinks"} items={offered}></MenuCategory>
            </div>
            <Cover
                bgImg={dessertBG}
                title="desserts"
                details="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            ></Cover>
            <div className='mt-10'>
                <MenuCategory routeName={"dessert"} items={desserts}></MenuCategory>
            </div>
            <Cover
                bgImg={pizzaBG}
                title="pizzas"
                details="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            ></Cover>
            <div className='mt-10'>
                <MenuCategory routeName={"pizza"} items={pizzas}></MenuCategory>
            </div>
            <Cover
                bgImg={saladBG}
                title="salads"
                details="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            ></Cover>
            <div className='mt-10'>
                <MenuCategory routeName={"salad"} items={salads}></MenuCategory>
            </div>
            <Cover
                bgImg={soupBG}
                title="soups"
                details="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            ></Cover>
            <div className='mt-10 mb-16'>
                <MenuCategory routeName={"soup"} items={soups}></MenuCategory>
            </div>
        </div>
    );
};

export default Menu;