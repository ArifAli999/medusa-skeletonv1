import React from 'react';
import AppHeader from '../components/header/AppHeader';
import useAuthStore from '../../store/userStore';
import { useRouter } from 'next/router';
import logOut from '../utils/logOutUser';
import { AiOutlineRedEnvelope } from 'react-icons/ai';
import fetchOrders from '../utils/fetchOrders';

function UserProfile({ fetch }) {
    const { user, setUser } = useAuthStore();

    const router = useRouter();


    async function fetchUserOrders() {
        console.log(fetch);
    }   


    if (!user) return null;
    return (
        <main className="p-6 ">

            <AppHeader />


            <div className='flex flex-col p-0 gap-10 w-full'>

                <div className='flex items-center justify-center w-full mb-6'>
                    <h2 className='text-6xl text-center font-thin font-secondary text-black'>
                        profile 
                    </h2>
                </div>


                <div className='flex flex-col xl:flex-row gap-4 p-6  '>
                    <div className='xl:border-r border-b xl:border-b-0  border-r-gray-300 p-4 xl:w-[20%]'>
                        <h3 className='text-2xl font-light font-secondary text-black'>Account</h3>
                        <ul className='flex flex-col gap-4 mt-4 '>
                            <li className='text-sm font-primary font-medium text-gray-400'>Profile</li>
                            <li className='text-sm font-primary font-medium text-gray-400'>Orders</li>
                            <li className='text-sm font-primary font-medium text-gray-400'>Addresses</li>
                            <li className='text-sm font-primary font-medium text-gray-400'>Payment Methods</li>
                        </ul>

                        <h3 className='text-2xl font-light font-secondary text-black mt-8'>Settings</h3>
                        <ul className='flex flex-col gap-4 mt-4 mb-4'>
                            <li className='text-sm font-primary font-medium text-gray-400'>Notifications</li>
                            <li className='text-sm font-primary font-medium text-gray-400'>Privacy</li>
                            <li className='text-sm font-primary font-medium text-gray-400'>Security</li>
                            <li className='text-sm font-primary font-medium text-gray-400'
                                onClick={() => logOut(router, setUser)}
                            >Logout</li>

                        </ul>
                    </div>

                    <div className='flex flex-col xl:ml-4  gap-4 xl:p-8 w-full'>
                        <h3 className='text-2xl font-light font-primary text-black'>Welcome back, {user.first_name} {user.last_name}</h3>


                        <div className='flex flex-row gap-4 w-full mt-6'>
                            <div
                                onClick={() => fetchUserOrders()}
                                className='flex flex-col gap-4 justify-center h-full shadow-sm shadow-black/20 bg-gray-100 p-8 w-full min-h-[200px] items-center rounded'>

                                <h2 className='font-secondary font-light text-lg xl:text-4xl text-gray-400'>You have no recent or upcoming orders</h2>

                            </div>

                        </div>
                    </div>



                </div>
            </div>



        </main>
    );
}


export async function getStaticProps() {
    const fetch = await fetchOrders();
    return {
        props: {
            fetch
        }
    };
}


export default UserProfile;