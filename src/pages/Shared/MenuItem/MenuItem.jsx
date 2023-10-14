
const MenuItem = ({ item }) => {
    const { name, recipe, image, price } = item;
    return (
        <div className="flex space-x-4 items-center p-2">
            <img style={{ borderRadius: '0px 200px 200px 200px' }} className="lg:w-[120px] lg:h-[100px] md:w-[100px] md:h-[80px] w-[80px] h-[60px]" src={image} alt="" />
            <div>
                <h2 className="lg:text-2xl md:text-xl text-xl">{name} ----</h2>
                <p className="lg:text-lg md:text-sm text-sm">{recipe}</p>
            </div>
            <h5 className="text-yellow-500 lg:text-xl md:text-lg font-semibold">${price}</h5>
        </div>
    );
};

export default MenuItem;