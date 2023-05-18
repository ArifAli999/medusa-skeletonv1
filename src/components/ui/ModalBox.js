import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

export default function MyModal({ isOpen, setIsOpen, title, content, actions }) {




  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">

      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto w-full" onClose={() => setIsOpen(false)}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-primary bg-opacity-60" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white mt-10 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full min-w-[100%] xl:min-w-[420px]">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full" >
                  <div className="sm:items-start w-full">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-3xl mb-4 leading-2 font-primary  font-light lowercase text-black">
                        {title}
                      </Dialog.Title>
                      <div className="mt-2 pt-4 pb-4 w-full ">
                        {content}





                      </div>
                    </div>
                  </div>
                </div>
                {actions && (
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    {actions}
                  </div>
                )}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}