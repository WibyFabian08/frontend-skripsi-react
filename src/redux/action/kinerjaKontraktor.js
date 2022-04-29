import * as api from "../../api";

export const getKinerjaKontraktorById = (id, setKinerja) => async (dispatch) => {
  try {
    const response = await api.getKinerjaKontraktorById(id);

    if (response.data.success) {
      setKinerja({
        mandorId: response.data.data.mandorId,
        bidangKeahlian: response.data.data.bidangKeahlian,
        pengalaman: response.data.data.pengalaman,
        jumlahProject: response.data.data.jumlahProject,
        jumlahTukang: response.data.data.jumlahTukang,
        sertifikat: response.data.data.sertifikat,
        tools: response.data.data.tools,
        bacaGambar: response.data.data.bacaGambar,
        legalitasPerusahaan: response.data.data.legalitasPerusahaan,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getKinerjaKontraktor = (setKinerja) => async (dispatch) => {
  try {
    const response = await api.getKinerjaKontraktor();

    if (response.data.success) {
      setKinerja({
        mandorId: response.data.data.mandorId,
        bidangKeahlian: response.data.data.bidangKeahlian,
        pengalaman: response.data.data.pengalaman,
        jumlahProject: response.data.data.jumlahProject,
        jumlahTukang: response.data.data.jumlahTukang,
        sertifikat: response.data.data.sertifikat,
        tools: response.data.data.tools,
        bacaGambar: response.data.data.bacaGambar,
        legalitasPerusahaan: response.data.data.legalitasPerusahaan,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const createKinerjaKontraktor =
  (data, setKinerja, showError, showSuccess) => async (dispatch) => {
    try {
      const response = await api.createKinerjaKontraktor(data);

      if (response.data.success) {
        const getData = await api.getKinerjaKontraktor();
        if (getData.data.success) {
          setKinerja({
            bidangKeahlian: getData.data.data.bidangKeahlian,
            pengalaman: getData.data.data.pengalaman,
            jumlahProject: getData.data.data.jumlahProject,
            jumlahTukang: getData.data.data.jumlahTukang,
            sertifikat: getData.data.data.sertifikat,
            tools: getData.data.data.tools,
            bacaGambar: getData.data.data.bacaGambar,
            legalitasPerusahaan: response.data.data.legalitasPerusahaan,
          });
          showSuccess("Create success");
        }
      }
    } catch (err) {
      console.log(err);
      showError("Create failed");
    }
  };

export const updateKinerjaKontraktor =
  (data, setKinerja, showError, showSuccess) => async (dispatch) => {
    try {
      const response = await api.updateKinerjaKontraktor(data);

      if (response.data.success) {
        const getData = await api.getKinerjaKontraktor();
        if (getData.data.success) {
          setKinerja({
            bidangKeahlian: getData.data.data.bidangKeahlian,
            pengalaman: getData.data.data.pengalaman,
            jumlahProject: getData.data.data.jumlahProject,
            jumlahTukang: getData.data.data.jumlahTukang,
            sertifikat: getData.data.data.sertifikat,
            tools: getData.data.data.tools,
            bacaGambar: getData.data.data.bacaGambar,
            legalitasPerusahaan: response.data.data.legalitasPerusahaan,
          });
          showSuccess("Update success");
        }
      }
    } catch (err) {
      console.log(err);
      showError("Update failed");
    }
  };
