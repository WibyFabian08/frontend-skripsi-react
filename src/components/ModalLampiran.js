import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { TextInput } from "../elements";

const ModalLampiran = ({ isOpen, setIsOpen, setLampiran, lampiran }) => {
  function closeModal() {
    setIsOpen(false);
    setLampiran(null);
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Lampiran Calon Kontraktor
                </Dialog.Title>

                <div className="mt-3">
                  <TextInput
                    readOnly={true}
                    value={
                      lampiran !== null && lampiran?.kontraktorId?.fullname
                    }
                    label="kontraktor"
                    dark
                  ></TextInput>
                  <TextInput
                    readOnly={true}
                    value={
                      lampiran !== null && lampiran.lampiran.hargapenawaran
                    }
                    label="Harga Penawaran"
                    dark
                  ></TextInput>
                  <TextInput
                    readOnly={true}
                    value={lampiran !== null && lampiran.lampiran.keuangan}
                    label="Keuangan Kontraktor"
                    dark
                  ></TextInput>
                  <TextInput
                    readOnly={true}
                    value={lampiran !== null && lampiran.lampiran.portofolio}
                    label="Jumlah Projek"
                    dark
                  ></TextInput>
                  <TextInput
                    readOnly={true}
                    value={
                      lampiran !== null && lampiran.lampiran.jumlahpersonil
                    }
                    label="Jumlah Personel"
                    dark
                  ></TextInput>
                  <TextInput
                    readOnly={true}
                    value={
                      lampiran !== null && lampiran.lampiran.peralatan
                    }
                    label="Jumlah Peralatan"
                    dark
                  ></TextInput>
                  <TextInput
                    readOnly={true}
                    value={lampiran !== null && lampiran.lampiran.pengalaman}
                    label="Pengalman"
                    dark
                  ></TextInput>
                  <TextInput
                    readOnly={true}
                    value={lampiran !== null && lampiran.lampiran.sertifikat}
                    label="Banyak Sertifikat"
                    dark
                  ></TextInput>
                </div>

                <div className="flex justify-start gap-2 mt-4 mr-auto">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-500 bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                  >
                    Close
                  </button>
                  {lampiran !== null && lampiran.fileTender && (
                    <a
                      href={`http://localhost:8000/files/${lampiran.fileTender}`}
                      download
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-400 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    >
                      Download File
                    </a>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalLampiran;
