import React from 'react';
import { Button } from 'theme-ui';
import { useRouter } from 'next/router';
import { AiOutlinePlus } from 'react-icons/ai';


function ProductBox({ id, title, variants, product }) {

    const router = useRouter();

    const handleClick = () => {
        router.push(`/${product.handle}`);
    };


    return (



        <div key={id} className='flex flex-col gap-2 cursor-pointer' onClick={handleClick}>


            <div className=''>
                <img src={product.images[0] && product.images[0].url} alt={title} className='small-image rounded-sm' />


            </div>
                <div className='product-buttons '>

                <h4 className='text-gray-800 font-light antialiased font-sans'>{title}
                    <h6 className='text-gray-800 font-light antialiased font-sans'>
                            $  {variants[0]?.prices[0].amount / 100}
                        </h6>

                    </h4>


                    <AiOutlinePlus size={28} color='#FF5722' />
                </div>
            </div>

    );
}

export default ProductBox;