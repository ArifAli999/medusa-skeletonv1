import React from 'react';
import { useCartShippingOptions } from "medusa-react";
import useCartStore from '../../../store/userCart';
import ShippingBoxes from './ui/ShippingBoxes';


function ShippingStep() {

  const { cartId } = useCartStore();
  const { shipping_options, isLoading } = useCartShippingOptions(cartId);
  const [selected, setSelected] = React.useState();

  if (isLoading) {
    return <div>loading...</div>;
  }

  console.log(shipping_options);
  return (

    <div className='flex mb-4 items-center flex-col justify-between  h-full min-h-[600px]'>

      <div className='flex  w-full mx-auto h-full flex-col  gap-12 '>

        {shipping_options && shipping_options.map((option) =>
          <ShippingBoxes name={option.name} price={option.amount} id={option.id}
            selected={selected} setSelected={setSelected}
          />
        )}

      </div>


      <div className='flex items-center w-full justify-center'>
        <button className='bg-black rounded-full disabled:bg-gray-600 text-white px-6 py-4  font-primary font-light text-sm'
          disabled={!selected}
        >
          save and continue
        </button>
      </div>

    </div>
  );
}

export default ShippingStep;