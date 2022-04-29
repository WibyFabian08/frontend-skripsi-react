import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { TextInput, InputFile } from "../elements";

const ModalTender = ({
  isOpen,
  setIsOpen,
  onClick,
  formInput,
  inputData,
  onChange,
}) => {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
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
              <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl md:w-1/2 rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-medium leading-6 text-gray-900"
                >
                  Join Tender
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Lengkapi Form Untuk Mengikuti Tender!
                  </p>
                </div>

                <div className="mt-5">
                  <div className="flex flex-wrap w-full -mx-2">
                    {formInput.length > 0 &&
                      formInput.map((data, index) => {
                        if (data.inputType === "input") {
                          return (
                            <div className="w-full px-2 md:w-1/2" key={index}>
                              <TextInput
                                dark
                                name={data.inputName}
                                value={inputData[data.inputName]}
                                onChange={onChange}
                                label={data.inputDetail.label}
                                placeholder={data.inputDetail.placeholder}
                                type={data.inputDetail.type}
                              ></TextInput>
                            </div>
                          );
                        } else {
                          return (
                            <div className="w-full px-2 md:w-1/2" key={index}>
                              <div className="mb-5">
                                <label
                                  htmlFor="gender"
                                  style={{ color: "#0C0D36" }}
                                  className="mb-3 font-semibold capitalize text-md"
                                >
                                  {data.inputDetail.label}
                                </label>
                                <select
                                  className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none"
                                  name={data.inputName}
                                  style={{ color: "#0C0D36" }}
                                  type={data.inputType}
                                  value={inputData[data.inputName]}
                                  onChange={onChange}
                                >
                                  <option value="">Pilih Salah Satu</option>
                                  {data.inputDetail.option.map(
                                    (option, index2) => {
                                      return (
                                        <option
                                          key={index2}
                                          value={option.value}
                                        >
                                          {option.string}
                                        </option>
                                      );
                                    }
                                  )}
                                </select>
                              </div>
                            </div>
                          );
                        }
                      })}

                    <div className="w-full px-2">
                      <InputFile
                        placeholder={"Upload Semua File Dalam Satu (Pdf)"}
                        onChange={onChange}
                        labelTitle
                        name="fileTender"
                      ></InputFile>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <button
                    type="button"
                    onClick={onClick}
                    className="inline-flex justify-center flex-1 px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  >
                    Kirim Permohonan
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

export default ModalTender;
