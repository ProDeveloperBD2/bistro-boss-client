import FoodCard from "../../../Components/FoodCard/FoodCard";

const OrderTab = ({ items }) => {
    return (
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-10'>
            {
                items.map(salad => <FoodCard key={salad._id} item={salad}></FoodCard>)
            }
        </div>
    );
};

export default OrderTab;