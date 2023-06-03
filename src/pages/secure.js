import React, { useState } from 'react';
import AppHeader from '../components/header/AppHeader';
import AddressStep from '../components/checkout/AddressStep';
import ShippingStep from '../components/checkout/ShippingStep';

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
        <main className="p-6">
            <AppHeader />


            <div className='flex w-full h-full p-4 flex-col'>


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

                {activeStep === 0 && <AddressStep adress={address} setAddress={setAddress} setActiveStep={setActiveStep} />}

                {activeStep === 1 && <ShippingStep />}

                {activeStep === 2 && <h1>payment details</h1>}



            </div>


        </main>
    );
}

export default CheckoutContainer;