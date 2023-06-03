import React from 'react';
import { useCartShippingOptions } from "medusa-react";
import useCartStore from '../../../store/userCart';


function ShippingStep() {

  const { cartId } = useCartStore();
  const { shipping_options, isLoading } = useCartShippingOptions(cartId);

  if (isLoading) {
    return <div>loading...</div>;
  }

  console.log(shipping_options);
  return (

    <div className='flex mt-4 mb-4 items-center justify-center flex-col gap-10'>
      <h2 className='text-2xl mt-6 font-secondary text-black transition-all ease-linear duration-300 scale-105 hover:text-black/80'>
        select your preferred shipping method
      </h2>

      <div className='flex flex-col gap-4 mt-6 border border-black p-4 w-full h-full rounded'>

      </div>
    </div>
  );
}

export default ShippingStep;