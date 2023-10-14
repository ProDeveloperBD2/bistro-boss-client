import { useState } from 'react';
import orderBg from '../../../assets/shop/banner2.jpg'
import Cover from '../../Shared/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../hooks/useMenu';
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Order = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks']
    const { category } = useParams();
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [menu] = useMenu();
    const desserts = menu.filter(item => item.category === 'dessert');
    const pizzas = menu.filter(item => item.category === 'pizza');
    const salads = menu.filter(item => item.category === 'salad');
    const soups = menu.filter(item => item.category === 'soup');
    const drinks = menu.filter(item => item.category === 'drinks');
    return (
        <div>
            <Helmet>
                <title>Bistro Boss Restaurant | Order Food</title>
            </Helmet>
            <Cover bgImg={orderBg} title="order food" details="WOULD YOU LIKE TO TRY A DISH?"></Cover>
            <div className='mb-16 mt-16'>
                <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList className={`lg:w-[410px] md:w-[410px] w-[300px] mx-auto flex lg:gap-12 md:gap-8 gap-2`}>
                        <Tab className={`lg:text-xl md:text-lg text-sm text-yellow-500 cursor-pointer`}>SALADS</Tab>
                        <Tab className={`lg:text-xl md:text-lg text-sm text-yellow-500 cursor-pointer`}>PIZZAS</Tab>
                        <Tab className={`lg:text-xl md:text-lg text-sm text-yellow-500 cursor-pointer`}>SOUPS</Tab>
                        <Tab className={`lg:text-xl md:text-lg text-sm text-yellow-500 cursor-pointer`}>DESSERTS</Tab>
                        <Tab className={`lg:text-xl md:text-lg text-sm text-yellow-500 cursor-pointer`}>DRINKS</Tab>
                    </TabList>
                    <TabPanel>
                        <OrderTab items={salads}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={pizzas}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={soups}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={desserts}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={drinks}></OrderTab>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default Order;