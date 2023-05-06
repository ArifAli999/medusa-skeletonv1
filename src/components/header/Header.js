import React from 'react';
import useCartStore from '../../../store/userCart';
import { useGetCart } from 'medusa-react';

function Header() {
    const { cartId } = useCartStore();
    const { cart, isLoading } = useGetCart(cartId);
    return (
        <nav className="header">
            <div className='header__logo'>
                <h1 className='text-mb'>Store</h1>
            </div>
            <div className='header__links'>
                <a href='/products' style={{ fontWeight: 600 }}>Products</a>
                <a href='#'>Categories</a>
                <a href='#'>Prodfile</a>
                <a href='#' className='cart-indi'>Cart {cart?.items.length}</a>
            </div>

        </nav>
    );
}

export default Header;