import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useForm } from 'react-hook-form';
import { FaUtensils } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;
const AddItem = () => {
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;
    const onSubmit = data => {
        const formData = new FormData();
        formData.append('image', data.image[0])
        fetch(image_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    const { name, price, recipe, category } = data;
                    const newItem = { name, price: parseFloat(price), recipe, category, image: imgURL };
                    console.log(newItem);
                    axiosSecure.post('/menu', newItem)
                        .then(data => {
                            console.log('after posting new menu item', data.data)
                            if (data.data.insertedId) {
                                reset();
                                Swal.fire({
                                    title: 'Success!',
                                    text: 'Menu Added Successfully',
                                    icon: 'success',
                                    confirmButtonText: 'Ok'
                                })
                            }
                        })
                }
            })
    };

    return (
        <div className="m-5">
            <Helmet>
                <title>Bistro Boss Restaurant | Add an Item</title>
            </Helmet>
            <div>
                <SectionTitle subHeading="What's New?" heading="add an item"></SectionTitle>
            </div>
            <div className="bg-slate-100 p-10">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="font-semibold">Recipe Name<span className="text-red-600">*</span></label>
                        <br />
                        <input className="w-full mt-2 text-lg px-2 py-1" type="text"
                            {...register("name", { required: true, maxLength: 80 })}
                            id="name" placeholder="Recipe Name" />
                    </div>
                    <div className="flex gap-10 mt-5">
                        <div className="w-full">
                            <label className="font-semibold">Category<span className="text-red-600">*</span></label>
                            <br />
                            <select defaultValue="Category" {...register("category", { required: true })} className="select rounded-none bg-white text-black select-bordered w-full mt-2">
                                <option disabled>Category</option>
                                <option>salad</option>
                                <option>pizza</option>
                                <option>soup</option>
                                <option>dessert</option>
                                <option>drinks</option>
                            </select>
                        </div>
                        <div className="w-full">
                            <label className="font-semibold">Price<span className="text-red-600">*</span></label>
                            <br />
                            <input className="w-full mt-2 text-lg px-2 py-2" type="number" id="price"
                                {...register("price", { required: true })}
                                placeholder="Price" />
                        </div>
                    </div>
                    <div className="mt-5">
                        <label className="font-semibold">RecipeDetails<span className="text-red-600">*</span></label>
                        <br />
                        <textarea {...register("recipe", { required: true })} className="w-full text-lg textarea textarea-bordered bg-white text-black" type="text" id="details" placeholder="Recipe Details" />
                    </div>
                    <div className="mt-5">
                        <input type="file" {...register("image", { required: true })} className="file-input bg-white text-black file-input-bordered file-input-warning w-full max-w-xs" />
                    </div>
                    <div className="flex w-32 mt-6 text-lg items-center gap-3 cursor-pointer bg-yellow-600 px-3 p-2 font-semibold text-white">
                        <FaUtensils></FaUtensils>
                        <input type="submit" className="text-white cursor-pointer" value="Add Item" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItem;