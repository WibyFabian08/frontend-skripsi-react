import React, { useEffect, useState } from "react";
import Layout from "../../layouts";
import { Loading } from "../../elements";
import { useDispatch } from "react-redux";
import { getLowongan } from "../../redux/action/lowonganProjek";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { TextInput } from "../../elements";
import { Link } from "react-router-dom";

const RiwayatTender = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pemenang, setPemenang] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  function closeModal() {
    setIsOpen(false);
    setPemenang(null);
  }

  useEffect(() => {
    dispatch(getLowongan(setData, setIsLoading));
  }, [dispatch]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <Layout>
      <div>
        <h6 style={{ color: "#0C0D36" }} className="text-2xl font-semibold">
          Tender Yang Sudah Memilih Kontraktor
        </h6>
        <p className="text-sm text-gray-400">
          Semua tender yang sudah memilih kontraktor dan siap dikerjakan
        </p>
      </div>

      <div className="mx-auto mt-5">
        <div className="w-full overflow-x-auto">
          <div className="border-b border-gray-200 shadow">
            <table className="w-full mb-5 hover:table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-2 text-xs text-gray-500">No</th>
                  <th className="px-6 py-2 text-xs text-gray-500">
                    Nama Projek
                  </th>
                  <th className="px-6 py-2 text-xs text-gray-500">Pemilik</th>
                  <th className="px-6 py-2 text-xs text-gray-500">
                    Volume Pekerjaan
                  </th>
                  <th className="px-6 py-2 text-xs text-gray-500">
                    Total Biaya
                  </th>
                  <th className="px-6 py-2 text-xs text-gray-500">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {data.length > 0 ? (
                  data.map((data, index) => {
                    if (!data.isAvail) {
                      return (
                        <tr
                          className="whitespace-nowrap hover:bg-gray-100"
                          key={index}
                        >
                          <td className="px-6 py-4 text-sm text-center text-gray-500">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-left text-gray-500">
                              {data.name || "-"}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-center text-gray-500">
                              {data.pemilik || "-"}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-right text-gray-500">
                              {data.volumePekerjaan || "-"} m
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-right text-gray-500">
                            Rp.{data.RAB || "-"}
                          </td>
                          <td className="flex items-center justify-center gap-2 px-6 py-4">
                            <Link
                              to={`/admin/hasil-pemilihan/${data._id}`}
                              className="px-4 py-1 text-sm text-white transition-all duration-200 bg-blue-400 rounded hover:bg-blue-500"
                            >
                              Lihat Hasil
                            </Link>
                          </td>
                        </tr>
                      );
                    } else {
                      return (
                        <tr>
                          <td
                            colSpan="7"
                            className="px-6 py-4 text-xl text-center text-gray-400"
                          >
                            Data tidak ditemukan
                          </td>
                        </tr>
                      );
                    }
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-4 text-xl text-center text-gray-400"
                    >
                      Data tidak ditemukan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* modal */}
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
                      pemenang !== null && pemenang.lampiran.hargapenawaran
                    }
                    label="Harga Penawaran"
                    dark
                  ></TextInput>
                  <TextInput
                    readOnly={true}
                    value={pemenang !== null && pemenang.lampiran.keuangan}
                    label="Keuangan Kontraktor"
                    dark
                  ></TextInput>
                  <TextInput
                    readOnly={true}
                    value={pemenang !== null && pemenang.lampiran.portofolio}
                    label="Jumlah Projek"
                    dark
                  ></TextInput>
                  <TextInput
                    readOnly={true}
                    value={
                      pemenang !== null && pemenang.lampiran.jumlahpersonil
                    }
                    label="Jumlah Personel"
                    dark
                  ></TextInput>
                  <TextInput
                    readOnly={true}
                    value={
                      pemenang !== null && pemenang.lampiran.peralatan
                    }
                    label="Jumlah Peralatan"
                    dark
                  ></TextInput>
                  <TextInput
                    readOnly={true}
                    value={pemenang !== null && pemenang.lampiran.pengalaman}
                    label="Pengalman"
                    dark
                  ></TextInput>
                  <TextInput
                    readOnly={true}
                    value={pemenang !== null && pemenang.lampiran.sertifikat}
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
                  <Link
                    to={`/detail/${pemenang !== null && pemenang.kontraktorId}`}
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-400 border border-transparent rounded-md hover:bg-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  >
                    Detail Pemenang
                  </Link>
                  {pemenang !== null && pemenang.fileTender && (
                    <a
                      href={`http://localhost:8000/files/${pemenang.fileTender}`}
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
    </Layout>
  );
};

export default RiwayatTender;
