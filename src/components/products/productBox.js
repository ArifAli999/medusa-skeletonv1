import React from 'react';
import { Button } from 'theme-ui';
import { useRouter } from 'next/router';


function ProductBox({ id, title, variants, product }) {

    const router = useRouter();

    const handleClick = () => {
        router.push(`/${product.handle}`);
    };


    return (
        <div key={id} className='product' onClick={handleClick}>


            <div className='product-image'>
                {title}
                <img src={product.images[0] && product.images[0].url} alt={title} className='small-image' />

                <div className='product-buttons '>
                    <button className='product-button'>Add to cart</button>
                    <button className='product-price-btn product-button'>
                        ${variants[0]?.prices[0].amount / 100}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductBox;