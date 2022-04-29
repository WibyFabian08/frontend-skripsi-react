import * as api from "../../api";

export const createTransaction = async (data, navigate) => {
  try {
    const response = await api.createTransaction(data);

    if (response.data.success) {
      navigate("/user/transaksi");
    }
  } catch (err) {
    console.log(err);
  }
};

export const getTransactionByUserId =
  (setData, setIsLoading, perPage, page) => async (dispatch) => {
    setIsLoading(true);
    try {
      const response = await api.getTransactionByUserId(perPage, page);

      if (response.data.success) {
        setData(response.data);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

export const updateTransaction =
  (id, status, showError, showSuccess, setIsLoadingUpdate, setData) =>
  async (dispatch) => {
    setIsLoadingUpdate(true);
    try {
      const response = await api.updateTransaction(id, status);

      if (response.data.success) {
        showSuccess("Update transaksi berhasil");
        setIsLoadingUpdate(false);

        const getData = await api.getTransactionByUserId(10, 1);

        setData(getData.data);
      }
    } catch (err) {
      console.log(err);
      showError("Update transaksi gagal");
      setIsLoadingUpdate(false);
    }
  };
