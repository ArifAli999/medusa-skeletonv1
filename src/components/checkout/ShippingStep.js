import React from 'react';
import { useCartShippingOptions } from "medusa-react";
import useCartStore from '../../../store/userCart';
import ShippingBoxes from './ui/ShippingBoxes';
import { toast } from 'react-hot-toast';


function ShippingStep({ shipping, setShipping, setActiveStep }) {

  const { cartId } = useCartStore();
  const { shipping_options, isLoading } = useCartShippingOptions(cartId);
  const [selected, setSelected] = React.useState();
  const [loading, setLoading] = React.useState(false);

  if (isLoading) {
    return <div>loading...</div>;
  }

  async function handleShippingChange() {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    toast.success('shipping method saved');
    setActiveStep(2);
  }


  return (

    <div className='flex mb-4 items-center flex-col justify-between  h-full min-h-[600px]'>

      <div className='flex  w-full mx-auto h-full flex-col  gap-12 '>

        {shipping_options && shipping_options.map((option) =>
          <ShippingBoxes name={option.name} price={option.amount} id={option.id}
            selected={shipping} setSelected={setShipping} key={option.id}
          />
        )}

      </div>


      <div className='flex items-center w-full justify-center'>
        <button className='bg-black rounded-full disabled:bg-gray-600 text-white px-6 py-4  font-primary font-light text-sm'
          disabled={loading}
          onClick={handleShippingChange}
        >
          {loading ? 'loading...' : 'Continue'}
        </button>
      </div>

    </div>
  );
}

export default ShippingStep;