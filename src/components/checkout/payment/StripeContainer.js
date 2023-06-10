import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import Form from "./Form";
import { loadStripe } from "@stripe/stripe-js";
import Medusa from "@medusajs/medusa-js";
import { useGetCart } from "medusa-react";
import useCartStore from "../../../../store/userCart";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export default function Container() {
    const [clientSecret, setClientSecret] = useState();
    const client = new Medusa();
    const { cartId } = useCartStore();
    const { cart, isLoading } = useGetCart(cartId);

    useEffect(() => {
        cart &&
            client.carts.createPaymentSessions(cart.id)
                .then(({ cart }) => {
                    // check if stripe is selected
                    const isStripeAvailable = cart.payment_sessions?.some(
                        (session) => (
                            session.processor_id === "stripe"
                        )
                    );
                    if (!isStripeAvailable) {
                        return;
                    }

                    // select stripe payment session
                    client.carts.setPaymentSession(cart.id, {
                        processor_id: "stripe",
                    }).then(({ cart }) => {
                        setClientSecret(cart && cart.payment_session.data.client_secret);
                        console.log(cart.payment_session.data.client_secret);
                    });
                });
    }, []);


    return (
        <div>
            <h2>

                payment
            </h2>
            {cart.payment_session.data.client_secret && (
                <Elements stripe={stripePromise} options={{
                    clientSecret: cart.payment_session.data.client_secret,
                }}>
                    <Form clientSecret={cart.payment_session.data.client_secret} cartId={cartId} />
                </Elements>
            )}
        </div>
    );
};