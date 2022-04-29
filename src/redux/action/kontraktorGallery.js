import * as api from "../../api";

export const getKontraktorImages =
  (setData, setIsLoading, perPage, page) => async (dispatch) => {
    setIsLoading(true);
    try {
      const response = await api.getKontraktorImages(perPage, page);

      if (response.data.success) {
        setData(response.data);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err?.response?.data?.message);
      setIsLoading(false);
    }
  };

export const getKontraktorGallery = (setGalleries) => async (dispatch) => {
  try {
    const response = await api.getKontraktorGallery();

    if (response.data.success) {
      setGalleries(response.data.data);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getKontraktorGalleryById = (id, setGalleries) => async (dispatch) => {
  try {
    const response = await api.getKontraktorGalleryById(id);

    if (response.data.success) {
      setGalleries(response.data.data);
    }
  } catch (err) {
    console.log(err);
  }
};

export const kontraktorGalleryCreate =
  (
    data,
    setGallery,
    showError,
    showSuccess,
    setIsLoadingUploadGallery,
    setGalleries
  ) =>
  async (dispatch) => {
    setIsLoadingUploadGallery(true);
    try {
      const response = await api.kontraktorGalleryCreate(data);

      if (response.data.success) {
        showSuccess("Upload image berhasil");
        setIsLoadingUploadGallery(false);
        setGallery(null);
      }
      const getGalleries = await api.getKontraktorGallery();

      if (getGalleries.data.success) {
        setGalleries(getGalleries.data.data);
      }
    } catch (err) {
      console.log(err);
      showError("Upload image gagal");
      setIsLoadingUploadGallery(false);
    }
  };

export const deleteKontraktorGallery =
  (id, showError, showSuccess, setGalleries) => async (dispatch) => {
    try {
      const response = await api.deleteKontraktorGallery(id);

      if (response.data.success) {
        showSuccess("Delete image success");

        const getGalleries = await api.getKontraktorGallery();

        if (getGalleries.data.success) {
          setGalleries(getGalleries.data.data);
        }
      }
    } catch (err) {
      console.log(err);
      showError("Delete image gagal");
    }
  };
