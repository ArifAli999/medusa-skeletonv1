import React, { useState } from 'react';
import AppHeader from '../components/header/AppHeader';
import AddressStep from '../components/checkout/AddressStep';

function CheckoutContainer() {

    const [steps, setSteps] = useState([
        'address details',
        'shipping details',
        'payment details',
    ]);
    const [activeStep, setActiveStep] = useState('address details');



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
                                className={`${activeStep === step ? 'text-2xl font-secondary text-black transition-all ease-linear duration-300 scale-105 hover:text-black/80' : 'text-2xl font-secondary text-gray-400 scale-100 hover:text-black/60 transition-all ease-linear duration-300'
                                    }`}
                                onClick={() => setActiveStep(step)}
                            >
                                {step}
                            </h2>
                        </div>
                    ))}
                </div>

                {activeStep === 'address details' && <AddressStep />}





            </div>


        </main>
    );
}

export default CheckoutContainer;