import * as api from "../../api";

export const createPenilaianKontaktor =
  (data, setIsLoadingPenilaian, setDataPenilaian, setTableHead) => async (dispatch) => {
    setIsLoadingPenilaian(true);
    try {
      const response = await api.createPenilaianKontaktor(data);

      if (response.data.success) {
        setIsLoadingPenilaian(false);

        const dataPenilaian = await api.getPenilianKontraktorByLowonganId(data.lowonganId);

      if (dataPenilaian.data.success) {
        let buffer = []
        setDataPenilaian(dataPenilaian.data.data);
        for (let property in dataPenilaian.data.data[0].penilaian) {
          buffer.push(property)
        }
        setTableHead(buffer)
      }
      }
    } catch (err) {
      setIsLoadingPenilaian(false);
      console.log(err);
    }
  };

export const getPenilianKontraktorByLowonganId =
  (id, setDataPenilaian, setTableHead) => async (dispatch) => {
    try {
      const response = await api.getPenilianKontraktorByLowonganId(id);

      if (response.data.success) {
        let buffer = []
        setDataPenilaian(response.data.data);
        for (let property in response.data.data[0].penilaian) {
          buffer.push(property)
        }
        setTableHead(buffer)
      }
    } catch (err) {
      console.log(err);
    }
  };

export const getPenilaianKontraktor =
  (id, setDataPenilaianMandor, setIsLoadingPenilaian) => async (dispatch) => {
    setIsLoadingPenilaian(true);
    try {
      const response = await api.getPenilaianKontraktor(id);

      if (response.data.success) {
        setDataPenilaianMandor((prev) => [...prev, response.data.data]);
        setIsLoadingPenilaian(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoadingPenilaian(false);
    }
  };

export const getRekomendasi =
  (data, setRangking, setIsLoadingCalculate) => async (dispatch) => {
    setIsLoadingCalculate(true);
    try {
      const response = await api.getRekomendasi(data);

      if (response.data.success) {
        setIsLoadingCalculate(false);

        const result = await api.getResult();

        if (result.data.success) {
          setRangking(result.data.data);
        }
      }
    } catch (err) {
      setIsLoadingCalculate(false);
      console.log(err?.response?.data?.message);
    }
  };

export const getResult = (setRangking) => async (dispatch) => {
  try {
    const response = await api.getResult();

    if (response.data.success) {
      setRangking(response.data.data);
    }
  } catch (err) {
    console.log(err);
  }
};

export const resetResult = (setRangking) => async (dispatch) => {
  try {
    const response = await api.resetResult();

    if (response.data.success) {
      setRangking([]);
    }
  } catch (err) {
    console.log(err);
  }
};
