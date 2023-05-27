import React from 'react';
import { AiFillDelete, AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useDeleteLineItem } from "medusa-react";
import useCartStore from '../../../store/userCart';
import { useQueryClient } from 'react-query';
import deleteItem from '../../utils/delete-item';


function CartItem({ item, generateOptions }) {
    const { cartId } = useCartStore();
    const deleteLineItem = useDeleteLineItem(cartId);
    const queryClient = useQueryClient();


    async function handleDelete() {
        await deleteItem(item.id, deleteLineItem);
        queryClient.invalidateQueries();
    }




    return (
        <div className='border border-gray-400 rounded items-center flex flex-row gap-2 '>
            <div className=' max-w-[40%] '>
                <img src={item.thumbnail} alt={item.title}
                    className=' w-[200px] min-h-[200px] object-fit ' />
            </div>

            <div className='w-full relative flex-col xl:flex-row flex xl:items-center gap-4 xl:gap-0 justify-between   min-h-[180px] p-4'>
                <div className=''>
                    <h3 className='
                                   text-md xl:text-xl font-light font-primary tracking-wider text-gray-800
                                    flex items-center 

                                    '>{item.title}</h3>
                    <h2 className='text-sm font-light font-primary text-gray-600'>
                        {generateOptions(item.variant)}
                    </h2>
                </div>

                <div className='w-fit flex flex-row items-center gap-2 border border-gray-400 px-2.5 py-1  xl:px-1 xl:py-0 rounded-full'>

                    <button className='bg-white rounded-full xl:p-1.5'>
                        <AiOutlinePlus color='black' size={20} />
                    </button>
                    <h3 className=' p-0  text-gray-700'>{item.quantity}</h3>
                    <button className='bg-white rounded-full xl:p-1.5'>
                        <AiOutlineMinus color='black' size={20} />
                    </button>
                </div>

                <div className=''>

                    <h3 className='text-black font-normal font-secondary text-base'>${item.unit_price / 100}</h3>
                </div>

                <div className='absolute top-0 p-2 cursor-pointer right-0' onClick={handleDelete}>
                    <AiOutlineClose color='black' size={22} />
                </div>


            </div>


        </div>
    );
}

export default CartItem;