import React, { useState } from 'react';
import useCartStore from '../../../store/userCart';
import { useGetCart } from 'medusa-react';
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import { IoBagOutline } from 'react-icons/io5';
import useAuthStore from '../../../store/userStore';
import MyModal from '../ui/ModalBox';
import RegisterContent from '../register/registerContent';
import LoginContent from '../register/loginContent';

function AppHeader() {
    const { cartId } = useCartStore();
    const { cart, isLoading } = useGetCart(cartId);
  const { user } = useAuthStore();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  console.log(cart)

    return (
        <nav className="header">
            <div className='header__logo'>
                <h1 className='text-mb'><a href='/products' >
                    <AiOutlineHome size={28} color='black' />
                </a></h1>
            </div>
            <div className='header__links'>

          {user ? (
            <a href='/profile' className='header__link'>
              <AiOutlineUser size={28} color='black' />
            </a>)
            : (
              <>
                <button href='' className='  font-primary font-bold text-xl text-primary'
                  onClick={() => setIsRegisterModalOpen(true)}
                >
                  JOIN US

                </button>

                <button href='' className='font-primary font-bold text-lg text-primary'
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  LOGIN

                </button>

              </>
            )

          }

                <a href='/cart' className='cart-indi'>
                    <IoBagOutline size={28} color='black' />
                    <span className='cart-no'>{cart?.items.length}</span>
                </a>

            </div>
        {isRegisterModalOpen && (
          <MyModal isOpen={isRegisterModalOpen} setIsOpen={setIsRegisterModalOpen}
            title={'join us now'} content={<RegisterContent />} />
        )}
        {isLoginModalOpen && (
          <MyModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen}
            title={'login'} content={<LoginContent />} />
        )}

        </nav>
    );
}

export default AppHeader;