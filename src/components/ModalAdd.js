import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { TextInput } from "../elements";

const ModalAdd = ({
  isOpenAdd,
  setIsOpenAdd,
  dataTransaksi,
  onChange,
  onClick,
  kriteria,
  dataKriteria,
  setKriteria,
  handleChangeForm,
  formType,
  handleChangeFormInput,
  formInput,
  setFormInput,
  setFormType
}) => {
  function closeModal() {
    setIsOpenAdd(false);
    setKriteria({
      id: null,
      kriteria: "",
      bobot: "",
      isBenefit: "",
    });
    setFormInput({
      type: "",
      placeholder: "",
      label: "",
      isForAdmin: true,
    });
    setFormType(null)
  }

  if (kriteria) {
    return (
      <>
        <Transition appear show={isOpenAdd} as={Fragment}>
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
                    className="text-2xl font-medium leading-6 text-gray-900"
                  >
                    Tambah Kriteria
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {dataKriteria.id ? "Edit" : "Tambahkan"} data kriteria
                    </p>
                  </div>

                  <div className="mt-5">
                    <TextInput
                      placeholder="Kriteria"
                      label="Nama Kriteria"
                      name="kriteria"
                      value={dataKriteria.kriteria}
                      onChange={onChange}
                      dark
                    ></TextInput>
                    <TextInput
                      placeholder="Bobot (Dalam Persen)"
                      label="Bobot"
                      name="bobot"
                      value={dataKriteria.bobot}
                      onChange={onChange}
                      dark
                    ></TextInput>
                    <div className="w-full">
                      <div className="mb-5">
                        <label
                          htmlFor="gender"
                          style={{ color: "#0C0D36" }}
                          className="mb-3 font-semibold capitalize text-md"
                        >
                          Cost/Benefit
                        </label>
                        <select
                          className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none"
                          name="isBenefit"
                          style={{ color: "#0C0D36" }}
                          value={dataKriteria.isBenefit}
                          onChange={onChange}
                        >
                          <option value="">Jenis Kriteria</option>
                          <option value={false}>Cost</option>
                          <option value={true}>Benefit</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* add form area */}
                  <div className="mb-5">
                    <label
                      htmlFor="gender"
                      style={{ color: "#0C0D36" }}
                      className="mb-3 font-semibold capitalize text-md"
                    >
                      Buat Form Input Kriteria
                    </label>
                  </div>

                  <div className="mb-5">
                    <label
                      htmlFor="gender"
                      style={{ color: "#0C0D36" }}
                      className="mb-3 font-semibold capitalize text-md"
                    >
                      Jenis Form
                    </label>
                    <select
                      className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none"
                      name="isBenefit"
                      style={{ color: "#0C0D36" }}
                      value={formType}
                      onChange={handleChangeForm}
                    >
                      <option value="">Jenis Form</option>
                      <option value={"input"}>Input Text / Number</option>
                      <option value={"select"}>Form Select</option>
                    </select>
                  </div>

                  {formType === "input" && (
                    <>
                      <div className="mb-5">
                        <label
                          htmlFor="gender"
                          style={{ color: "#0C0D36" }}
                          className="mb-3 font-semibold capitalize text-md"
                        >
                          Untuk Siapa Form Ini?
                        </label>
                        <select
                          className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none"
                          name="isForAdmin"
                          style={{ color: "#0C0D36" }}
                          value={formInput.isForAdmin}
                          onChange={handleChangeFormInput}
                        >
                          <option value="">Pilih Role</option>
                          <option value={true}>Admin</option>
                          <option value={false}>User / Kontraktor</option>
                        </select>
                      </div>
                      <TextInput
                        placeholder="Masukan Label Input"
                        label="Label"
                        name="label"
                        value={formInput.label}
                        onChange={handleChangeFormInput}
                        dark
                      ></TextInput>
                      <TextInput
                        placeholder="Masukan Placeholder"
                        label="Placeholder"
                        name="placeholder"
                        value={formInput.placeholder}
                        onChange={handleChangeFormInput}
                        dark
                      ></TextInput>
                      <div className="mb-5">
                        <label
                          htmlFor="gender"
                          style={{ color: "#0C0D36" }}
                          className="mb-3 font-semibold capitalize text-md"
                        >
                          Jenis Form
                        </label>
                        <select
                          className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none"
                          name="type"
                          style={{ color: "#0C0D36" }}
                          value={formInput.type}
                          onChange={handleChangeFormInput}
                        >
                          <option value="">Tipe Input</option>
                          <option value={"text"}>Text</option>
                          <option value={"number"}>Number</option>
                        </select>
                      </div>
                    </>
                  )}

                  {formType === "select" && (
                    <>
                      <div className="mb-5">
                        <label
                          htmlFor="gender"
                          style={{ color: "#0C0D36" }}
                          className="mb-3 font-semibold capitalize text-md"
                        >
                          Untuk Siapa Form Ini?
                        </label>
                        <select
                          className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none"
                          name="isForAdmin"
                          style={{ color: "#0C0D36" }}
                          value={formInput.isForAdmin}
                          onChange={handleChangeFormInput}
                        >
                          <option value="">Pilih Role</option>
                          <option value={true}>Admin</option>
                          <option value={false}>User / Kontraktor</option>
                        </select>
                      </div>
                      <TextInput
                        placeholder="Masukan Label Input"
                        label="Label"
                        name="label"
                        value={formInput.label}
                        onChange={handleChangeFormInput}
                        dark
                      ></TextInput>
                    </>
                  )}

                  <div className="flex items-center gap-2 mt-4">
                    <button
                      type="button"
                      onClick={onClick}
                      className="inline-flex justify-center flex-1 px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    >
                      {dataKriteria.id ? "Update" : "Tambahkan"}
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
  }

  return (
    <>
      <Transition appear show={isOpenAdd} as={Fragment}>
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
                  Transaksi
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Masukan data transaksi anda
                  </p>
                </div>

                <div className="mt-5">
                  <TextInput
                    placeholder="Pembangunan Rumah"
                    label="Jenis Pekerjaan"
                    name="pekerjaan"
                    value={dataTransaksi.pekerjaan}
                    onChange={onChange}
                    dark
                  ></TextInput>
                  <TextInput
                    placeholder="120"
                    label="Luas Bangunan"
                    name="luasBangunan"
                    value={dataTransaksi.luasBangunan}
                    onChange={onChange}
                    dark
                  ></TextInput>
                  <TextInput
                    placeholder="Lokasi Pekerjaan"
                    label="Lokasi"
                    name="lokasiPekerjaan"
                    value={dataTransaksi.lokasiPekerjaan}
                    onChange={onChange}
                    dark
                  ></TextInput>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <button
                    type="button"
                    onClick={onClick}
                    className="inline-flex justify-center flex-1 px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  >
                    Tambahkan
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

export default ModalAdd;
