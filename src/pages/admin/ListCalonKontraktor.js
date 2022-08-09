import React, { useEffect, useState } from "react";
import Layout from "../../layouts";
import { Loading } from "../../elements";
import { useDispatch } from "react-redux";
import { ModalLampiran, ModalPenilaian } from "../../components";
import { NotifContainer } from "../../elements";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  adminGetCalonKontraktorByLowonganId,
  updatePenilaianCalonKontraktor,
} from "../../redux/action/calonKontraktor";
import { getAllFormInputAdmin } from "../../redux/action/formInput";
import { showError, showSuccess } from "../../utils/showNotif";
import {
  createPenilaianKontaktor,
  getPenilianKontraktorByLowonganId,
} from "../../redux/action/penilaianMandor";
import {
  createRangking,
  getNormalisasi,
  getRangking,
  pilihKontraktor,
  updateRangking,
} from "../../redux/action/rangking";
import convertRupiah from "../../utils/convertRupiah";

const ListCalonKontraktor = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPenilaian, setIsOpenPenilaian] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lampiran, setLampiran] = useState(null);
  const [formInput, setFormInput] = useState([]);
  const [inputData, setInputData] = useState({});
  const [prevGrade, setPrevGrade] = useState(null);
  const [kontraktorId, setKontraktorId] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoadingPenilaian, setIsLoadingPenilaian] = useState(false);
  const [dataPenilaian, setDataPenilaian] = useState([]);
  const [hasilNormalisasi, setHasilNormalisasi] = useState([]);
  const [hasilRangking, setHasilRangking] = useState([]);
  const [isLoadingRangking, setIsLoadingRangking] = useState(false);
  const [isLoadingUpdateRangking, setIsLoadingUpdateRangking] = useState(false);
  const [tabelHead, setTableHead] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.type === "text" || e.target.type === "number") {
      setInputData({
        ...inputData,
        [e.target.name]: e.target.value,
      });
    } else {
      setInputData({
        ...inputData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handlePilihKontraktor = (id) => {
    const data = {
      kontraktorId: id,
    };
    dispatch(pilihKontraktor(params.id, data, navigate));
    dispatch(updateRangking(params.id, setIsLoadingUpdateRangking));
  };

  const handleCreateRangking = () => {
    const data = {
      lowonganId: params.id,
    };

    dispatch(
      createRangking(
        data,
        setIsLoadingRangking,
        setHasilNormalisasi,
        setHasilRangking
      )
    );
  };

  const handleCratePenilaian = () => {
    const data = {
      lowonganId: params.id,
    };

    dispatch(
      createPenilaianKontaktor(data, setIsLoadingPenilaian, setDataPenilaian, setTableHead)
    );
  };

  const handleSubmit = () => {
    formInput.forEach((data) => {
      inputData[data.inputName] = parseInt(inputData[data.inputName]);
    });

    const data = {
      ...inputData,
      ...prevGrade,
    };

    dispatch(
      updatePenilaianCalonKontraktor(
        data,
        kontraktorId,
        params.id,
        showError,
        showSuccess,
        setData
      )
    );
    setIsOpenPenilaian(false);
    setPrevGrade(null);
    setInputData({});
  };

  const showModalPenilaian = (data) => {
    setPrevGrade(data.lampiran);
    setKontraktorId(data.kontraktorId._id);
    setIsOpenPenilaian(!isOpenPenilaian);
  };

  const showModal = (data) => {
    setIsOpen(!isOpen);
    setLampiran(data);
  };

  useEffect(() => {
    let buffer = {};
    formInput.forEach((data) => {
      buffer = {
        ...buffer,
        [data.inputName]: "",
      };
    });

    setInputData(buffer);
  }, [formInput]);

  useEffect(() => {
    dispatch(getRangking(params.id, setHasilRangking));
  }, [dispatch, params.id]);

  useEffect(() => {
    dispatch(getNormalisasi(params.id, setHasilNormalisasi));
  }, [dispatch, params.id]);

  useEffect(() => {
    dispatch(
      getPenilianKontraktorByLowonganId(
        params.id,
        setDataPenilaian,
        setTableHead
      )
    );
  }, [dispatch, params.id]);

  useEffect(() => {
    dispatch(getAllFormInputAdmin(setFormInput));
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      adminGetCalonKontraktorByLowonganId(params.id, setData, setIsLoading)
    );
  }, [dispatch, params.id]);

  useEffect(() => {
    let buffer = [];
    if (data.length > 0) {
      data.filter((data) => {
        if (data.isAssessment === false) {
          buffer.push(data);
        }
      });
    }

    if (buffer.length > 0) {
      setIsReady(false);
    } else {
      setIsReady(true);
    }
  }, [data]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <Layout>
      <div>
        <h6 style={{ color: "#0C0D36" }} className="text-2xl font-semibold">
          List Calon Kontraktor
        </h6>
        <p className="text-sm text-gray-400">
          Calon Kontraktor Yang Join Tender Projek{" "}
          {data.length > 0 && data[0].lowonganId.name}
        </p>
      </div>

      <div className="mx-auto">
        <div className="w-full overflow-x-auto">
          <div className="border-b border-gray-200 shadow">
            <div className="mt-5 mb-5">
              <Link
                to={"/admin/projek-baru"}
                className="px-4 py-1 text-sm text-white bg-blue-400 rounded"
              >
                Kembali
              </Link>
            </div>

            <table className="w-full mb-5 hover:table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-2 text-xs text-gray-500">No</th>
                  <th className="px-6 py-2 text-xs text-gray-500">
                    Kontraktor
                  </th>
                  <th className="px-6 py-2 text-xs text-gray-500">
                    Harga Penawaran
                  </th>
                  <th className="px-6 py-2 text-xs text-gray-500">Status</th>
                  <th className="px-6 py-2 text-xs text-gray-500">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {data.length > 0 ? (
                  data.map((data, index) => {
                    return (
                      <tr
                        className="whitespace-nowrap hover:bg-gray-100"
                        key={index}
                      >
                        <td className="px-6 py-4 text-sm text-center text-gray-500">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-center text-gray-500">
                            {data.kontraktorId.fullname || "-"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-center text-gray-500">
                            Rp.{" "}
                            {convertRupiah(data.lampiran.hargapenawaran) || "-"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-center text-gray-500">
                            {data.isAssessment
                              ? "Sudah Dinilai"
                              : "Belum Dinilai" || "-"}
                          </div>
                        </td>
                        <td className="flex items-center justify-center gap-2 px-6 py-4">
                          <Link
                            to={`/detail/${data.kontraktorId._id}`}
                            className="px-4 py-1 text-sm text-white transition-all duration-200 bg-green-400 rounded hover:bg-green-500"
                          >
                            Detail Pelamar
                          </Link>
                          <button
                            onClick={() => showModal(data)}
                            className="px-4 py-1 text-sm text-white transition-all duration-200 bg-blue-400 rounded hover:bg-blue-500"
                          >
                            Detail Lampiran
                          </button>
                          {!data.isAssessment && (
                            <button
                              onClick={() => showModalPenilaian(data)}
                              className="px-4 py-1 text-sm text-white transition-all duration-200 bg-indigo-400 rounded hover:bg-indigo-500"
                            >
                              Beri Penilaian
                            </button>
                          )}
                        </td>
                      </tr>
                    );
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

        {isReady && data.length > 0 && (
          <>
            <div className="mt-5">
              <h6
                style={{ color: "#0C0D36" }}
                className="text-2xl font-semibold"
              >
                Anda Sudah Memberikan Penilaian Kepada Seluruh Calon Kontraktor
              </h6>
              {dataPenilaian.length === 0 ? (
                <p className="text-sm text-gray-400">
                  Lakukan Perhitungan Bobot Sekarang?
                </p>
              ) : (
                <p className="text-sm text-gray-400">Hasil Perhitungan bobot</p>
              )}
            </div>

            {dataPenilaian.length === 0 && (
              <div className="mt-5 mb-5">
                <button
                  onClick={() => handleCratePenilaian()}
                  className="px-4 py-1 text-sm text-white bg-blue-400 rounded"
                >
                  {isLoadingPenilaian ? "Loading" : "Hitung Pembobotan"}
                </button>
              </div>
            )}

            <div className="mt-5 overflow-x-auto">
              {dataPenilaian.length > 0 && (
                <table className="w-full mb-5 hover:table-auto">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-2 text-xs text-gray-500">No</th>
                      <th className="px-6 py-2 text-xs text-gray-500">
                        Kontraktor
                      </th>
                      {tabelHead.map((data, index) => {
                        return (
                          <th
                            className="px-6 py-2 text-xs text-gray-500"
                            key={index}
                          >
                            {data}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {dataPenilaian.map((data, index) => {
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
                              {data.kontraktorId.fullname || "-"}
                            </div>
                          </td>
                          {tabelHead.map((item, index2) => {
                            return (
                              <td className="px-6 py-4" key={index2}>
                                <div className="text-sm text-center text-gray-500">
                                  {data.penilaian[item] || "-"}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {dataPenilaian.length > 0 && (
              <div className="mt-5">
                <h6
                  style={{ color: "#0C0D36" }}
                  className="text-2xl font-semibold"
                >
                  Pembobotan Sudah Dilakukan
                </h6>
                {hasilNormalisasi.length < 1 ? (
                  <p className="text-sm text-gray-400">
                    Segera Lakukan Normalisasi dan Perangkingan Untuk Mendapat
                    Calon Kontraktor Terbaik
                  </p>
                ) : (
                  <p className="text-sm text-gray-400">
                    Hasil Perhitungan Normalisasi
                  </p>
                )}
              </div>
            )}

            {dataPenilaian.length > 0 && (
              <div className="mt-5 mb-5">
                <button
                  onClick={() => handleCreateRangking()}
                  className="px-4 py-1 text-sm text-white bg-blue-400 rounded"
                >
                  {isLoadingRangking ? "Loading..." : "Lakukan Perangkingan"}
                </button>
              </div>
            )}

            {/* tabel normalisasi */}
            <div className="mt-5 overflow-x-auto">
              {hasilNormalisasi.length > 0 && (
                <table className="w-full mb-5 hover:table-auto">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-2 text-xs text-gray-500">No</th>
                      <th className="px-6 py-2 text-xs text-gray-500">
                        Kontraktor
                      </th>
                      {tabelHead.map((data, index) => {
                        return (
                          <th
                            className="px-6 py-2 text-xs text-gray-500"
                            key={index}
                          >
                            {data}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {hasilNormalisasi.map((data, index) => {
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
                              {data.kontraktorId.fullname || "-"}
                            </div>
                          </td>
                          {tabelHead.map((item, index2) => {
                            return (
                              <td className="px-6 py-4" key={index2}>
                                <div className="text-sm text-center text-gray-500">
                                  {data.normalisasi[item] || "-"}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {hasilRangking.length > 0 && (
              <div className="mt-5">
                <h6
                  style={{ color: "#0C0D36" }}
                  className="text-2xl font-semibold"
                >
                  Hasil Perangkingan Calon Kontraktor
                </h6>

                <p className="text-sm text-gray-400">
                  Hasil Perhitungan Dari Semua Kriteria
                </p>
              </div>
            )}

            {/* tabel rangking */}
            <div className="mt-5 overflow-x-auto">
              {hasilRangking.length > 0 && (
                <table className="w-full mb-5 hover:table-auto">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-2 text-xs text-gray-500">
                        Rangking
                      </th>
                      <th className="px-6 py-2 text-xs text-gray-500">
                        Kontraktor
                      </th>
                      <th className="px-6 py-2 text-xs text-gray-500">Nilai</th>
                      <th className="px-6 py-2 text-xs text-gray-500">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {hasilRangking.map((data, index) => {
                      return (
                        <tr
                          className={[
                            "whitespace-nowrap hover:bg-gray-100",
                            index === 0 ? "bg-gray-300" : "",
                          ].join(" ")}
                          key={index}
                        >
                          <td className="px-6 py-4 text-sm text-center text-gray-500">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-center text-gray-500">
                              {data.kontraktorId.fullname || "-"}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-center text-gray-500">
                              {data.nilai || "-"}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-center text-gray-500">
                              <button
                                onClick={() =>
                                  handlePilihKontraktor(data.kontraktorId._id)
                                }
                                className="px-4 py-1 text-sm text-white bg-blue-400 rounded"
                              >
                                {isLoadingUpdateRangking ? "Loading" : "Pilih"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {hasilRangking.length > 0 && (
              <div>
                <p
                  style={{ color: "#0C0D36" }}
                  className="text-lg font-semibold"
                >
                  Hasil Perhitungan menunjukan{" "}
                  <span className="font-bold">
                    {hasilRangking[0].kontraktorId.fullname}
                  </span>{" "}
                  menjadi calon kontraktor dengan nilai tertinggi
                </p>
              </div>
            )}

            {/* {hasilRangking.length > 0 && (
              <div className="mt-5 mb-5">
                <button
                  onClick={() => handleCloseTender()}
                  className="px-4 py-1 text-sm text-white bg-blue-400 rounded"
                >
                  {isLoadingUpdateRangking ? "Loading..." : "Close Tender"}
                </button>
              </div>
            )} */}
          </>
        )}
      </div>

      <ModalLampiran
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setLampiran={setLampiran}
        lampiran={lampiran}
      />

      <ModalPenilaian
        isOpenPenilaian={isOpenPenilaian}
        setIsOpenPenilaian={setIsOpenPenilaian}
        formInput={formInput}
        inputData={inputData}
        onChange={(e) => handleChange(e)}
        onClick={() => handleSubmit()}
      />

      <NotifContainer />
    </Layout>
  );
};

export default ListCalonKontraktor;
