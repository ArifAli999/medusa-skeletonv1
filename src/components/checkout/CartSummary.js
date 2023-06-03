import { useGetCart } from 'medusa-react';
import React from 'react';
import useCartStore from '../../../store/userCart';
import CartItem from '../cart/cartItem';
import CartSummaryItems from './CartSummaryItems';

function CartSummary() {
    const { cartId } = useCartStore();
    const { cart, isLoading } = useGetCart(cartId);
    return (
        <div className='flex flex-col sticky border border-gray-200 p-4 '>

            <div className='flex items-center w-full  p-2'>
                <h2 className='font-primary text-2xl text-gray-600 flex items-center font-light mb-4 lowercase '>Cart Summary</h2>
            </div>

            <div className='flex flex-col w-full h-full'>
                {cart && cart.items.length > 0 ? cart?.items.map((item, index) => (
                    <CartSummaryItems item={item} />
                )) : (
                    <p>Noo items</p>
                )}
            </div>


            <div className='flex flex-col gap-2 mt-4'>
                <div className='flex flex-row justify-between items-center'>
                    <h3 className='font-primary text-base text-gray-600 flex items-center font-light mb-4 lowercase '>Shipping</h3>
                    <h3 className='font-primary text-base text-gray-600 flex items-center font-light mb-4 lowercase '>$ {cart?.shipping_total / 100}</h3>
                </div>

                <div className='flex flex-row justify-between items-center'>
                    <h3 className='font-primary text-base text-gray-600 flex items-center font-light mb-4 lowercase '>Tax & Deductions</h3>
                    <h3 className='font-primary text-base text-gray-600 flex items-center font-light mb-4 lowercase '>$ {cart?.tax_total / 100}</h3>

                </div>

                <div className='flex flex-row justify-between items-center'>
                    <h3 className='font-primary text-base text-gray-600 flex items-center font-light mb-4 lowercase '>Total</h3>
                    <h3 className='font-primary text-base text-gray-600 flex items-center font-light mb-4 lowercase '>$ {cart?.total / 100}</h3>

                </div>

                <div className='flex flex-row justify-between items-center'>
                    <h3 className='font-primary text-base text-gray-600 flex items-center font-light mb-4 lowercase '>Subtotal</h3>
                    <h3 className='font-primary text-base text-gray-600 flex items-center font-light mb-4 lowercase '>$ {cart?.subtotal / 100}</h3>
                </div>
            </div>


        </div>
    );
}

export default CartSummary;