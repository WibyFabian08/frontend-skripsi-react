import React, { useEffect, useState } from "react";
import Layout from "../../layouts";
import { Loading } from "../../elements";
import { useDispatch } from "react-redux";
import { ModalDelete, ModalAdd } from "../../components";
import { showError, showSuccess } from "../../utils/showNotif";
import { NotifContainer } from "../../elements";
import {
  createKriteria,
  deleteKriteria,
  getKriteria,
  updateKriteria,
} from "../../redux/action/keiteria";
import { getFormInputByKriteriaId } from "../../redux/action/formInput";
import { checkLowongan } from "../../redux/action/lowonganProjek";

const ListKriteria = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [totalBobot, setTotalBobot] = useState(0);
  const [isAllow, setIsAllow] = useState(false);

  const [formType, setFormType] = useState(null);
  const [formInput, setFormInput] = useState({
    type: "",
    placeholder: "",
    label: "",
    isForAdmin: true,
  });

  const dispatch = useDispatch();

  const [kriteria, setKriteria] = useState({
    id: null,
    kriteria: "",
    bobot: "",
    isBenefit: "",
  });

  const handleChangeFormInput = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeForm = (e) => {
    setFormType(e.target.value);
  };

  const handleChange = (e) => {
    setKriteria({
      ...kriteria,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddKriteria = () => {
    const data = {
      kriteria: kriteria.kriteria,
      bobot: parseInt(kriteria.bobot),
      isBenefit: kriteria.isBenefit,
      inputType: formType,
      type: formInput.type === "" ? null : formInput.type,
      placeholder: formInput.placeholder === "" ? null : formInput.placeholder,
      label: formInput.label,
      isForAdmin: formInput.isForAdmin,
    };

    if (kriteria.id !== null) {
      dispatch(
        updateKriteria(
          kriteria.id,
          data,
          setData,
          setIsOpenAdd,
          showError,
          showSuccess,
          setTotalBobot,
          setFormInput,
          setFormType
        )
      );

      setKriteria({
        id: null,
        kriteria: "",
        bobot: "",
        isBenefit: "",
      });
    } else {
      dispatch(
        createKriteria(
          data,
          setData,
          setIsOpenAdd,
          showError,
          showSuccess,
          setTotalBobot,
          setFormInput,
          setFormType
        )
      );
      setKriteria({
        id: null,
        kriteria: "",
        bobot: "",
        isBenefit: "",
      });
    }
  };

  useEffect(() => {
    dispatch(checkLowongan(setIsAllow));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getKriteria(setData, setIsLoading, setTotalBobot));
  }, [dispatch]);

  const showModalDelete = (id) => {
    setIsOpen(!isOpen);
    setDeleteId(id);
  };

  const openModalAdd = (id) => {
    setIsOpenAdd(!isOpenAdd);
  };

  const openModalEdit = (data) => {
    setIsOpenAdd(!isOpenAdd);
    dispatch(getFormInputByKriteriaId(data._id, setFormInput, setFormType));
    setKriteria({
      id: data._id,
      kriteria: data.kriteria,
      bobot: data.bobot,
      isBenefit: data.isBenefit,
    });
  };

  const handleDelete = () => {
    dispatch(
      deleteKriteria(
        deleteId,
        setData,
        setIsOpen,
        setIsLoadingDelete,
        setDeleteId,
        showError,
        showSuccess,
        setTotalBobot
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
          List Kriteria
        </h6>
        <p className="text-sm text-gray-400">
          Semua kriteria untuk melakukan penilaian
        </p>
      </div>

      <div className="flex justify-center mx-auto mt-5">
        <div className="flex flex-col w-full overflow-x-auto">
          <div className="w-full ">
            <div className="border-b border-gray-200 shadow">
              {isAllow && (
                <div className="mb-5">
                  <button
                    onClick={() => openModalAdd(data._id)}
                    className="px-4 py-1 text-sm text-white bg-blue-400 rounded"
                  >
                    Tambah Kriteria
                  </button>
                </div>
              )}

              {totalBobot !== 100 && (
                <div
                  class="bg-red-100 border  border-red-400 text-red-700 px-4 py-3 rounded relative mb-5"
                  role="alert"
                >
                  <strong class="font-bold text-md">
                    Peringatan total bobot harus 100%!{" "}
                  </strong>
                  <span class="block sm:inline text-md">
                    Total bobot dalam kriteria anda bukan 100% segera perbaiki
                    pembobotan pada kriteria, jika pembobotan tidak 100%
                    perhitungan tidak akan akurat
                  </span>
                </div>
              )}

              {!isAllow && (
                <div
                  class="bg-green-100 border  border-green-400 text-green-700 px-4 py-3 rounded relative mb-5"
                  role="alert"
                >
                  <strong class="font-bold text-md">
                    Update Kriteria Tidak Bisa Dilakukan!{" "}
                  </strong>
                  <span class="block sm:inline text-md">
                    Masih terdapat project yang belum dilakukan perhitungan,
                    segera lakukan perhitungan agar kriteria dapat diupdate
                  </span>
                </div>
              )}

              <table className="w-full mb-5 hover:table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-2 text-xs text-gray-500">No</th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Kriteria
                    </th>
                    <th className="px-6 py-2 text-xs text-gray-500">Bobot</th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Persentase Bobot
                    </th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Cost/Benefit
                    </th>
                    {isAllow && (
                      <th className="px-6 py-2 text-xs text-gray-500">Aksi</th>
                    )}
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
                              {data.kriteria || "-"}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-center text-gray-500">
                              {data.bobot || "-"}%
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-center text-gray-500">
                              {data.persentaseBobot || "-"}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-center text-gray-500">
                            {data.isBenefit ? "Benefit" : "Cost" || "-"}
                          </td>
                          {isAllow && (
                            <td className="flex items-center justify-center gap-2 px-6 py-4">
                              <button
                                onClick={() => openModalEdit(data)}
                                className="px-4 py-1 text-sm text-white bg-blue-400 rounded"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => showModalDelete(data._id)}
                                className="px-4 py-1 text-sm text-white bg-red-400 rounded"
                              >
                                Delete
                              </button>
                            </td>
                          )}
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
                <thead className="bg-gray-50">
                  <tr>
                    <th colSpan="2" className="px-6 py-2 text-xs text-gray-500">
                      Total Bobot :{" "}
                    </th>

                    <th className="px-6 py-2 text-xs text-gray-500">
                      {totalBobot}%
                    </th>
                    <th colSpan="7" className="px-6 py-2 text-xs text-gray-500">
                      Total bobot tidak boleh lebih dan kurang 100%
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
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

      <ModalAdd
        isOpenAdd={isOpenAdd}
        setIsOpenAdd={setIsOpenAdd}
        kriteria
        dataKriteria={kriteria}
        setKriteria={setKriteria}
        setFormInput={setFormInput}
        setFormType={setFormType}
        formType={formType}
        formInput={formInput}
        handleChangeFormInput={(e) => handleChangeFormInput(e)}
        handleChangeForm={(e) => handleChangeForm(e)}
        onChange={(e) => handleChange(e)}
        onClick={() => handleAddKriteria()}
      />

      <NotifContainer />
    </Layout>
  );
};

export default ListKriteria;
