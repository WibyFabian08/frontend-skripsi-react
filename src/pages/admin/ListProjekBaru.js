import React, { useEffect, useState } from "react";
import Layout from "../../layouts";
import { Loading } from "../../elements";
import { useDispatch } from "react-redux";
import { ModalDelete } from "../../components";
import { showError, showSuccess } from "../../utils/showNotif";
import { NotifContainer } from "../../elements";
import { Link } from "react-router-dom";
import { deleteLowongan, getLowongan } from "../../redux/action/lowonganProjek";

const ListProjekBaru = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLowongan(setData, setIsLoading));
  }, [dispatch]);

  const showModalDelete = (id) => {
    setIsOpen(!isOpen);
    setDeleteId(id);
  };

  const handleDelete = () => {
    dispatch(
      deleteLowongan(
        deleteId,
        setData,
        setIsOpen,
        setIsLoadingDelete,
        setDeleteId,
        showError,
        showSuccess
      )
    );
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <Layout>
      <div>
        <h6 style={{ color: "#0C0D36" }} className="text-2xl font-semibold">
          List Projek Baru
        </h6>
        <p className="text-sm text-gray-400">
          Projek baru yang belum mememilih kontraktor
        </p>
      </div>

      <div className="mx-auto">
        <div className="w-full overflow-x-auto">
          <div className="border-b border-gray-200 shadow">
            <div className="mt-5 mb-5">
              <Link
                to={"/admin/create-projek"}
                className="px-4 py-1 text-sm text-white bg-blue-400 rounded"
              >
                Tambah Projek
              </Link>
            </div>

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
                    if (data.isAvail) {
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
                              to={`/admin/calon-kontraktor/${data._id}`}
                              className="px-4 py-1 text-sm text-white transition-all duration-200 bg-green-400 rounded hover:bg-green-500"
                            >
                              Lihat Pelamar
                            </Link>
                            <Link
                              to={`/admin/update/projek/${data._id}`}
                              className="px-4 py-1 text-sm text-white transition-all duration-200 bg-blue-400 rounded hover:bg-blue-500"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => showModalDelete(data._id)}
                              className="px-4 py-1 text-sm text-white transition-all duration-200 bg-red-400 rounded hover:bg-red-500"
                            >
                              Delete
                            </button>
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

      <ModalDelete
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Yakin hapus data?"
        description="Data akan akun akan dihapus permanen"
        label={isLoadingDelete ? "Deleting..." : "Hapus"}
        onClick={() => handleDelete()}
      />

      <NotifContainer />
    </Layout>
  );
};

export default ListProjekBaru;
