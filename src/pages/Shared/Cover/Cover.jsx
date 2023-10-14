
const Cover = ({ bgImg, title, details }) => {
    return (
        <div className="hero lg:h-[500px] bg-fixed md:h-[380px] h-[300px] w-full" style={{ backgroundImage: `url("${bgImg}")` }}>
            <div className=""></div>
            <div className="hero-content text-center text-neutral-content bg-black lg:px-48 lg:py-14 md:px-32 md:py-8 px-20 py-6 bg-opacity-50">
                <div className="max-w-md">
                    <h1 className="mb-5 lg:text-5xl md:text-4xl text-2xl font-bold uppercase font-serif text-white">{title}</h1>
                    <p className="mb-5 font-mono font-semibold lg:text-lg md:text-lg text-sm text-white">{details}</p>
                </div>
            </div>
        </div>
    );
};

export default Cover;