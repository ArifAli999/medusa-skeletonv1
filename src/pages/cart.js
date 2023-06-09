import React, { useState } from 'react';
import useCartStore from '../../store/userCart';
import { useDeleteLineItem, useGetCart } from 'medusa-react';
import AppHeader from '../components/header/AppHeader';
import { AiFillDelete, AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import CartItem from '../components/cart/cartItem';
import CartTotals from '../components/cart/cartTotals';
import { useQueryClient } from 'react-query';
import deleteItem from '../utils/delete-item';
import { useRouter } from 'next/router';

function UserCart() {
    const { cartId } = useCartStore();
    const { cart, isLoading } = useGetCart(cartId);
    const [loading, setLoading] = useState(false);
    const router = useRouter();






    async function startCheckout() {
        if (!cart) throw new Error('Something went wrong!');
        setLoading(true);
        try {
            await router.push(`/secure`);
        } catch (error) {
            // Handle any potential errors during the route push
        } finally {
            setLoading(false);
        }

    }


    if (isLoading) {
        return <div>Loading...</div>;
    }

    function generateOptions(variant) {
        let name = variant.title;


        if (name.length > 2) {
            // means there is a color property in the namme string (eg: 'L / Black')
            let splitName = name.split(' / ');
            let size = splitName[0];
            let color = splitName[1];
            console.log(size, color);
            return (
                <div className='flex  gap-4  mt-2'>
                    <div className='border bg-primary border-primary min-w-[60px] max-w-[80px] px-4 flex items-center justify-center rounded-full '>
                        <h4 className='text-white font-bold truncate'>{size}</h4>
                    </div>

                    <div className='border bg-primary border-primary min-w-[60px] max-w-[80px] px-4 flex items-center justify-center rounded-full '>
                        <h4 className='text-white font-bold'>{color}</h4>
                    </div>
                </div>
            );
        }
        else {
            // means there is no color property in the namme string (eg: 'L')
            return (
                <div className='flex  gap-4  mt-2'>
                    <div className='border bg-primary border-primary min-w-[60px] max-w-[80px] px-4 flex items-center justify-center rounded-full '>
                        <h4 className='text-white font-bold truncate'>{name}</h4>
                    </div>
                </div>
            );
        }
    }

    return (

        <main className="mainContainer">
            {loading ?
                (
                    <div className='w-full h-full bg-white flex items-center justify-center'>
                        <h2 className='font-secondary text-black text-2xl'>

                            Setting things up..
                        </h2>
                    </div>
                )
                :
                (
                    <><AppHeader /><div className='mb-4 w-full flex items-center justify-center'>
                        <h2 className='text-6xl text-center font-thin font-secondary text-black'>
                            shopping cart
                        </h2>
                    </div><div className='flex xl:flex-row flex-col gap-8 relative'>


                            <div className='xl:w-[85%] gap-4 flex flex-col'>


                                {cart && cart.items.length > 0 ? cart?.items.map((item, index) => (
                                    <CartItem item={item} generateOptions={generateOptions} key={item.id} />
                                )) : (
                                    <p>Noo items</p>
                                )}


                            </div>



                            <div className=' xl:w-[30%] flex flex-col ml-0 '>
                                <div className='sticky top-4 right-0'>
                                    <h2 className='font-secondary text-4xl  text-black '>
                                        cart summary
                                    </h2>

                                    <div className='flex flex-col gap-4 mt-4'>

                                        <CartTotals label={'original price'} value={cart?.subtotal} />

                                        <CartTotals label={'discount'} value={cart?.discount_total} />

                                        <CartTotals label={'shipping'} value={cart?.shipping_total} />

                                        <CartTotals label={'tax & deductions'} value={cart?.tax_total} />

                                        <CartTotals label={'total'} value={cart?.total} />


                                        <button className='w-full min-h-[22px] disabled:bg-gray-400 bg-primary cursor-pointer p-2.5 rounded-md'
                                            disabled={cart.items.length === 0}
                                            onClick={startCheckout}

                                        >
                                            <h2 className='text-white text-center font-primary text-lg'>
                                                checkout
                                            </h2>
                                        </button>
                                    </div>
                                </div>
                            </div>


                        </div></>


                )}
        </main>
    );
}

export default UserCart;