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
        <div key={id} className='product' onClick={handleClick}>


            <div className='product-image'>

                <img src={product.images[0] && product.images[0].url} alt={title} className='small-image' />

                <span className='product-price-pill'>
                    new
                </span>

                <div className='product-buttons '>

                    <h4 className='light-gray-text title-flex'>{title}
                        <h6 className='lighter'>
                            $  {variants[0]?.prices[0].amount / 100}
                        </h6>

                    </h4>


                    <AiOutlinePlus size={28} color='#FF5722' />
                </div>
            </div>
        </div>
    );
}

export default ProductBox;