import React, { useEffect } from 'react';
import InputField from './ui/inputField';
import ListComponent from '../ui/ListBox';
import AdressListBox from './ui/AdressList';
import { AddressSchema } from '../../utils/validator';
import { toast } from 'react-hot-toast';

function AddressStep({ adress, setAddress, setActiveStep }) {

    const [type, setType] = React.useState([
        'Home',
        'Office',
        'Other',
    ]);
    const [savedAdress, setSavedAdress] = React.useState();





    async function handlePageChange() {
        const parsedAdress = AddressSchema.cast({
            first_name: adress.firstName,
            last_name: adress.lastName,
            company: adress.company,
            address_1: adress.state,
            address_2: adress.city,
            postal_code: adress.postCode,
            city: adress.city,
            country_code: adress.country,
            type: adress.type,
            email: adress.email,
            phone: adress.phone,
        });
        console.log(parsedAdress);


        try {

            const validationState = await AddressSchema.strict().validate(parsedAdress);
            setActiveStep(1);
            toast.success('address saved');
            setSavedAdress(parsedAdress);

        }
        catch (err) {
            toast.error(err.message);
            console.log(err);
        }
    }




    return (

        <div className='flex overflow-hidden p-6 flex-col gap-0 items-center border border-gray-200 transition-all ease-in-out duration-750 '>

            <div className='flex   mx-auto w-full'>
                <div className='flex flex-row items-center justify-center gap-8 w-full p-6'>
                <InputField label={'first name *'} placeholder={'first name'}
                    value={adress.firstName}
                    onChange={(e) => setAddress({ ...adress, firstName: e.target.value })}
                />
                <InputField label={'last name *'} placeholder={'last name'}
                    value={adress.lastName}
                    onChange={(e) => setAddress({ ...adress, lastName: e.target.value })}
                />
                </div>
            </div>


            <div className='flex    mx-auto w-full'>
                <div className='flex flex-row items-center justify-center gap-8 w-full p-6'>
                    <InputField label={'email *'} placeholder={'email'}
                        value={adress.email}
                        onChange={(e) => setAddress({ ...adress, email: e.target.value })}
                    />
                    <InputField label={'phone *'} placeholder={'phone number'}
                        value={adress.phone}
                        onChange={(e) => setAddress({ ...adress, phone: e.target.value })}
                    />
                </div>
            </div>

            <div className='flex   mx-auto w-full'>
                <div className='flex flex-row items-center justify-center gap-8 w-full p-6'>
                    <InputField label={'company'} placeholder={'company'}
                        value={adress.company}
                        onChange={(e) => setAddress({ ...adress, company: e.target.value })}
                    />


                    <AdressListBox list={type} setAddress={setAddress} adress={adress} />
                </div>
            </div>

            <div className='flex    mx-auto w-full'>
                <div className='flex flex-row items-center justify-center gap-8 w-full p-6'>
                    <InputField label={'post code *'} placeholder={'post code'}
                        value={adress.postCode}
                        onChange={(e) => setAddress({ ...adress, postCode: e.target.value })}
                    />
                    <InputField label={'city *'} placeholder={'city'}
                        value={adress.city}
                        onChange={(e) => setAddress({ ...adress, city: e.target.value })}
                    />
                </div>
            </div>


            <div className='flex    mx-auto w-full'>
                <div className='flex flex-row items-center justify-center gap-8 w-full p-6'>
                    <InputField label={'state *'} placeholder={'state'}
                        value={adress.state}
                        onChange={(e) => setAddress({ ...adress, state: e.target.value })}
                    />
                    <InputField label={'country *'} placeholder={'country'}
                        value={adress.country}
                        onChange={(e) => setAddress({ ...adress, country: e.target.value })}
                    />
                </div>
            </div>









            <div className='flex flex-row gap-10 items-center mt-10 mb-4'>
                <button className='bg-black rounded-full text-white px-6 py-4  font-primary font-light text-sm'
                    onClick={handlePageChange}
                >
                    save and continue
                </button>

                {savedAdress?.first_name}
            </div>

        </div>
    );
}

export default AddressStep;;