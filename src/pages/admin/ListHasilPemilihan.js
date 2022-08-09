import React, { useEffect, useState, useRef } from "react";
import Layout from "../../layouts";
import { Loading } from "../../elements";
import { useDispatch } from "react-redux";
import { ModalLampiran } from "../../components";
import { Link, useParams } from "react-router-dom";
import { adminGetCalonKontraktorByLowonganId } from "../../redux/action/calonKontraktor";
import { getPenilianKontraktorByLowonganId } from "../../redux/action/penilaianMandor";
import { getNormalisasi, getRangking } from "../../redux/action/rangking";
import convertRupiah from "../../utils/convertRupiah";
import { useReactToPrint } from "react-to-print";

const ListHasilPemilihan = () => {
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lampiran, setLampiran] = useState(null);
  const [dataPenilaian, setDataPenilaian] = useState([]);
  const [hasilNormalisasi, setHasilNormalisasi] = useState([]);
  const [hasilRangking, setHasilRangking] = useState([]);
  const [tabelHead, setTableHead] = useState([]);
  const dispatch = useDispatch();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const showModal = (data) => {
    setIsOpen(!isOpen);
    setLampiran(data);
  };

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
    dispatch(
      adminGetCalonKontraktorByLowonganId(params.id, setData, setIsLoading)
    );
  }, [dispatch, params.id]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <Layout>
      <div>
        <h6 style={{ color: "#0C0D36" }} className="text-2xl font-semibold">
          Hasil Penilaian Calon Kontraktor
        </h6>
        <p className="text-sm text-gray-400">
          Calon Kontraktor Yang Join Tender Projek{" "}
          {data.length > 0 && data[0].lowonganId.name}
        </p>
      </div>

      <div className="mx-auto mb-20">
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
        <>
          <div className="mt-5">
            <h6 style={{ color: "#0C0D36" }} className="text-2xl font-semibold">
              Anda Sudah Memberikan Penilaian Kepada Seluruh Calon Kontraktor
            </h6>
            <p className="text-sm text-gray-400">Hasil Perhitungan bobot</p>
          </div>

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
              <p className="text-sm text-gray-400">
                Hasil Perhitungan Normalisasi
              </p>
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

          <div ref={componentRef} className="px-5">
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
                      <th className="px-6 py-2 text-xs text-gray-500">
                        Keterangan
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {hasilRangking.map((data, index) => {
                      return (
                        <tr
                          className={[
                            "whitespace-nowrap hover:bg-gray-100 ",
                            index === 0 ? "bg-gray-300 font-bold" : "",
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
                              {/* {data.nilai || "-"} */}
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
          </div>

          <button
            onClick={handlePrint}
            className="px-4 py-1 mx-5 mt-5 text-sm text-white bg-blue-400 rounded"
          >
            Print Hasil Rangking (PDF)
          </button>
        </>
      </div>

      <ModalLampiran
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setLampiran={setLampiran}
        lampiran={lampiran}
      />
    </Layout>
  );
};

export default ListHasilPemilihan;
