import React from 'react';
import InputField from './ui/inputField';

function AddressStep() {
    return (
        <div className='flex mt-10 mb-6 p-4 flex-col gap-4 items-center'>

            <div className='flex flex-row gap-10 items-center'>
                <InputField label={'first name *'} placeholder={'first name'} />
                <InputField label={'last name *'} placeholder={'last name'} />
                <InputField label={'email *'} placeholder={'email'} />
            </div>


            <div className='flex flex-row gap-10 items-center mt-10'>
                <InputField label={'company'} placeholder={'company'} />
                <InputField label={'phone *'} placeholder={'phone number'} />

            </div>

            <div className='flex flex-row gap-10 items-center mt-10'>
                <InputField label={'post code *'} placeholder={'post code'} />
                <InputField label={'city *'} placeholder={'city'} />
                <InputField label={'state *'} placeholder={'state'} />
                <InputField label={'country *'} placeholder={'country'} />


            </div>

            <div className='flex flex-row gap-10 items-center mt-10'>
                <button className='bg-black rounded-full text-white px-6 py-4  font-primary font-light text-sm'>
                    continue to shipping
                </button>
            </div>

        </div>
    );
}

export default AddressStep;;