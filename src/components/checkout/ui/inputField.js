import React from 'react';

function InputField({ label, placeholder, value, onChange }) {
    return (
        <div className='flex flex-col gap-2 '>
            <label className='font-primary font-light text-sm text-gray-500'>
                {label}
            </label>
            <input type="text" className=' placeholder:text-gray-300 border border-gray-300 text-black w-full px-4  py-2  outline-none focus:ring-1 focus:ring-primary'
                placeholder={placeholder}
                value={value && value}
                onChange={onChange}
            />
        </div>
    );
}

export default InputField;