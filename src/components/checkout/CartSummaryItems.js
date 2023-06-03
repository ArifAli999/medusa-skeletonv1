import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

function CartSummaryItems({ item }) {
  return (
    <div className='flex flex-row w-full bg-gray-50 border-b border-b-gray-200 justify-between p-2 gap-4 items-center'>

      <div className=' flex flex-row gap-2 items-center '>
        <img src={item.thumbnail} alt={item.title}
          className=' w-[80px] min-h-[80px] object-cover ' />
        <h3 className=' text-md xl:text-sm font-light font-primary tracking-wider text-gray-800 flex items-center '>
          {item.title}</h3>
      </div>




      <AiOutlineClose color='black' size={20} className='' />



    </div>
  );
}

export default CartSummaryItems;