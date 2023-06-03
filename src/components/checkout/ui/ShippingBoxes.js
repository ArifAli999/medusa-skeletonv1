import React from 'react';

function ShippingBoxes({ name, price, id }) {
    const calculatedPrice = price / 100;
    return (
        <div className="flex flex-col w-full  " key={id}>
            <ul class="grid w-full gap-6 md:grid-cols-1">
                <li>
                    <input type="radio" id={id} name="hosting" value={id} className="hidden peer" required />
                    <label for={id} className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:border-gray-700 dark:peer-checked:text-primary peer-checked:border-primary peer-checked:text-primary hover:text-black  dark:hover:text-black  dark:hover:bg-gray-50">
                        <div className="flex-col flex gap-1">
                            <div className="w-full text-lg text-gray-900 tracking-wide lowercase font-primary ">{name} shipping</div>
                            <div className="w-full text-gray-600 font-primary font-light lowercase">
                                $ {calculatedPrice}
                            </div>
                        </div>
                        <svg aria-hidden="true" className="w-6 h-6 ml-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </label>
                </li>
            </ul>
        </div>
    );
}

export default ShippingBoxes;