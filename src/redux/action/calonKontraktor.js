import * as api from "../../api";

export const getCalonKontraktor =
  (setData, setIsLoading) => async (dispatch) => {
    setIsLoading(true);
    try {
      const response = await api.getCalonKontraktor();

      if (response.data.success) {
        setData(response.data.data);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

export const getCalonKontraktorByLowonganId =
  (id, kontraktorId, setDataCheck) => async (dispatch) => {
    try {
      const response = await api.getCalonKontraktorByLowonganId(id);

      response.data.data.find((data) => {
        if (kontraktorId === data.kontraktorId._id) {
          setDataCheck(true);
        } else {
          setDataCheck(false);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

export const adminGetCalonKontraktorByLowonganId =
  (id, setData, setIsLoading) => async (dispatch) => {
    setIsLoading(true);
    try {
      const response = await api.getCalonKontraktorByLowonganId(id);

      if (response.data.success) {
        setData(response.data.data);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  export const getCalonKontraktorByKontraktorId =
  (id, setLampiran, setIsLoading) => async (dispatch) => {
    setIsLoading(true);
    try {
      const response = await api.getCalonKontraktorByKontraktorId(id);

      if (response.data.success) {
        setLampiran(response.data.data);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

export const createCalonkontraktor =
  (data, showError, showSuccess) => async (dispatch) => {
    try {
      const response = await api.createCalonKontraktor(data);
      if (response.data.success) {
        showSuccess("Join Tender Berhasil");
      }
    } catch (err) {
      showError(err?.response?.data?.message);
      console.log(err);
    }
  };

export const updatePenilaianCalonKontraktor =
  (data, kontraktorId, lowonganId, showError, showSuccess, setData) =>
  async (dispatch) => {
    try {
      const response = await api.updatePenilaianCalonKontraktor(
        data,
        kontraktorId,
        lowonganId
      );

      if (response.data.success) {
        showSuccess("Penilaian Berhasil");
        const getData = await api.getCalonKontraktorByLowonganId(lowonganId);
        setData(getData.data.data);
      }
    } catch (err) {
      showError("Penilaian Gagal");
      console.log(err);
    }
  };

export const deleteCalonKontraktor =
  (
    deleteId,
    setData,
    setIsOpen,
    setIsLoadingDelete,
    setDeleteId,
    showError,
    showSuccess
  ) =>
  async (dispatch) => {
    setIsLoadingDelete(true);
    try {
      const response = await api.deleteCalonKontraktor(deleteId);

      if (response.data.success) {
        setIsOpen(false);
        setDeleteId(null);
        showSuccess("Delete calon mandor berhasil");
        setIsLoadingDelete(false);

        const getData = await api.getCalonKontraktor();
        setData(getData.data.data);
      }
    } catch (err) {
      setIsOpen(false);
      showError(err?.response?.data?.message);
      setIsLoadingDelete(false);
    }
  };
