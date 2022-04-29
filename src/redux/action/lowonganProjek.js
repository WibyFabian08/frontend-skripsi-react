import * as api from "../../api";

export const getLowongan = (setData, setIsLoading) => async (dispatch) => {
  setIsLoading(true);
  try {
    const result = await api.getLowongan();
    if (result.data.success) {
      setIsLoading(false);
      setData(result.data.data);
    }
  } catch (err) {
    setIsLoading(false);
    console.log(err);
  }
};

export const getLowonganById =
  (id, setInput, setIsLoading) => async (dispatch) => {
    setIsLoading(true);
    try {
      const result = await api.getLowonganById(id);
      if (result.data.success) {
        setIsLoading(false);
        setInput({
          name: result.data.data.name,
          deskripsi: result.data.data.deskripsi,
          lokasi: result.data.data.lokasi,
          itemPekerjaan: result.data.data.itemPekerjaan,
          waktuMulai: result.data.data.waktuMulai,
          waktuBeres: result.data.data.waktuBeres,
          volumePekerjaan: result.data.data.volumePekerjaan,
          pemilik: result.data.data.pemilik,
          RAB: result.data.data.RAB,
          image: result.data.data.gambar,
        });
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

export const checkLowongan = (setIsAllow) => async (dispatch) => {
  try {
    const response = await api.checkLowongan()

    if(response.data.success) {
      setIsAllow(response.data.isAllowed)
    }
  } catch (err) {
    console.log(err)
  }
}

export const createLowongan =
  (data, input, showError, showSuccess, setIsLoading, setInput) =>
  async (dispatch) => {
    setIsLoading(true);
    try {
      const result = await api.createLowongan(data);
      if (result.data.success) {
        showSuccess("Lowongan Behasil Dibuat");
        setInput({
          ...input,
          name: "",
          deskripsi: "",
          lokasi: "",
          itemPekerjaan: "",
          waktuMulai: null,
          waktuBeres: null,
          volumePekerjaan: 0,
          pemilik: "",
          RAB: 0,
          image: null,
        });
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      showError("Lowongan Gagal Dibuat");
    }
  };

export const updateLowongan =
  (data, id, showError, showSuccess, setIsLoading) => async (dispatch) => {
    setIsLoading(true);
    try {
      const result = await api.updateLowongan(data, id);
      if (result.data.success) {
        showSuccess("Lowongan Behasil Diupdate");
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      showError("Lowongan Gagal Diupdate");
    }
  };

export const deleteLowongan =
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
      const result = await api.deleteLowongan(deleteId);
      if (result.data.success) {
        const getData = await api.getLowongan();
        setIsOpen(false);
        setDeleteId(null);
        setIsLoadingDelete(false);
        setData(getData.data.data);
        showSuccess("Delete data berhasil");
      }
    } catch (err) {
      setIsLoadingDelete(false);
      console.log(err);
      showError("Delete data gagal");
    }
  };
