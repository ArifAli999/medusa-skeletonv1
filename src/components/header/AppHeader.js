import React from 'react';
import useCartStore from '../../../store/userCart';
import { useGetCart } from 'medusa-react';
import { AiOutlineHome } from 'react-icons/ai';
import { IoBagOutline } from 'react-icons/io5';

function AppHeader() {
    const { cartId } = useCartStore();
    const { cart, isLoading } = useGetCart(cartId);
    return (
        <nav className="header">
            <div className='header__logo'>
                <h1 className='text-mb'><a href='/products' >
                    <AiOutlineHome size={28} color='black' />
                </a></h1>
            </div>
            <div className='header__links'>

                <a href='/cart' className='cart-indi'>
                    <IoBagOutline size={28} color='black' />
                    <span className='cart-no'>{cart?.items.length}</span>
                </a>

            </div>

        </nav>
    );
}

export default AppHeader;