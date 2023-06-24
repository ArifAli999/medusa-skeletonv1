import React from 'react';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { useAddShippingMethodToCart } from "medusa-react";


function ShippingBoxes({ name, price, id, selected, setSelected, cartId }) {

    const addShippingMethod = useAddShippingMethodToCart(cartId)


    const calculatedPrice = price / 100;

    const handleSelect = () => {
        console.log('selected');
        setSelected(id);
        addShippingMethod.mutate({
            option_id: id,
        });
    };
    // help me write a tailwind conditional class

    <div className={`${selected === id ? 'bg-red-500' : 'bg-blue-500'}`}></div>


    return (
        <div className={`${selected === id ? 'border-b-primary flex flex-row w-full justify-between items-center border  p-6 rounded border-b-4 group hover:border-b transition-all duration-150 cursor-pointer' : 'flex flex-row w-full justify-between items-center border border-gray-300 p-6 rounded border-b-2 group hover:border-b transition-all duration-150 cursor-pointer'}`} key={id} onClick={handleSelect}>
            <div className='flex flex-col gap-2'>
                <h2 className='text-xl font-secondary text-black lowercase '>{name} shipping</h2>
                <div className='flex flex-row items-center gap-2'>
                    <MdOutlineLocalShipping className='text-2xl text-gray-400' size={18} />
                    <h2 className='text-sm font-primary text-gray-600'>delivery in 2-3 days</h2>
                </div>
                <h2 className='text-base font-primary text-black'>€{calculatedPrice}</h2>
            </div>


            <div className=''>
                {selected === id ?
                    <div className='w-6 h-6 transition-all duration-300 ease-in-out bg-primary rounded-full flex items-center justify-center'>
                        <div className='w-3 h-3 bg-white rounded-full transition-all duration-300 ease-in-out'></div>
                    </div> : <div className='w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out'>
                        <div className='w-3 h-3 bg-white rounded-full transition-all duration-300 ease-in-out'></div>
                    </div>
                }
            </div>

        </div>
    );
}

export default ShippingBoxes;