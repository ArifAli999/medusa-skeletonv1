import React from 'react';
import useAuthStore from '../../../store/userStore';
import { useCreateCustomer } from "medusa-react";
import registerUser from '../../utils/register';
import { useRouter } from 'next/router';


function RegisterContent() {

  const { user, setUser } = useAuthStore();
  const createCustomer = useCreateCustomer();
  const router = useRouter();




  const [form, setForm] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function handleRegister() {
    if (user) return null;
    if (form.firstName === '' || form.lastName === '' || form.email === '' || form.password === '') return null;

    registerUser(createCustomer, form, setUser, router);

  }





  return (
    <>

      <div className='flex  flex-col xl:flex-row gap-4  w-full'>

        <div className='flex flex-col gap-2 w-full'>
          <label className='font-primary text-sm font-light antialiased tracking-wide text-gray-400'>
            first name*
          </label>
          <input name='firstName' type='text' className='border bg-transparent w-full border-gray-300 focus:border-b-primary focus:outline-none focus:ring-0 p-2'
            value={form.firstName} onChange={(e) => handleChange(e)}
          />

        </div>

        <div className='flex flex-col gap-2 w-full'>
          <label className='font-primary text-sm font-light antialiased tracking-wide text-gray-400'>
            last name*
          </label>
          <input name='lastName' type='text' className='border bg-transparent w-full border-gray-300 focus:border-b-primary focus:outline-none focus:ring-0 p-2'
            value={form.lastName} onChange={(e) => handleChange(e)}
          />

        </div>

      </div>

      <div className='flex flex-col gap-4 w-full mt-4'>
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
          onClick={() => handleRegister()}
          className='bg-black mt-6 text-white font-primary font-bold uppercase antialiased tracking-wide text-sm py-4'>
          Sign up
        </button>

      </div>
    </>
  );
}

export default RegisterContent;