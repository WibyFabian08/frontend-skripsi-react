import * as api from "../../api";

export const getById =
  (id, setUserData, setIsLoadingFetch) => async (dispatch) => {
    setIsLoadingFetch(true);
    try {
      const response = await api.getUserById(id);

      if (response.data.success === true) {
        setUserData({
          fullname: response.data.data.fullname || null,
          email: response.data.data.email || null,
          address: response.data.data.address || null,
          description: response.data.data.description || null,
          gender: response.data.data.gender || null,
          phone: response.data.data.phone || null,
          profession: response.data.data.profession || null,
          username: response.data.data.username || null,
          image: response.data.data.image || null,
          role: response.data.data.role || null,
        });

        setIsLoadingFetch(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

export const updateUser =
  (data, id, setUserData, showError, showSuccess) => async (dispatch) => {
    try {
      const response = await api.updateUser(data, id);

      if (response.data.success) {
        setUserData({
          fullname: response.data.data.fullname || null,
          email: response.data.data.email || null,
          address: response.data.data.address || null,
          description: response.data.data.description || null,
          gender: response.data.data.gender || null,
          phone: response.data.data.phone || null,
          profession: response.data.data.profession || null,
          username: response.data.data.username || null,
          image: response.data.data.image || null,
          role: response.data.data.role || null,
        });

        showSuccess("Update profile berhasil");
      }
    } catch (err) {
      showError("Update profile gagal");
      console.log(err);
    }
  };

export const getKontraktor =
  (setData, setIsLoading, perPage, page) => async (dispatch) => {
    setIsLoading(true);
    try {
      const response = await api.getKontraktor(perPage, page);

      if (response.data.success) {
        setData(response.data);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

export const getClient =
  (setData, setIsLoading, perPage, page) => async (dispatch) => {
    setIsLoading(true);
    try {
      const response = await api.getClient(perPage, page);

      if (response.data.success) {
        setData(response.data);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

export const deleteById =
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
      const response = await api.deleteById(deleteId);

      if (response.data.success) {
        showSuccess("Delete data berhasil");
        setIsOpen(false);
        setIsLoadingDelete(false);
        setDeleteId(null);

        const getKontraktor = await api.getKontraktor(10, 1);

        if (getKontraktor.data.success) {
          setData(getKontraktor.data);
        }
      }
    } catch (err) {
      setIsLoadingDelete(false);
      showError(err?.response?.data?.message);
    }
  };
