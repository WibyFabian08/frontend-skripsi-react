import axios from "axios";

const BASE_API_URL = "http://localhost:8000/api";

const API = axios.create({ baseURL: BASE_API_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = JSON.parse(localStorage.getItem("user"));
  }

  return req;
});

// auth
export const signUp = (data) => API.post("/auth/signup", data);
export const signIn = (data) => API.post("/auth/login", data);

// user
export const updateUser = (data, id) => API.put(`/user/update/${id}`, data);
export const getUserById = (id) => API.get(`/user/find/${id}`);
export const deleteById = (id) => API.delete(`user/delete/${id}`);

// kontraktor gallery
export const getKontraktorGalleryById = (id) =>
  API.get(`/kontraktor-gallery/find/${id}`);
export const getKontraktorGallery = () => API.get("/kontraktor-gallery");
export const kontraktorGalleryCreate = (data) =>
  API.post("/kontraktor-gallery/create", data);
export const deleteKontraktorGallery = (id) =>
  API.delete(`/kontraktor-gallery/delete/${id}`);

// admin get data
export const getKontraktor = (perPage, page) =>
  API.get(
    `/user/find/kontraktor/all?currentPage=${page || 1}&perPage=${
      perPage || "none"
    }`
  );

export const getClient = (perPage, page) =>
  API.get(
    `/user/find/client/all?currentPage=${page || 1}&perPage=${
      perPage || "none"
    }`
  );

export const getKontraktorImages = (perPage, page) =>
  API.get(
    `/kontraktor-gallery/get?currentPage=${page || 1}&perPage=${
      perPage || "none"
    }`
  );

// landing page
export const getLandingPageData = () => API.get("/landing-page");

// calon kontraktor
export const getCalonKontraktor = () => API.get("/calon-kontraktor");
export const getCalonKontraktorByLowonganId = (id) =>
  API.get(`/calon-kontraktor/find/${id}`);
export const getCalonKontraktorByKontraktorId = (id) =>
  API.get(`/calon-kontraktor/find/kontraktor/${id}`);
export const createCalonKontraktor = (data) =>
  API.post("/calon-kontraktor/create", data);
export const updatePenilaianCalonKontraktor = (
  data,
  kontraktorId,
  lowonganId
) => API.put(`/calon-kontraktor/update/${kontraktorId}/${lowonganId}`, data);
export const deleteCalonKontraktor = (id) =>
  API.delete(`/calon-kontraktor/delete/${id}`);

// kinerja kontraktor
export const getKinerjaKontraktor = () => API.get("/kinerja-kontraktor");
export const getKinerjaKontraktorById = (id) =>
  API.get(`/kinerja-kontraktor/get/${id}`);
export const createKinerjaKontraktor = (data) =>
  API.post("/kinerja-kontraktor/create", data);
export const updateKinerjaKontraktor = (data) =>
  API.put("/kinerja-kontraktor/update", data);

// penilaian kontraktor
export const createPenilaianKontaktor = (data) =>
  API.post(`penilaian-kontraktor/create`, data);
export const getPenilianKontraktorByLowonganId = (id) =>
  API.get(`/penilaian-kontraktor/find/${id}`);

export const getPenilaianKontraktor = (id) =>
  API.get(`/penilaian-kontraktor/${id}`);
export const getResult = () => API.get(`/penilaian-kontraktor/result/final`);
export const getRekomendasi = (data) =>
  API.post(`/penilaian-kontraktor/penilaian`, data);
export const resetResult = () =>
  API.delete(`/penilaian-kontraktor/penilaian/delete`);

// transaction
export const createTransaction = (data) =>
  API.post("/transaction/create", data);
export const updateTransaction = (id, status) =>
  API.put(`/transaction/update/${id}?status=${status || "none"}`);
export const getTransactionByUserId = () => API.get("/transaction/find/client");

// kriteria
export const getKriteria = () => API.get("/kriteria");
export const createKriteria = (data) => API.post("/kriteria/create", data);
export const updateKriteria = (data, id) =>
  API.put(`/kriteria/update/${id}`, data);
export const deleteKriteria = (id) => API.delete(`/kriteria/delete/${id}`);

// lowongan projek
export const getLowongan = () => API.get(`/lowongan`);
export const getLowonganById = (id) => API.get(`/lowongan/find/${id}`);
export const checkLowongan = () => API.get('/lowongan/check')
export const createLowongan = (data) => API.post(`/lowongan/create`, data);
export const updateLowongan = (data, id) =>
  API.put(`/lowongan/update/${id}`, data);
export const deleteLowongan = (id) => API.delete(`/lowongan/delete/${id}`);

// form input
export const getAllFormInput = () => API.get("/form-input");
export const getFormInputByKriteriaId = (id) =>
  API.get(`/form-input/find/kriteria/${id}`);

// rangking
export const getNormalisasi = (id) => API.get(`/normalisasi/get/normalisasi/${id}`)
export const getRangking = (id) => API.get(`/normalisasi/get/rangking/${id}`)
export const createRangking = (id) => API.post(`/normalisasi/create`, id)
export const updateRangking = (id) => API.post(`/normalisasi/update/${id}`,)
export const pilihKontraktor = (id, data) => API.post(`/normalisasi/pilih/calon-kontraktor/${id}`, data)
export const getKontraktorTerpilih = (id) => API.get(`/normalisasi/get/terpilih/${id}`)