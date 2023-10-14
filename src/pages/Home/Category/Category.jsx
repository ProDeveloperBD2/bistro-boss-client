import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import slideImg1 from '../../../assets/home/slide1.jpg'
import slideImg2 from '../../../assets/home/slide2.jpg'
import slideImg3 from '../../../assets/home/slide3.jpg'
import slideImg4 from '../../../assets/home/slide4.jpg'
import slideImg5 from '../../../assets/home/slide5.jpg'
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const Category = () => {
    return (
        <div className='max-w-screen-lg mx-auto mb-16 mt-14'>
            <SectionTitle
                subHeading="From 11.00am to 10.00pm"
                heading="Order Online"
            ></SectionTitle>
            <Swiper
                slidesPerView={3}
                spaceBetween={10}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src={slideImg1} alt="" />
                    <h3 className='lg:text-3xl md:text-3xl text-xl text-white text-center uppercase font-serif -mt-16'>Salads</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slideImg2} alt="" />
                    <h3 className='lg:text-3xl md:text-3xl text-xl text-white text-center uppercase font-serif -mt-16'>Pizzas</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slideImg3} alt="" />
                    <h3 className='lg:text-3xl md:text-3xl text-xl text-white text-center uppercase font-serif -mt-16'>Soups</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slideImg4} alt="" />
                    <h3 className='lg:text-3xl md:text-3xl text-xl text-white text-center uppercase font-serif -mt-16'>Desserts</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slideImg5} alt="" />
                    <h3 className='lg:text-3xl md:text-3xl text-xl text-white text-center uppercase font-serif -mt-16'>Salads</h3>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Category;