import React from 'react';
import useAuthStore from '../../../store/userStore';
import { useCreateCustomer } from "medusa-react";
import registerUser from '../../utils/register';
import { useRouter } from 'next/router';
import loginUser from '../../utils/loginUser';


function LoginContent({ setIsOpen }) {

    const { user, setUser } = useAuthStore();
    const createCustomer = useCreateCustomer();
    const router = useRouter();




    const [form, setForm] = React.useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    function handleLogin() {
        if (user) return null;
        if (form.email === '' || form.password === '') return null;
        loginUser(form.email, form.password, setUser, router);
        setIsOpen(false);
    }





    return (
        <>



            <div className='flex flex-col gap-4 w-full mt-2'>
                <div className='flex flex-col gap-2  w-full'>
                    <label className='font-primary text-sm font-light antialiased tracking-wide text-gray-400'>
                        email*
                    </label>
                    <input name='email' type='email' className='border bg-transparent w-full border-gray-300 focus:border-b-primary focus:outline-none focus:ring-0 p-2'
                        value={form.email} onChange={(e) => handleChange(e)}
                    />
                </div>

                <div className='flex flex-col gap-2  w-full'>
                    <label className='font-primary text-sm font-light antialiased tracking-wide text-gray-400'>
                        password*
                    </label>
                    <input name='password' type='password' className='border bg-transparent w-full border-gray-300 focus:border-b-primary focus:outline-none focus:ring-0 p-2'
                        value={form.password} onChange={(e) => handleChange(e)}
                    />
                </div>


                <button
                    onClick={() => handleLogin()}
                    className='bg-black mt-6 text-white font-primary font-bold uppercase antialiased tracking-wide text-sm py-4'>
                    Sign up
                </button>

            </div>
        </>
    );
}

export default LoginContent;