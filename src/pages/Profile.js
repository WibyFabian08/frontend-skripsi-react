import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";

import Layout from "../layouts";
import {
  TextInput,
  InputFile,
  TextArea,
  Button,
  Loading,
  NotifContainer,
} from "../elements";

import { useDispatch, useSelector } from "react-redux";
import { updateUser, getById } from "../redux/action/user";

import { showError, showSuccess } from "../utils/showNotif";

import {
  kontraktorGalleryCreate,
  getKontraktorGallery,
  deleteKontraktorGallery,
} from "../redux/action/kontraktorGallery";
import {
  createKinerjaKontraktor,
  getKinerjaKontraktor,
  updateKinerjaKontraktor,
} from "../redux/action/kinerjaKontraktor";

const Profile = () => {
  const { activeUser } = useSelector((state) => state.userState);

  const dispatch = useDispatch();

  const [galeries, setGalleries] = useState([]);
  const [gallery, setGallery] = useState(null);

  const [isLoadingUploadGallery, setIsLoadingUploadGallery] = useState(false);
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    address: "",
    description: "",
    gender: "",
    phone: "",
    profession: "",
    image: null,
    username: "",
    role: null,
  });

  const [kinerja, setKinerja] = useState({
    mandorId: null,
    // hargaPerMeter: "",
    pengalaman: "",
    jumlahProject: "",
    jumlahTukang: "",
    sertifikat: "",
    tools: "",
    bacaGambar: "",
    bidangKeahlian: "",
    legalitasPerusahaan: "",
  });

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeKinerja = (e) => {
    setKinerja({
      ...kinerja,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoadingUpdate(true);

    const data = new FormData();
    data.append("fullname", userData.fullname);
    data.append("email", userData.email);
    data.append("address", userData.address);
    data.append("description", userData.description);
    data.append("gender", userData.gender);
    data.append("phone", userData.phone);
    data.append("profession", userData.profession);

    if (userData.image !== null) {
      data.append("image", userData?.image);
    }

    dispatch(
      updateUser(
        data,
        activeUser?.data?._id,
        setUserData,
        showError,
        showSuccess
      )
    );
    dispatch(getById(activeUser?.data?._id, setUserData, setIsLoadingFetch));
    setIsLoadingUpdate(false);
  };

  const handleSubmitKinerja = (e) => {
    e.preventDefault();

    const data = {
      bidangKeahlian: kinerja.bidangKeahlian,
      pengalaman: kinerja.pengalaman,
      jumlahProject: kinerja.jumlahProject,
      jumlahTukang: kinerja.jumlahTukang,
      sertifikat: kinerja.sertifikat,
      tools: kinerja.tools,
      bacaGambar: kinerja.bacaGambar,
      legalitasPerusahaan: kinerja.legalitasPerusahaan,
    };

    if (kinerja.mandorId !== null) {
      dispatch(updateKinerjaKontraktor(data, setKinerja, showError, showSuccess));
    } else {
      dispatch(createKinerjaKontraktor(data, setKinerja, showError, showSuccess));
    }
  };

  const handleUploadGallery = () => {
    const data = new FormData();
    data.append("image", gallery);
    data.append("mandorId", activeUser?.data?.id);

    dispatch(
      kontraktorGalleryCreate(
        data,
        setGallery,
        showError,
        showSuccess,
        setIsLoadingUploadGallery,
        setGalleries
      )
    );
  };

  const handleDeleteGallery = (id) => {
    dispatch(deleteKontraktorGallery(id, showError, showSuccess, setGalleries));
    dispatch(getKontraktorGallery(setGalleries));
  };

  useEffect(() => {
    dispatch(getKinerjaKontraktor(setKinerja));
  }, [dispatch]);

  useEffect(() => {
    if (activeUser !== null) {
      dispatch(getById(activeUser?.data?._id, setUserData, setIsLoadingFetch));
    }
  }, [activeUser, dispatch]);

  useEffect(() => {
    dispatch(getKontraktorGallery(setGalleries));
  }, [activeUser, dispatch]);

  if (isLoadingFetch) {
    return <Loading></Loading>;
  }

  return (
    <Layout>
      <div>
        <h6 style={{ color: "#0C0D36" }} className="text-2xl font-semibold">
          My Profile
        </h6>
        <p className="text-sm text-gray-400">Perbarui Profile Anda</p>
      </div>

      <form
        onSubmit={(e) => handleSubmit(e)}
        method="POST"
        className="flex flex-wrap p-5 mt-5 bg-white rounded-md shadow-md"
      >
        <div className="w-full px-0 md:w-1/2 md:px-2">
          <TextInput
            placeholder="Fullname"
            name="fullname"
            type="text"
            value={userData.fullname}
            onChange={(e) => handleChange(e)}
            label="Fullname"
            dark
          ></TextInput>
        </div>
        <div className="w-full px-0 md:w-1/2 md:px-2">
          <TextInput
            placeholder="Email"
            name="email"
            type="text"
            value={userData.email}
            onChange={(e) => handleChange(e)}
            label="Email"
            dark
          ></TextInput>
        </div>
        <div className="w-full px-0 md:w-1/2 md:px-2">
          <TextInput
            placeholder="Phone Number"
            name="phone"
            type="text"
            value={userData.phone}
            onChange={(e) => handleChange(e)}
            label="Phone Number"
            dark
          ></TextInput>
        </div>
        <div className="w-full px-0 md:w-1/2 md:px-2">
          <TextInput
            placeholder="Profession"
            name="profession"
            type="text"
            value={userData.profession}
            onChange={(e) => handleChange(e)}
            label="Bidang Usaha"
            dark
          ></TextInput>
        </div>
        <div className="w-full px-0 md:w-1/2 md:px-2">
          <TextArea
            placeholder="Address"
            name="address"
            label="Address"
            value={userData.address}
            onChange={(e) => handleChange(e)}
          ></TextArea>
        </div>
        <div className="w-full px-0 md:w-1/2 md:px-2">
          <TextArea
            placeholder="Description"
            name="description"
            label="Description"
            value={userData.description}
            onChange={(e) => handleChange(e)}
          ></TextArea>
        </div>
        <div className="w-full px-0 md:px-2">
          <InputFile
            placeholder="Profile Picture"
            onChange={(e) => handleChange(e)}
            name="image"
            labelTitle
          ></InputFile>
          {userData.image !== null && (
            <img
              className="object-cover border border-gray-300 rounded-lg shadow-md"
              width={300}
              src={
                userData.image !== null && typeof userData.image === "string"
                  ? `http://localhost:8000/files/${userData.image}`
                  : URL.createObjectURL(userData.image)
              }
              alt="preview"
            ></img>
          )}
        </div>
        <div className="px-0 ml-auto md:px-2">
          <Button type="submit" disabled={isLoadingUpdate}>
            {isLoadingUpdate ? "Loading..." : "Simpan"}
          </Button>
        </div>
      </form>

      {userData.role !== null && userData.role === 3 && (
        <div className="flex flex-wrap p-5 mt-5 bg-white rounded-md shadow-md">
          <div className="w-full px-2 py-16 sm:px-0">
            <Tab.Group>
              <Tab.List
                className="flex p-1 space-x-1 rounded-xl"
                style={{ backgroundColor: "#23A6F0" }}
              >
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "w-full py-2.5 text-sm leading-5 font-medium text-white rounded-lg",
                      "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                      selected
                        ? "bg-white shadow text-blue-400"
                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                    )
                  }
                >
                  Portofolio
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "w-full py-2.5 text-sm leading-5 font-medium text-white rounded-lg",
                      "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                      selected
                        ? "bg-white shadow text-blue-400"
                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                    )
                  }
                >
                  Informasi Pendukung
                </Tab>
              </Tab.List>
              <Tab.Panels className="mt-2">
                <Tab.Panel
                  className={classNames(
                    "bg-white rounded-xl p-3",
                    "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
                  )}
                >
                  {galeries.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-10">
                      {galeries.map((gallery) => {
                        return (
                          <div className="relative mb-5" key={gallery._id}>
                            <div
                              className="absolute flex flex-col items-center justify-center text-white bg-red-300 rounded-full right-1 top-1"
                              style={{
                                width: 30,
                                height: 30,
                                cursor: "pointer",
                              }}
                              onClick={() => handleDeleteGallery(gallery._id)}
                            >
                              X
                            </div>
                            <img
                              width={250}
                              className="object-cover rounded-md"
                              src={`http://localhost:8000/files/${gallery.image}`}
                              alt="gallery"
                            />
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="mt-10 text-center text-md">
                      Portofolio anda kosong, segera lengkapi portofolio anda!
                    </div>
                  )}
                  <div className="mt-20 ml-auto">
                    {gallery !== null && (
                      <div className="flex flex-wrap items-end mb-5">
                        <img
                          src={URL.createObjectURL(gallery)}
                          width={200}
                          alt="preview"
                        ></img>
                        <button
                          onClick={() => handleUploadGallery()}
                          className="px-4 py-2 ml-3 text-white bg-green-400 rounded-md focus:outline-none"
                          disabled={isLoadingUploadGallery}
                        >
                          {isLoadingUploadGallery
                            ? "Loading..."
                            : "Tambahkan Gambar"}
                        </button>
                      </div>
                    )}
                    <InputFile
                      label="Upload Gambar"
                      gallery
                      setGallery={setGallery}
                    ></InputFile>
                  </div>
                </Tab.Panel>
                <Tab.Panel
                  className={classNames(
                    "bg-white rounded-xl p-3",
                    "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
                  )}
                >
                  <form
                    onSubmit={(e) => handleSubmitKinerja(e)}
                    method="POST"
                    className="p-5 mt-5 bg-white rounded-md shadow-md"
                  >
                    <div className="flex flex-wrap ">
                      <div className="w-full px-0 md:w-1/2 md:px-2">
                        <TextInput
                          placeholder="Contoh: Ahli kayu, Ahli Aspal, dll.."
                          name="bidangKeahlian"
                          type="text"
                          value={kinerja.bidangKeahlian}
                          onChange={(e) => handleChangeKinerja(e)}
                          label={"Bidang Keahlian"}
                          dark
                        ></TextInput>
                      </div>
                      <div className="w-full px-0 md:w-1/2 md:px-2">
                        <TextInput
                          placeholder="Lama Pengalaman"
                          name="pengalaman"
                          type="number"
                          value={kinerja.pengalaman}
                          onChange={(e) => handleChangeKinerja(e)}
                          label="Pengalaman"
                          dark
                        ></TextInput>
                      </div>
                      <div className="w-full px-0 md:w-1/2 md:px-2">
                        <TextInput
                          placeholder="Jumlah Project Yang Pernah Dikerjakan"
                          name="jumlahProject"
                          type="number"
                          value={kinerja.jumlahProject}
                          onChange={(e) => handleChangeKinerja(e)}
                          label="Jumlah Project"
                          dark
                        ></TextInput>
                      </div>
                      <div className="w-full px-0 md:w-1/2 md:px-2">
                        <TextInput
                          placeholder="Jumlah Pekerja"
                          name="jumlahTukang"
                          type="number"
                          value={kinerja.jumlahTukang}
                          onChange={(e) => handleChangeKinerja(e)}
                          label="Jumlah Pekerja Yang Dimiliki"
                          dark
                        ></TextInput>
                      </div>
                      <div className="w-full px-0 md:w-1/2 md:px-2">
                        <div className="mb-5">
                          <label
                            htmlFor="sertifikat"
                            style={{ color: "#0C0D36" }}
                            className="mb-3 font-semibold capitalize text-md"
                          >
                            Sertifikat
                          </label>
                          <select
                            className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none"
                            name="sertifikat"
                            style={{ color: "#0C0D36" }}
                            value={kinerja.sertifikat}
                            onChange={(e) => handleChangeKinerja(e)}
                          >
                            <option value="">Punya Sertifikat Keahlian?</option>
                            <option value={true}>Punya</option>
                            <option value={false}>Tidak Punya</option>
                          </select>
                        </div>
                      </div>
                      <div className="w-full px-0 md:w-1/2 md:px-2">
                        <div className="mb-5">
                          <label
                            htmlFor="tools"
                            style={{ color: "#0C0D36" }}
                            className="mb-3 font-semibold capitalize text-md"
                          >
                            Alat-Alat Penunjang
                          </label>
                          <select
                            className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none"
                            name="tools"
                            style={{ color: "#0C0D36" }}
                            value={kinerja.tools}
                            onChange={(e) => handleChangeKinerja(e)}
                          >
                            <option value="">Punya Perkakas Sendiri?</option>
                            <option value={true}>Punya</option>
                            <option value={false}>Tidak Punya</option>
                          </select>
                        </div>
                      </div>
                      <div className="w-full px-0 md:w-1/2 md:px-2">
                        <div className="mb-5">
                          <label
                            htmlFor="bacaGambar"
                            style={{ color: "#0C0D36" }}
                            className="mb-3 font-semibold capitalize text-md"
                          >
                            Kemampuan Membaca Gambar
                          </label>
                          <select
                            className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none"
                            name="bacaGambar"
                            style={{ color: "#0C0D36" }}
                            value={kinerja.bacaGambar}
                            onChange={(e) => handleChangeKinerja(e)}
                          >
                            <option value="">
                              Mampu Membaca Gambar Rencana?
                            </option>
                            <option value={5}>Sangat Baik</option>
                            <option value={4}>Baik</option>
                            <option value={3}>Agak Baik</option>
                            <option value={2}>Buruk</option>
                            <option value={1}>Sangat Buruk</option>
                          </select>
                        </div>
                      </div>
                      <div className="w-full px-0 md:w-1/2 md:px-2">
                        <div className="mb-5">
                          <label
                            htmlFor="bacaGambar"
                            style={{ color: "#0C0D36" }}
                            className="mb-3 font-semibold capitalize text-md"
                          >
                            Legalitas Perusahaan
                          </label>
                          <select
                            className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none"
                            name="legalitasPerusahaan"
                            style={{ color: "#0C0D36" }}
                            value={kinerja.legalitasPerusahaan}
                            onChange={(e) => handleChangeKinerja(e)}
                          >
                            <option value="">Bentuk Prusahaan?</option>
                            <option value={"Perseroan Terbatas (PT)"}>
                              Perseroan Terbatas (PT)
                            </option>
                            <option value={"Persekutuan komanditer (CV)"}>
                              Persekutuan komanditer (CV)
                            </option>
                            <option value={"Belum Berbadan Usana"}>
                              Belum Berbadan Usaha
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="flex px-0 md:px-2">
                      <Button type="submit" disabled={isLoadingUpdate}>
                        {isLoadingUpdate ? "Loading..." : "Simpan"}
                      </Button>
                    </div>
                  </form>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      )}

      <NotifContainer />
    </Layout>
  );
};

export default Profile;
