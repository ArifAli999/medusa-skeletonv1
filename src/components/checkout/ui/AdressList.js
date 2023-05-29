import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { IoChevronDown } from 'react-icons/io5';
import { AiFillCheckCircle, AiOutlineCheck } from 'react-icons/ai';



export default function AdressListBox({ list, setAddress, adress }) {
    const [selected, setSelected] = useState('Adress Type');

    function handleChange(person) {
        setSelected(person);
        setAddress({ ...adress, type: person });
    }

    return (
        <div className=" min-w-70 w-[200px]">
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg border border-gray-300 px-6 py-2 mt-5 text-left shadow-md focus:outline-none focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block  font-primary text-black">{selected}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <IoChevronDown
                                className="h-5 w-5 text-white"
                                aria-hidden="true"
                                color='#ff5722'
                                size={24}
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-0 text-base shadow-lg ring-1 ring-orange-600 ring-opacity-5 focus:outline-none sm:text-sm">
                            {list && list.map((person, personIdx) => (

                                <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                        `relative border-b border-gray-200  cursor-default select-none py-2.5 pl-4 pr-4 ${active ? 'bg-orange-400 text-amber-900' : 'text-black'
                                        }`
                                    }
                                    value={person}
                                    onClick={() => handleChange(person)}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {person}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 right-2 flex items-center text-amber-600">
                                                    <AiOutlineCheck className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}
