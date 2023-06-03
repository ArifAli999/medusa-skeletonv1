import React, { useState } from 'react';
import AppHeader from '../components/header/AppHeader';
import AddressStep from '../components/checkout/AddressStep';
import ShippingStep from '../components/checkout/ShippingStep';
import CartSummary from '../components/checkout/CartSummary';

function CheckoutContainer() {

    const [steps, setSteps] = useState([
        'address details',
        'shipping details',
        'payment details',
    ]);
    const [activeStep, setActiveStep] = useState(0);
    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        phone: '',
        postCode: '',
        city: '',
        state: '',
        country: '',
        type: '',
    });



    return (
        <main className="p-6 overflow-hidden">
            <AppHeader />


            <div className='flex w-full h-full p-4 flex-col overflow-hidden'>


                <div className='flex flex-row gap-14 items-center justify-center cursor-pointer'>


                    {steps.map((step, index) => (
                        <div
                            key={index}
                        >
                            <h2
                                className={`${activeStep === index ? 'text-2xl font-secondary text-black transition-all ease-linear duration-300 scale-105 hover:text-black/80' : 'text-2xl font-secondary text-gray-400 scale-100 hover:text-black/60 transition-all ease-linear duration-300'
                                    }`}
                                onClick={() => setActiveStep(index)}
                            >
                                {step}
                            </h2>
                        </div>
                    ))}
                </div>

                <div className='flex flex-row w-full h-full mt-10 gap-4'>
                    <div className='flex flex-col gap-4 w-[70%] flex-1 h-full  transition-all ease-in-out duration-750'>
                        {activeStep === 0 && <AddressStep adress={address} setAddress={setAddress} setActiveStep={setActiveStep} />}

                        {activeStep === 1 && <ShippingStep />}

                        {activeStep === 2 && <h1>payment details</h1>}
                    </div>



                    <div className='flex flex-col gap-4 w-[30%] h-full'>
                        <CartSummary />
                    </div>


                </div>




            </div>


        </main>
    );
}

export default CheckoutContainer;