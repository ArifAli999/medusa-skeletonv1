import React from 'react';
import useCartStore from '../../store/userCart';
import { useGetCart } from 'medusa-react';
import AppHeader from '../components/header/AppHeader';

function UserCart() {
    const { cartId } = useCartStore();
    const { cart, isLoading } = useGetCart(cartId);
    // console.log(cart);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    function generateOptions(variant) {
        let name = variant.title;


        if (name.length > 2) {
            // means there is a color property in the namme string (eg: 'L / Black')
            let splitName = name.split(' / ');
            let size = splitName[0];
            let color = splitName[1];
            console.log(size, color);
            return (
                <div className='cartItemOptions'>
                    <div className='cartItemOption'>
                        <h4>{size}</h4>
                    </div>

                    <div className='cartItemOption'>
                        <h4>{color}</h4>
                    </div>
                </div>
            );
        }
        else {
            // means there is no color property in the namme string (eg: 'L')
            return (
                <div className='cartItemOptions'>
                    <div className='cartItemOption'>
                        <h3> {name}</h3>
                    </div>
                </div>
            );
        }
    }

    return (
        <main className="mainContainer">
            <AppHeader />


            <div className="cartContainer">
                <div className="cartHeader">
                    <div className='cartHeaderItem'>
                        <h1>Cart</h1>
                        <h2 className='cartHeaderItem'>{cart?.items.length} Items</h2>
                    </div>



                    <div className='cartItems'>
                        {cart?.items.map((item) => (
                            <div className='cartItem'>
                                <div className='cartItemImg'>
                                    <img src={item.thumbnail} alt={item.title} />
                                </div>

                                <div className='cartItemDetails'>
                                    <div>
                                        <h3>{item.title}</h3>
                                        {generateOptions(item.variant)}
                                    </div>



                                    <div className='cartItemPrice'>
                                        <h3 className='itemPrice'>$ {item.unit_price / 100}</h3>

                                        <div className='cartItemQuantity'>
                                            <h3>{item.quantity}</h3>
                                        </div>

                                    </div>



                                </div>



                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default UserCart;