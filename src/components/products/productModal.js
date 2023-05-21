import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import ListComponent from '../ui/ListBox';
import { useRouter } from 'next/router';
import { AiOutlineLoading } from 'react-icons/ai';


export default function ProductModal({ isOpen, setIsOpen, product }) {

  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    generateSizes();
    router.prefetch(`/${product.handle}`);
  }, [product]);



  async function closeModal() {
    setIsLoading(true);
    try {
      await router.push(`/${product.handle}`);
    } catch (error) {
      // Handle any potential errors during the route push
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  }

  function justCloseModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function handleColorPick() {
    console.log('color picked');
  }


  function generateSizes() {
    const sizes = product.variants.map(variant => variant.options[0].value);
    const colors = product.variants.map(variant => variant.options[1]?.value);
    const uniqueColors = [...new Set(colors)];
    const uniqueSizes = [...new Set(sizes)];
    setSize(uniqueSizes);
    setColor(uniqueColors);
  };

  return (
    <>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={justCloseModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-primary bg-opacity-60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle xl:min-w-[600px] shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className="text-2xl flex items-center justify-between font-light  font-primary leading-2 -mt-2 mb-4 text-gray-900"
                  >
                    {product.title}
                    <p className='text-black tracking-wider font-primary text-xl'>
                      ${product.variants[0]?.prices[0].amount / 100}
                    </p>
                  </Dialog.Title>
                  <div className="mt-2 flex gap-4 w-full justify-between">

                    <div className='flex flex-col gap-4'>

                      <h3 className='text-sm whitespace-break-spaces font-primary font-light text-gray-400 mt-2'>
                        {product.description}
                      </h3>

                      <div className='text-black flex gap-4'>
                        {color && color.length > 1 && color.map((c) => {
                          const colorbg = c && c.toLowerCase();
                          return (
                            <button
                              key={c}
                              className={`w-8 h-8 rounded-full border border-gray-300 bg-${colorbg} hover:ring-2 ring-offset-2 ring-offset-gray-100 ring-white cursor-pointer`}
                              onClick={handleColorPick}
                            />
                          );
                        })}


                      </div>


                    </div>

                    <div className='min-w-[50%]'>
                      <img src={product.images[0] && product.images[0].url} alt={product.title} className='w-full max-h-[250px] xl:max-h-[250px] border border-gray-300 object-cover rounded-sm' />
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      className="bg-primary w-full text-white py-2 ring-0  flex items-center justify-center outline-none rounded-md font-primary text-center font-light text-sm shadow shadow-black/20"
                      onClick={closeModal}
                    >
                      {isLoading ? <AiOutlineLoading className='animate-spin' size={24} color='white' /> : 'View Product'}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
