import * as api from "../../api";

export const getKriteria =
  (setData, setIsLoading, setTotalBobot) => async (dispatch) => {
    setIsLoading(true);
    try {
      const response = await api.getKriteria();

      if (response.data.success) {
        setData(response.data.data);
        setIsLoading(false);

        let bufferBobot = 0;
        for (let i = 0; i < response.data.data.length; i++) {
          bufferBobot += response.data.data[i].bobot;
        }

        setTotalBobot(bufferBobot);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

export const createKriteria =
  (
    data,
    setData,
    setIsOpenAdd,
    showError,
    showSuccess,
    setTotalBobot,
    setFormInput,
    setFormType
  ) =>
  async (dispatch) => {
    setIsOpenAdd(true);
    try {
      const response = await api.createKriteria(data);

      if (response.data.success) {
        const getData = await api.getKriteria();
        setData(getData.data.data);
        setIsOpenAdd(false);
        let bufferBobot = 0;
        for (let i = 0; i < getData.data.data.length; i++) {
          bufferBobot += getData.data.data[i].bobot;
        }

        setTotalBobot(bufferBobot);
        setFormInput({
          type: "",
          placeholder: "",
          label: "",
          isForAdmin: true,
        });
        setFormType(null)
        showSuccess("Tambah Kriteria Berhasil");
      }
    } catch (err) {
      console.log(err);
      setIsOpenAdd(false);
      showError("Tambah Kriteria Gagal");
    }
  };

export const updateKriteria =
  (id, data, setData, setIsOpenAdd, showError, showSuccess, setTotalBobot, setFormInput, setFormType) =>
  async (dispatch) => {
    setIsOpenAdd(true);
    try {
      const response = await api.updateKriteria(data, id);

      if (response.data.success) {
        const getData = await api.getKriteria();
        setData(getData.data.data);
        setIsOpenAdd(false);
        let bufferBobot = 0;
        for (let i = 0; i < getData.data.data.length; i++) {
          bufferBobot += getData.data.data[i].bobot;
        }
        setTotalBobot(bufferBobot);
        setFormInput({
          type: "",
          placeholder: "",
          label: "",
          isForAdmin: true,
        });
        setFormType(null)
        showSuccess("Update Kriteria Berhasil");
      }
    } catch (err) {
      console.log(err);
      setIsOpenAdd(false);
      showError("Update Kriteria Gagal");
    }
  };

export const deleteKriteria =
  (
    deleteId,
    setData,
    setIsOpen,
    setIsLoadingDelete,
    setDeleteId,
    showError,
    showSuccess,
    setTotalBobot
  ) =>
  async (dispatch) => {
    setIsLoadingDelete(true);
    try {
      const response = await api.deleteKriteria(deleteId);

      if (response.data.success) {
        const getData = await api.getKriteria();
        setData(getData.data.data);
        setIsOpen(false);
        setDeleteId(null);
        setIsLoadingDelete(false);
        let bufferBobot = 0;
        for (let i = 0; i < getData.data.data.length; i++) {
          bufferBobot += getData.data.data[i].bobot;
        }
        setTotalBobot(bufferBobot);
        showSuccess("Delete Kriteria Berhasil");
      }
    } catch (err) {
      console.log(err);
      setIsLoadingDelete(false);
      setIsOpen(false);
      showError("Delete Kriteria Gagal");
    }
  };
