import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const ModalDetail = ({
  isOpenDetail,
  setIsOpenDetail,
  title,
  name,
  address,
  description,
  email,
  phone,
  image,
  role,
  label,
  imagePreview,
  onClick
}) => {
  function closeModal() {
    setIsOpenDetail(false);
  }

  if (imagePreview) {
    return (
      <>
        <Transition appear show={isOpenDetail} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
          >
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
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mr-3">
                    <img
                      src={
                        image
                          ? `http://localhost:8000/files/${image}`
                          : "/images/blank.png"
                      }
                      className="object-cover w-full h-full mt-3 rounded-md"
                      alt="profile"
                    />
                  </div>

                  <div className="flex justify-between gap-2 mt-4 ml-auto">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-500 bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </>
    );
  }

  return (
    <>
      <Transition appear show={isOpenDetail} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
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
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>
                <div className="flex mt-3">
                  <div className="mr-3">
                    <img
                      src={
                        image
                          ? `http://localhost:8000/files/${image}`
                          : "/images/blank.png"
                      }
                      className="object-cover w-full h-full"
                      alt="profile"
                    />
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-gray-500">Nama : {name}</p>
                    <p className="mb-1 text-sm text-gray-500">
                      No Telp : {phone}
                    </p>
                    <p className="mb-1 text-sm text-gray-500">
                      Email : {email}
                    </p>
                    <p className="mb-1 text-sm text-gray-500">
                      Alamat : {address}
                    </p>
                    <p className="mt-2 text-sm text-gray-500">Deskripsi :</p>
                    <p className="mb-1 text-sm text-gray-500">{description}</p>
                  </div>
                </div>

                <div className="flex justify-between gap-2 mt-4 ml-auto">
                  <button
                    onClick={onClick}
                    type="button"
                    className={[
                      "inline-flex justify-center flex-1 px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
                      role === 3 ? "invisible" : "visible",
                    ].join(" ")}
                  >
                    {label}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-500 bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalDetail;
