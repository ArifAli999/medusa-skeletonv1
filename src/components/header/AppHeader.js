import React, { useState } from 'react';
import useCartStore from '../../../store/userCart';
import { useGetCart } from 'medusa-react';
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import { IoBagOutline } from 'react-icons/io5';
import useAuthStore from '../../../store/userStore';
import MyModal from '../ui/ModalBox';
import RegisterContent from '../register/registerContent';
import LoginContent from '../register/loginContent';
import { useRouter } from 'next/router';

function AppHeader() {
    const { cartId } = useCartStore();
    const { cart, isLoading } = useGetCart(cartId);
  const { user } = useAuthStore();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();


    return (
      <div className="flex items-center justify-between">
            <div className='header__logo'>
                <h1 className='text-mb'><a href='/products' >
                    <AiOutlineHome size={28} color='black' />
                </a></h1>
            </div>
        <div className='flex gap-4 items-center'>


          {user && user !== 'null' ? (
            <div href='/profile' className='cursor-pointer group  relative' onClick={() => router.push('/profile')}>
              <AiOutlineUser size={34} color='black' />
            </div>)
            : (
              <div className='flex items-center gap-4'>
                <a className='bg-primary  px-4 py-2 cursor-pointer rounded-full font-primary  text-md text-white'
                  onClick={() => setIsRegisterModalOpen(true)}
                >
                  join us
                </a>

                <a className='border border-primary  px-3 py-1.5 cursor-pointer rounded-full font-primary  text-md text-primary'
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  account
                </a>
              </div>
            )
          }


          <a href='/cart' className='cart-indi relative'>
            <IoBagOutline size={34} color='black' />
            <span className='cart-no '>{cart?.items.length}</span>
          </a>

            </div>
        {isRegisterModalOpen && (
          <MyModal isOpen={isRegisterModalOpen} setIsOpen={setIsRegisterModalOpen}
            title={'join us now'} content={<RegisterContent setIsOpen={setIsRegisterModalOpen} />} />
        )}
        {isLoginModalOpen && (
          <MyModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen}
            title={'login'} content={<LoginContent setIsOpen={setIsLoginModalOpen} />} />
        )}

      </div>
    );
}

export default AppHeader;