import React, { useEffect, useState } from "react";
import Layout from "../layouts";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getById } from "../redux/action/user";
import { Loading, TextArea, TextInput } from "../elements";

import { Tab } from "@headlessui/react";
import { getKontraktorGalleryById } from "../redux/action/kontraktorGallery";
import { getKinerjaKontraktorById } from "../redux/action/kinerjaKontraktor";

const Detail = () => {
  const navigation = useNavigate();
  const params = useParams();
  const [galeries, setGalleries] = useState([]);
  const [userData, setUserData] = useState(null);
  const [kinerja, setKinerja] = useState(null);

  const [isLoadingFetch, setIsLoadingFetch] = useState(false);
  const dispatch = useDispatch();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    dispatch(getById(params.id, setUserData, setIsLoadingFetch));
  }, [params.id, dispatch]);

  useEffect(() => {
    dispatch(getKontraktorGalleryById(params.id, setGalleries));
  }, [params.id, dispatch]);

  useEffect(() => {
    dispatch(getKinerjaKontraktorById(params.id, setKinerja));
  }, [params.id, dispatch]);

  if (isLoadingFetch) {
    return <Loading></Loading>;
  }

  return (
    <>
      <Layout>
        <div>
          <h6 style={{ color: "#0C0D36" }} className="text-2xl font-semibold">
            Detail Profile
          </h6>
          <p className="text-sm text-gray-400">
            Informasi lengkap dari {userData !== null && userData.fullname}
          </p>
        </div>

        <button
          className="px-4 py-1 mt-5 text-sm text-white bg-blue-400 rounded"
          onClick={() => navigation(-1)}
        >
          Kembali
        </button>

        <div className="flex flex-wrap mt-5 -mx-2 ">
          <div className="w-full px-2 mb-5 md:w-1/4 md:mb-0">
            <div className="flex flex-col items-center justify-center p-5 bg-white rounded-md shadow-md">
              <div className="w-full overflow-hidden bg-white rounded-md">
                <img
                  src={
                    userData !== null && userData.image
                      ? `http://localhost:8000/files/${userData.image}`
                      : "/images/blank.png"
                  }
                  className="object-cover w-full h-full"
                  alt="profile"
                />
              </div>
              <div className="mt-3 text-center">
                <p className="font-bold text-md">
                  {userData ? userData.fullname : "-"}
                </p>
                <p className="text-sm text-gray-400">
                  {userData !== null && userData.profession !== "null"
                    ? userData.profession
                    : "-"}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full px-2 md:w-3/4">
            <div className="p-5 bg-white rounded-md shadow-md">
              <div className="w-full px-2 sm:px-0">
                <Tab.Group>
                  <Tab.List
                    className="flex p-1 space-x-1 rounded-xl"
                    style={{ backgroundColor: "#23A6F0" }}
                  >
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          "w-full py-2.5 text-sm leading-5 font-medium text-white rounded-lg",
                          "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                          selected
                            ? "bg-white shadow text-blue-400"
                            : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                        )
                      }
                    >
                      Identitas
                    </Tab>
                    <Tab
                      onClick={() => alert("ki=lik")}
                      className={({ selected }) =>
                        classNames(
                          "w-full py-2.5 text-sm leading-5 font-medium text-white rounded-lg",
                          "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                          selected
                            ? "bg-white shadow text-blue-400"
                            : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                        )
                      }
                    >
                      Informasi Teknis
                    </Tab>
                    <Tab
                      onClick={() => alert("ki=lik")}
                      className={({ selected }) =>
                        classNames(
                          "w-full py-2.5 text-sm leading-5 font-medium text-white rounded-lg",
                          "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                          selected
                            ? "bg-white shadow text-blue-400"
                            : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                        )
                      }
                    >
                      Portofolio
                    </Tab>
                  </Tab.List>
                  <Tab.Panels className="mt-2">
                    <Tab.Panel
                      className={classNames(
                        "bg-white rounded-xl p-3",
                        "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
                      )}
                    >
                      <div className="-mx-2">
                        <TextInput
                          dark
                          label="Fullname"
                          readOnly={true}
                          value={userData !== null ? userData.fullname : "-"}
                        ></TextInput>
                        <TextInput
                          readOnly={true}
                          dark
                          label="Email"
                          value={
                            userData && userData.email !== "null"
                              ? userData.email
                              : "-"
                          }
                        ></TextInput>
                        <TextInput
                          readOnly={true}
                          dark
                          label="No Telpon"
                          value={
                            userData && userData.phone !== "null"
                              ? userData.phone
                              : "-"
                          }
                        ></TextInput>
                        <TextInput
                          dark
                          readOnly={true}
                          label="Bidang Usaha"
                          value={
                            userData && userData.profession !== "null"
                              ? userData.profession
                              : "-"
                          }
                        ></TextInput>
                        <TextArea
                          readOnly={true}
                          dark
                          label="Address"
                          value={
                            userData && userData.address !== "null"
                              ? userData.address
                              : "-"
                          }
                        ></TextArea>
                        <TextArea
                          readOnly={true}
                          dark
                          label="Description"
                          value={
                            userData && userData.description !== "null"
                              ? userData.description
                              : "-"
                          }
                        ></TextArea>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel
                      className={classNames(
                        "bg-white rounded-xl p-3",
                        "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
                      )}
                    >
                      <div className="-mx-2">
                        <TextInput
                          dark
                          label="Spesialis Keahlian"
                          readOnly={true}
                          value={kinerja ? kinerja.bidangKeahlian : "-"}
                        ></TextInput>
                        <TextInput
                          dark
                          readOnly={true}
                          label="Pengalaman (Tahun)"
                          value={kinerja ? kinerja.pengalaman : "-"}
                        ></TextInput>
                        <TextInput
                          dark
                          label="Bentuk Badan Usaha"
                          readOnly={true}
                          value={kinerja ? kinerja.legalitasPerusahaan : "-"}
                        ></TextInput>
                        <TextInput
                          dark
                          label="Jumlah Project"
                          readOnly={true}
                          value={kinerja ? kinerja.jumlahProject : "-"}
                        ></TextInput>
                        <TextInput
                          dark
                          label="Jumlah Pekerja (Orang)"
                          readOnly={true}
                          value={kinerja ? kinerja.jumlahTukang : "-"}
                        ></TextInput>
                        <TextInput
                          dark
                          label="Sertifikat Keahlian"
                          readOnly={true}
                          value={
                            kinerja && kinerja.sertifikat
                              ? "Punya"
                              : "Tidak Punya"
                          }
                        ></TextInput>
                        <TextInput
                          dark
                          label="Peralatan Kerja"
                          readOnly={true}
                          value={
                            kinerja && kinerja.tools
                              ? "Tersedia"
                              : "Tidak Tersedia"
                          }
                        ></TextInput>
                        <TextInput
                          dark
                          label="Kemampuan Baca Gambar Kerja"
                          readOnly={true}
                          value={kinerja ? kinerja.bacaGambar : "-"}
                        ></TextInput>
                      </div>

                      <div className="-mb-2">
                        <p className="text-gray-400 text-md">
                          Keterangan Baca Gambar :{" "}
                        </p>
                        <p className="text-sm text-gray-400">
                          Nilai 1 = Sangat Buruk
                        </p>
                        <p className="text-sm text-gray-400">Nilai 2 = Buruk</p>
                        <p className="text-sm text-gray-400">
                          Nilai 3 = Agak Baik
                        </p>
                        <p className="text-sm text-gray-400">Nilai 4 = Baik</p>
                        <p className="text-sm text-gray-400">
                          Nilai 5 = Sangat Baik
                        </p>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel
                      className={classNames(
                        "bg-white rounded-xl p-3",
                        "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60 mx-auto"
                      )}
                    >
                      {galeries.length > 0 ? (
                        <div className="flex flex-wrap items-center gap-10 mx-auto">
                          {galeries.map((gallery) => {
                            return (
                              <div className="relative mb-5" key={gallery._id}>
                                <img
                                  width={300}
                                  className="object-cover rounded-md"
                                  src={`http://localhost:8000/files/${gallery.image}`}
                                  alt="gallery"
                                />
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="mt-10 text-center text-md">
                          Mandor belum memiliki portofolio
                        </div>
                      )}
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Detail;
