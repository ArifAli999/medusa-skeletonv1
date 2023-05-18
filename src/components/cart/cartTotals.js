import React from 'react';

function CartTotals({ label, value }) {
    return (
        <div className='flex flex-row justify-between border-b pb-2 p-1'>

            <h3 className='font-primary text-base text-gray-500 '>
                {label}
            </h3>
            <h3 className='font-primary text-base text-black  '>
                $ {value / 100}
            </h3>

        </div>

    );
}

export default CartTotals;