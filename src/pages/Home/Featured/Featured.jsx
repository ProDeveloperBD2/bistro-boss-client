import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg'
import './Featured.css'

const Featured = () => {
    return (
        <section className="featured-items bg-opacity-20 bg-fixed mb-16">
            <div className="bg-black bg-opacity-25  pt-1">
                <SectionTitle
                    subHeading="Check it Out"
                    heading="Featured Item"
                ></SectionTitle>
                <div className="lg:flex md:flex-1 justify-center items-center pb-24 px-16  gap-16">
                    <div className="mb-6 w-full">
                        <img src={featuredImg} alt="" />
                    </div>
                    <div>
                        <h3 className="text-white text-2xl mb-3">March 20, 2023</h3>
                        <h3 className="text-white text-xl mb-1">WHERE CAN I GET SOME?</h3>
                        <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                        <button className="mt-10 font-semibold mx-auto border-b-4 hover:bg-white hover:text-black border-white text-white duration-200 py-2 px-4 rounded-lg">READ MORE</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Featured;