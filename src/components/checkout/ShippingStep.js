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

    <div className='flex mb-4 items-center flex-col justify-center'>

      <div className='flex  w-full mx-auto h-full flex-col  gap-12 '>

        {shipping_options && shipping_options.map((option) =>
          <ShippingBoxes name={option.name} price={option.amount} id={option.id}
            selected={selected} setSelected={setSelected}
          />
        )}

      </div>

    </div>
  );
}

export default ShippingStep;