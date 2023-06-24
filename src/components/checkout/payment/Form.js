import {
    CardElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import { useCart } from "medusa-react";
import Medusa from "@medusajs/medusa-js";


export default function Form({ clientSecret, cartId }) {
    const stripe = useStripe();
    const elements = useElements();
    const { completeCheckout, startCheckout } = useCart();
    const client = new Medusa();




    async function handlePayment(e) {
        e.preventDefault();
        // TODO handle payment
        return stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Aarif',
                    email: 'aarif14@hotmail.com',
                    phone: '1234567890',
                    address: {
                        city: 'Toronto',
                        country: 'Canada',
                        line1: '123 Fake Street',
                        line2: 'Apt 1',
                        postal_code: 'M1M1M1',
                    },
                },
            },
        }).then(({ error, paymentIntent }) => {
            // TODO handle errors
            client.carts.complete(cartId).then(
                (resp) => console.log(resp)
            );
        })
    }

    return (
        <form>
            <CardElement />
            <button onClick={handlePayment}>Submit</button>
        </form>
    );
};