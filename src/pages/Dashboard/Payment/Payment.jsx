import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useCart from "../../../hooks/useCart";


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payment = () => {
    const [cart] = useCart();
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const price = parseFloat(total.toFixed(2));
    return (
        <div className="m-10">
            <Helmet>
                <title>Bistro Boss Restaurant | Payment</title>
            </Helmet>
            <div>
                <SectionTitle subHeading="Please Provide" heading="payment"></SectionTitle>
            </div>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm cart={cart} price={price}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;