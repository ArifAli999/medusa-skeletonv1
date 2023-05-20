import React from 'react';
import useAuthStore from '../../../store/userStore';
import { useCreateCustomer } from "medusa-react";
import registerUser from '../../utils/register';
import { useRouter } from 'next/router';
import loginUser from '../../utils/loginUser';
import { AiOutlineLoading } from 'react-icons/ai';


function LoginContent({ setIsOpen }) {

    const { user, setUser } = useAuthStore();
    const createCustomer = useCreateCustomer();
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);




    const [form, setForm] = React.useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    async function handleLogin() {
        if (user) return null;
        if (form.email === '' || form.password === '') return null;
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const login = await loginUser(form.email, form.password, setUser, router);
        if (login) {
            console.log(user);
            setLoading(false);
            setIsOpen(false);
        }

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


                {loading ? (
                    <button
                        onClick={() => handleRegister()}
                        className='bg-black/70 mt-6 text-white font-primary flex items-end justify-center font-bold uppercase antialiased tracking-wide text-sm py-4'>
                        <AiOutlineLoading
                            className='animate-spin transition-all duration-75 ' size={24} />
                    </button>)
                    : (
                        <button
                            onClick={() => handleLogin()}
                            className='bg-black mt-6 text-white font-primary font-bold uppercase antialiased tracking-wide text-sm py-4'>
                            login
                        </button>
                    )
                }

            </div>
        </>
    );
}

export default LoginContent;