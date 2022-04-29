import React, { useEffect, useState } from "react";
import Layout from "../../layouts";
import { Button, InputFile, TextArea, TextInput } from "../../elements";
import { useDispatch } from "react-redux";
import { showError, showSuccess } from "../../utils/showNotif";
import { NotifContainer } from "../../elements";
import { useNavigate, useParams } from "react-router-dom";
import {
  createLowongan,
  getLowonganById,
  updateLowongan,
} from "../../redux/action/lowonganProjek";

const CreateProjekBaru = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams()

  const dispatch = useDispatch();

  const [input, setInput] = useState({
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

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    const data = new FormData();
    data.append("name", input.name);
    data.append("deskripsi", input.deskripsi);
    data.append("lokasi", input.lokasi);
    data.append("itemPekerjaan", input.itemPekerjaan);
    data.append("waktuMulai", input.waktuMulai);
    data.append("waktuBeres", input.waktuBeres);
    data.append("volumePekerjaan", input.volumePekerjaan);
    data.append("pemilik", input.pemilik);
    data.append("RAB", input.RAB);
    data.append("image", input.image);

    if (params.id) {
      dispatch(
        updateLowongan(data, params.id, showError, showSuccess, setIsLoading)
      );
    } else {
      dispatch(
        createLowongan(
          data,
          input,
          showError,
          showSuccess,
          setIsLoading,
          setInput
        )
      );
    }
  };

  useEffect(() => {
    if (params.id) {
      dispatch(getLowonganById(params.id, setInput, setIsLoading));
    }
  }, [params.id, dispatch]);

  return (
    <Layout>
      <div className="">
        <h6 style={{ color: "#0C0D36" }} className="text-2xl font-semibold">
          Buat Projek Baru
        </h6>
        <p className="text-sm text-gray-400">
          Tambah projek yang akan segera anda mulai
        </p>
      </div>

      <div className="mx-auto">
        <div className="w-full">
          <div className="border-b border-gray-200 shadow">
            <div className="mt-5 mb-5">
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-1 text-sm text-white transition-all duration-200 bg-blue-400 rounded hover:bg-blue-500"
              >
                Kembali
              </button>
            </div>

            <div className="p-5 bg-white shadow-lg">
              <div className="flex flex-wrap -mx-3">
                <div className="w-full px-2 md:w-1/2">
                  <TextInput
                    name="name"
                    type="text"
                    value={input.name}
                    onChange={(e) => handleChange(e)}
                    dark
                    placeholder="Nama Proyek"
                    label={"Nama Proyek"}
                  ></TextInput>
                </div>
                <div className="w-full px-2 md:w-1/2">
                  <TextInput
                    name="lokasi"
                    type="text"
                    value={input.lokasi}
                    onChange={(e) => handleChange(e)}
                    dark
                    placeholder="Lokasi Proyek"
                    label={"Lokasi Proyek"}
                  ></TextInput>
                </div>
                <div className="w-full px-2 md:w-1/2">
                  <TextInput
                    name="pemilik"
                    type="text"
                    value={input.pemilik}
                    onChange={(e) => handleChange(e)}
                    dark
                    placeholder="Pemilik Proyek"
                    label={"Pemilik Proyek"}
                  ></TextInput>
                </div>
                <div className="w-full px-2 md:w-1/2">
                  <TextInput
                    name="itemPekerjaan"
                    type="text"
                    value={input.itemPekerjaan}
                    onChange={(e) => handleChange(e)}
                    dark
                    placeholder="Contoh: Pekerjaan pondasi, Pekerjaan Atap dll"
                    label={"Item Pekerjaan"}
                  ></TextInput>
                </div>
                <div className="w-full px-2 md:w-1/2">
                  <TextInput
                    name="volumePekerjaan"
                    type="number"
                    value={input.volumePekerjaan}
                    onChange={(e) => handleChange(e)}
                    dark
                    placeholder="Contoh: 200"
                    label={"Volume Pekerjaan"}
                  ></TextInput>
                </div>
                <div className="w-full px-2 md:w-1/2">
                  <TextInput
                    name="RAB"
                    type="number"
                    value={input.RAB}
                    onChange={(e) => handleChange(e)}
                    dark
                    placeholder="Contoh: 2000000"
                    label={"Total Biaya Pengerjaan"}
                  ></TextInput>
                </div>
                <div className="w-full px-2 md:w-1/2">
                  <TextInput
                    name="waktuMulai"
                    type="date"
                    onChange={(e) => handleChange(e)}
                    dark
                    label={"Waktu Mulai"}
                  ></TextInput>
                </div>
                <div className="w-full px-2 md:w-1/2">
                  <TextInput
                    name="waktuBeres"
                    type="date"
                    onChange={(e) => handleChange(e)}
                    dark
                    label={"Waktu Beres"}
                  ></TextInput>
                </div>
                <div className="w-full px-2 md:w-1/2">
                  <InputFile
                    labelTitle
                    name="image"
                    onChange={(e) => handleChange(e)}
                    placeholder={"Masukan Gambar Rencana"}
                  ></InputFile>
                  {input.image !== null && (
                    <div className="relative">
                      <div
                        onClick={() => {
                          setInput({
                            ...input,
                            image: null,
                          });
                        }}
                        className="absolute top-0 right-0 flex items-center justify-center text-white transition-all duration-200 bg-red-400 rounded-full hover:bg-red-500 opacity-10"
                        style={{ height: 20, width: 20, cursor: "pointer" }}
                      >
                        x
                      </div>
                      <div className="w-full px-2 mb-5">
                        <img
                          className="object-cover w-full"
                          height={300}
                          src={
                            input.image !== null &&
                            typeof input.image === "string"
                              ? `http://localhost:8000/files/${input.image}`
                              : URL.createObjectURL(input.image)
                          }
                          alt="preview"
                        ></img>
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-full px-3 md:w-1/2">
                  <TextArea
                    name="deskripsi"
                    type="text"
                    value={input.deskripsi}
                    onChange={(e) => handleChange(e)}
                    placeholder={"Deskripsi Proyek"}
                    label={"Deskripsi"}
                  ></TextArea>
                </div>
                <div className="w-full px-3">
                  {isLoading ? (
                    <Button>Loading...</Button>
                  ) : (
                    <Button onClick={() => handleClick()}>
                      {params.id ? "Update Projek" : "Buat Projek"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NotifContainer />
    </Layout>
  );
};

export default CreateProjekBaru;
