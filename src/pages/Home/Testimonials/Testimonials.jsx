import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'
import testimonialIcon from '../../../assets/icon/testimonialIcon.png'

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('https://bistro-boss-server-bn9kits5n-prodeveloperbd2.vercel.app/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])
    return (
        <section className='mb-16'>
            <SectionTitle
                subHeading="What Our Clients Say"
                heading="Testimonials"
            ></SectionTitle>
            <div>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {
                        reviews.map(review => <SwiperSlide key={review._id}>
                            <div className='flex flex-col items-center lg:max-w-3xl md:max-w-2xl max-w-sm mx-auto'>
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review?.rating}
                                    readOnly
                                />
                                <img className='lg:w-20 md:w-16 w-10 mt-4 mb-4' src={testimonialIcon} alt="" />
                                <p className='text-center'>{review?.details}</p>
                                <h2 className='lg:text-3xl text-yellow-500 mt-4 md:text-2xl text-xl'>{review?.name}</h2>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonials;