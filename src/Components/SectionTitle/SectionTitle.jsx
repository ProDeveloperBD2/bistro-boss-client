
const SectionTitle = ({ subHeading, heading }) => {
    return (
        <div className="lg:w-96 md:w-80 text-center mx-auto mb-14">
            <p className="text-yellow-500 lg:text-lg md:text-lg text-sm italic mb-2">--- {subHeading} ---</p>
            <h2 className="lg:text-3xl text-slate-500 md:text-2xl text-xl uppercase border-y-4 py-2">{heading}</h2>
        </div>
    );
};

export default SectionTitle;