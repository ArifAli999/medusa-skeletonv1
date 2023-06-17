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
            client.carts.createPaymentSessions(cartId)
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
                    });
                });
    }, []);


    async function saveAddress() {
        client.carts.update(cartId, {
            shipping_address: {
                company: 'company',
                first_name: 'Ali',
                last_name: 'Arif',
                address_1: '9 Union Studios',
                address_2: '2 Union St',
                city: 'Newcastle',
                country_code: 'ar',
                postal_code: 'NE21BX',
                province: 'Newcastle',
                phone: '07774366098',
            },
        })
            .then(({ cart }) => {
                console.log(cart.shipping_address);
            });
    }

    console.log(cart);
    return (
        <div>
            <h2>

                payment
            </h2>

            <button onClick={saveAddress}>save address</button>
            {cart && cart?.payment_session?.data?.client_secret && (
                <Elements stripe={stripePromise} options={{
                    clientSecret: cart.payment_session.data.client_secret,
                }}>
                    <Form clientSecret={cart.payment_session.data.client_secret} cartId={cartId} />
                </Elements>
            )}
        </div>
    );
};