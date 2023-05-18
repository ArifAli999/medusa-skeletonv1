import React from 'react';
import AppHeader from '../components/header/AppHeader';

function RegisterPage() {
    return (
        <main className="mainContainer">

            <AppHeader />

            <div className='flex flex-col gap-10 items-center p-6 border'>

                <div className=' flex items-center justify-center w-full'>
                    <h2 className='font-secondary text-4xl font-bold antialiased tracking-wide text-black'>
                        please sign up or login
                    </h2>
                </div>

                <div className='flex xl:flex-row gap-6 w-full'>
                    <div className='flex flex-col gap-4 w-full mt-10  bg-gray-200 p-4'>
                        <div className='flex flex-col gap-2'>

                            <label className='font-primary text-base font-light antialiased tracking-wide text-black'>
                                Email
                            </label>
                            <input type='email' className='border border-none focus:ring-primary focus:outline-none focus:ring-1 p-2' />

                        </div>


                        <div className='flex flex-col gap-2'>

                            <label className='font-primary text-base font-light antialiased tracking-wide text-black'>
                                Password
                            </label>
                            <input type='password' className='border border-none focus:ring-primary focus:outline-none focus:ring-1 p-2' />

                        </div>

                    </div>


                    <div className='flex w-[40%] p-4'>

                    </div>

                </div>







            </div>


        </main>
    );
}

export default RegisterPage;