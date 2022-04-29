import * as api from "../../api";

export const getRangking = (id, setHasilRangking) => async (dispatch) => {
  try {
    const response = await api.getRangking(id);

    if (response.data.success) {
        // response.data.data.sort((a, b) => {
        //     return b.nilai - a.nilai
        // })
      setHasilRangking(response.data.data);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getNormalisasi = (id, setHasilNormalisasi) => async (dispatch) => {
  try {
    const response = await api.getNormalisasi(id);

    if (response.data.success) {
      setHasilNormalisasi(response.data.data);
    }
  } catch (err) {
    console.log(err);
  }
};

export const createRangking =
  (data, setIsLoadingRangking, setHasilNormalisasi, setHasilRangking) =>
  async (dispatch) => {
    setIsLoadingRangking(true);
    try {
      await api.createRangking(data);

      const normalisasi = await api.getNormalisasi(data.lowonganId);

      if (normalisasi.data.success) {
        setHasilNormalisasi(normalisasi.data.data);
      }

      const rangking = await api.getRangking(data.lowonganId);

      if (rangking.data.success) {
        //   rangking.data.data.sort((a, b) => {
        //       return b.nilai - a.nilai
        //   })
        setHasilRangking(rangking.data.data);
      }

      setIsLoadingRangking(false);
    } catch (err) {
      setIsLoadingRangking(false);
      console.log(err);
    }
  };

export const updateRangking =
  (id, setIsLoadingUpdateRangking) => async (dispatch) => {
    setIsLoadingUpdateRangking(true);
    try {
      await api.updateRangking(id);
      setIsLoadingUpdateRangking(false);
      window.location.replace("/admin");
    } catch (err) {
      setIsLoadingUpdateRangking(false);
      console.log(err);
    }
  };

export const pilihKontraktor = (id, data, navigate) => async (dispatch) => {
  try {
    const response = await api.pilihKontraktor(id, data)

    if(response.data.success) {
      console.log(response)
      navigate('/admin')
    }
  } catch (err) {
    console.log(err)
  }
}

export const getKontraktorTerpilih = (id, setIsLoadingGet, setPemenang, setIsOpen) => async (dispatch) => {
  setIsLoadingGet(true)
  try { 
    const response = await api.getKontraktorTerpilih(id)
    
    if(response.data.success) {
      setIsOpen(true)
      setIsLoadingGet(false)
      setPemenang(response.data.kontraktor)
    }
  } catch (err) {
    setIsLoadingGet(false)
    console.log(err)
  }
}
