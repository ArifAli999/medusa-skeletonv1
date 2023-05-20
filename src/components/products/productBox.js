import React from 'react';
import { Button } from 'theme-ui';
import { useRouter } from 'next/router';
import { AiOutlinePlus } from 'react-icons/ai';
import ProductModal from './productModal';


function ProductBox({ id, title, variants, product }) {

    const [open, setOpen] = React.useState(false);

    const router = useRouter();

    const handleClick = () => {
        // router.push(`/${product.handle}`);
        setOpen(true);
    };


    return (



        <div key={id} className='flex flex-col gap-2 cursor-pointer' onClick={handleClick}>


            <div className='xl:max-w-[500px] max-w-[400px] hover:blur-[1px] duration-500 ease-linear'>
                <img src={product.images[0] && product.images[0].url} alt={title} className='w-full max-h-[550px] xl:max-h-[600px] object-cover rounded-sm' />
            </div>
                <div className='product-buttons '>

                <h4 className='text-black font-light antialiased font-primary'>{title}
                    <p className='text-gray-800 font-normal antialiased font-primary'>
                        $ {variants[0]?.prices[0].amount / 100}

                    </p>

                    </h4>

                {open && <ProductModal isOpen={open} setIsOpen={setOpen} product={product} />}
                <AiOutlinePlus size={28} color='#FF5722' />
            </div>

            </div>

    );
}

export default ProductBox;