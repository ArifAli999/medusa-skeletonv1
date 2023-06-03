import React from 'react';
import { useCartShippingOptions } from "medusa-react";
import useCartStore from '../../../store/userCart';
import ShippingBoxes from './ui/ShippingBoxes';


function ShippingStep() {

  const { cartId } = useCartStore();
  const { shipping_options, isLoading } = useCartShippingOptions(cartId);

  if (isLoading) {
    return <div>loading...</div>;
  }

  console.log(shipping_options);
  return (

    <div className='flex mt-4 mb-4 items-center flex-col justify-center'>

      <div className='flex w-full h-full flex-col mt-10 gap-12 xl:p-10'>

        {shipping_options && shipping_options.map((option) =>
          <ShippingBoxes name={option.name} price={option.amount} id={option.id} />
        )}

      </div>

    </div>
  );
}

export default ShippingStep;