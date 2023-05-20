import React from 'react';
import useAuthStore from '../../../store/userStore';
import { useCreateCustomer } from "medusa-react";
import registerUser from '../../utils/register';
import { useRouter } from 'next/router';
import { AiOutlineLoading } from 'react-icons/ai';
import loginUser from '../../utils/loginUser';


function RegisterContent({ setIsOpen }) {

  const { user, setUser } = useAuthStore();
  const createCustomer = useCreateCustomer();
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);




  const [form, setForm] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  async function handleRegister() {
    if (user) return null;
    if (form.firstName === '' || form.lastName === '' || form.email === '' || form.password === '') return null;

    const register = await registerUser(createCustomer, form, setUser, router, setIsOpen);
    console.log(register);

    if (register) {
      setLoading(true);

      await new Promise(resolve => setTimeout(resolve, 1000));

      const login = await loginUser(form.email, form.password, setUser, router);

      if (login) {
        console.log(user);
        setLoading(false);
        setIsOpen(false);
      }
    }
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

        {loading ? (
          <button
            onClick={() => handleRegister()}
            className='bg-black/70 mt-6 text-white font-primary flex items-end justify-center font-bold uppercase antialiased tracking-wide text-sm py-4'>
            <AiOutlineLoading
              className='animate-spin transition-all duration-75 ' size={24} />
          </button>)
          : (
            <button
              onClick={() => handleRegister()}
              className='bg-black mt-6 text-white font-primary font-bold uppercase antialiased tracking-wide text-sm py-4'>
              Sign up
            </button>
          )
        }


      </div>
    </>
  );
}

export default RegisterContent;