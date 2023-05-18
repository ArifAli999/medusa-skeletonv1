import React from 'react';
import AppHeader from '../components/header/AppHeader';
import useAuthStore from '../../store/userStore';
import { useRouter } from 'next/router';
import logOut from '../utils/logOutUser';

function UserProfile() {
    const { user, setUser } = useAuthStore();

    const router = useRouter();



    if (!user) return null;
    return (
        <main className="p-6 ">

            <AppHeader />


            <div className='flex flex-col p-0 gap-10 w-full'>

                <div className='flex items-center justify-center w-full mb-6'>
                    <h2 className='text-6xl text-center font-thin font-secondary text-black'>
                        profile settings
                    </h2>
                </div>


                <div className='flex flex-row gap-4 p-6 w-[80%] mx-auto'>
                    <div className='border-r border-r-gray-300 p-8'>
                        <h3 className='text-2xl font-bold font-secondary text-black'>Account</h3>
                        <ul className='flex flex-col gap-4 mt-4 '>
                            <li className='text-sm font-primary font-medium text-gray-400'>Profile</li>
                            <li className='text-sm font-primary font-medium text-gray-400'>Orders</li>
                            <li className='text-sm font-primary font-medium text-gray-400'>Addresses</li>
                            <li className='text-sm font-primary font-medium text-gray-400'>Payment Methods</li>
                        </ul>

                        <h3 className='text-2xl font-bold font-secondary text-black mt-8'>Settings</h3>
                        <ul className='flex flex-col gap-4 mt-4'>
                            <li className='text-sm font-primary font-medium text-gray-400'>Notifications</li>
                            <li className='text-sm font-primary font-medium text-gray-400'>Privacy</li>
                            <li className='text-sm font-primary font-medium text-gray-400'>Security</li>
                            <li className='text-sm font-primary font-medium text-gray-400'
                                onClick={() => logOut(router, setUser)}
                            >Logout</li>

                        </ul>
                    </div>



                </div>
            </div>



        </main>
    );
}

export default UserProfile;