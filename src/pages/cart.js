import React from 'react';
import useCartStore from '../../store/userCart';
import { useGetCart } from 'medusa-react';
import AppHeader from '../components/header/AppHeader';
import { AiFillDelete, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

function UserCart() {
    const { cartId } = useCartStore();
    const { cart, isLoading } = useGetCart(cartId);
    // console.log(cart);

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
                <div className='cartItemOptions'>
                    <div className='cartItemOption'>
                        <h4>{size}</h4>
                    </div>

                    <div className='cartItemOption'>
                        <h4>{color}</h4>
                    </div>
                </div>
            );
        }
        else {
            // means there is no color property in the namme string (eg: 'L')
            return (
                <div className='cartItemOptions'>
                    <div className='cartItemOption'>
                        <h3> {name}</h3>
                    </div>
                </div>
            );
        }
    }

    return (
        <main className="mainContainer">
            <AppHeader />




            <div className='mb-4 w-full flex items-center justify-center'>
                <h2 className='text-4xl text-center font-thin font-sans text-black'>
                    shopping cart
                </h2>
            </div>


            <div className='flex xl:flex-row flex-col gap-4'>


                <div className='xl:w-[85%] gap-4 flex flex-col'>


                        {cart?.items.map((item) => (
                            <div className='border border-gray-400 pr-4 rounded items-center flex flex-row gap-4 relative'>
                                <div className='xl:max-w-[20%] max-h-[180px]'>
                                    <img src={item.thumbnail} alt={item.title}
                                        className=' w-[120px] xl:w-[200px] h-[180px] object-cover ' />
                                </div>

                                <div className='w-full flex-row flex items-center justify-between relative  h-full'>
                                    <div className=''>
                                        <h3 className='
                                   text-md xl:text-xl font-light font-sans text-black
                                    flex items-center 

                                    '>{item.title}</h3>
                                        <h2 className='text-base font-light font-sans text-black'>
                                        {generateOptions(item.variant)}
                                        </h2>
                                    </div>

                                    <div className='flex flex-row items-center gap-2 border p-2 xl:px-1 xl:py-0.5 rounded-full'>

                                        <button className='bg-white rounded-full xl:p-1.5'>
                                            <AiOutlinePlus color='black' size={22} />
                                        </button>
                                        <h3>{item.quantity}</h3>
                                        <button className='bg-white rounded-full xl:p-1.5'>
                                            <AiOutlineMinus color='black' size={22} />
                                        </button>
                                    </div>

                                    <div className=''>

                                        <h3 className='text-black font-light font-sans text-base'>${item.unit_price / 100}</h3>
                                    </div>

                                    <div className=' absolute right-0 top-2'>

                                        <AiFillDelete color='#dc4e43c2' size={22} />

                                    </div>
                                </div>


                            </div>
                        ))}


                    </div>



                <div className=' xl:w-[30%] bg-gray-100'>
                    side
                </div>


            </div>



        </main>
    );
}

export default UserCart;