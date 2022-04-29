import React, { useEffect, useState } from "react";
import Layout from "../../layouts";
import { Loading } from "../../elements";
import { useDispatch, useSelector } from "react-redux";
import { ModalLampiran } from "../../components";

import { getCalonKontraktorByKontraktorId } from "../../redux/action/calonKontraktor";

const ListTender = () => {
  const { activeUser } = useSelector((state) => state.userState);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([])
  const [lampiran, setLampiran] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const showModalDetail = (data) => {
    setLampiran(data);
    setIsOpen(!isOpen)
  };

  useEffect(() => {
    dispatch(
      getCalonKontraktorByKontraktorId(
        activeUser.data._id,
        setData,
        setIsLoading
      )
    );
  }, [dispatch, activeUser.data._id]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <Layout>
      <div>
        <h6 style={{ color: "#0C0D36" }} className="text-2xl font-semibold">
          List Tender
        </h6>
        <p className="text-sm text-gray-400">
          Semua tender yang pernah anda ikuti
        </p>
      </div>

      <div className="flex justify-center mx-auto mt-5">
        <div className="flex flex-col w-full overflow-x-auto">
          <div className="w-full ">
            <div className="border-b border-gray-200 shadow">
              <table className="w-full mb-5 hover:table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-2 text-xs text-gray-500">No</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Projek</th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Harga Penawaran
                    </th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Status Tender
                    </th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Status Penilaian
                    </th>
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
                            <div className="text-sm text-left text-gray-500">
                              {data.lowonganId.name || "-"}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-center text-gray-500">
                              Rp.{data.lampiran.hargapenawaran || "-"}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-center text-gray-500">
                              {data.status || "-"}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-center text-gray-500">
                            {data.isAssessment
                              ? "Sudah Dinilai"
                              : "Belum Dinilai" || "-"}
                          </td>
                          <td className="flex items-center justify-center gap-2 px-6 py-4">
                            <button
                              onClick={() => showModalDetail(data)}
                              className="px-4 py-1 text-sm text-white bg-blue-400 rounded"
                            >
                              Detail
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
        </div>
      </div>

      <ModalLampiran
        lampiran={lampiran}
        setLampiran={setLampiran}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      ></ModalLampiran>
    </Layout>
  );
};

export default ListTender;
