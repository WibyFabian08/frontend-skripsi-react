import React, { useEffect, useState } from "react";
import Layout from "../../layouts";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLowonganById } from "../../redux/action/lowonganProjek";
import { Button, Loading } from "../../elements";
import { ModalTender } from "../../components";
import { getAllFormInput } from "../../redux/action/formInput";
import { NotifContainer } from "../../elements";
import { showError, showSuccess } from "../../utils/showNotif";
import {
  createCalonkontraktor,
  getCalonKontraktorByLowonganId,
} from "../../redux/action/calonKontraktor";

const DetailLowongan = () => {
  const { activeUser } = useSelector((state) => state.userState);
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  
  const [dataCheck, setDataCheck] = useState(false);
  const [formInput, setFormInput] = useState([]);
  const [inputData, setInputData] = useState({});
  const [file, setFile] = useState({
    fileTender: null,
  });

  const [input, setInput] = useState({
    name: "",
    deskripsi: "",
    lokasi: "",
    itemPekerjaan: [],
    waktuMulai: null,
    waktuBeres: null,
    volumePekerjaan: 0,
    pemilik: "",
    RAB: 0,
    image: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const data = new FormData();
    
    formInput.forEach((data) => {
      inputData[data.inputName] = parseInt(inputData[data.inputName])
    })

    data.append("lowonganId", params.id);
    data.append("kontraktorId", activeUser.data._id);
    data.append("lampiran", JSON.stringify(inputData));

    if (file.fileTender !== null) {
      data.append("image", file.fileTender);
    }

    dispatch(createCalonkontraktor(data, showError, showSuccess));
    setIsOpen(false)
    dispatch(
      getCalonKontraktorByLowonganId(
        params.id,
        activeUser.data._id,
        setDataCheck
      )
    );
  };

  const handleChange = (e) => {
    if (e.target.type === "text" || e.target.type === "number") {
      setInputData({
        ...inputData,
        [e.target.name]: e.target.value,
      });
    } else if (e?.target?.value?.type === "application/pdf") {
      setFile({
        ...file,
        [e.target.name]: e.target.value,
      });
    } else if (e?.target?.value?.type !== "application/pdf") {
      showError("File upload haru pdf!");
    } else {
      setInputData({
        ...inputData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const openModalAdd = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    dispatch(getLowonganById(params.id, setInput, setIsLoading));
  }, [dispatch, params.id]);

  useEffect(() => {
    dispatch(getAllFormInput(setFormInput));
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getCalonKontraktorByLowonganId(
        params.id,
        activeUser.data._id,
        setDataCheck
      )
    );
  }, [dispatch, params.id, activeUser.data._id]);

  useEffect(() => {
    if (formInput.length > 0) {
      let buffer = {};
      formInput.forEach((data) => {
        buffer = {
          ...buffer,
          [data.inputName]: "",
        };
      });

      setInputData(buffer);
    }
  }, [formInput]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Layout>
        <div>
          <h6 style={{ color: "#0C0D36" }} className="text-2xl font-semibold">
            Detail Projek
          </h6>
          <p className="text-sm text-gray-400">
            Informasi seputar projek yang telah diunggah
          </p>
        </div>

        <div className="w-full p-5 mt-5 bg-white">
          <div className="flex flex-wrap">
            <div className="w-full pr-5 mb-5 md:w-1/2 md:mb-0">
              <img
                src={`http://localhost:8000/files/${input.image}`}
                className="object-cover w-full rounded-md shadow-md"
                alt="preview"
              />
            </div>
            <div className="w-full md:w-1/2">
              <p className="mb-1 text-lg text-gray-500">
                Projek : {input.name || "-"}
              </p>
              <p className="mb-1 text-lg text-gray-500">
                Lokasi : {input.lokasi || "-"}
              </p>
              <p className="mb-1 text-lg text-gray-500">
                Pemilik : {input.pemilik || "-"}
              </p>
              <p className="mb-1 text-lg text-gray-500">
                Volume Pekerjaan : {input.volumePekerjaan || "-"} m
              </p>
              <p className="mb-1 text-lg text-gray-500">
                Total Pagu : Rp.{input.RAB || "-"}
              </p>
              <p className="mb-1 text-lg text-gray-500">
                Rentang Pengerjaan : {input.waktuMulai || "-"} -{" "}
                {input.waktuBeres || "-"}
              </p>
              <div>
                <p className="mb-1 text-lg text-gray-500">Item Pekerjaan : </p>
                {input.itemPekerjaan.length > 0 &&
                  input.itemPekerjaan.map((item, index) => {
                    return (
                      <p className="mb-1 text-lg text-gray-500" key={index}>
                        - {item || "-"}
                      </p>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="mt-5">
            <p className="mb-1 text-lg text-gray-500">Deskripsi :</p>
            <p className="mb-1 text-lg leading-relaxed text-gray-500">
              {input.deskripsi}
            </p>
          </div>
          <div className="flex w-full mt-5">
            <div className="ml-auto">
              <Link
                to="/kontraktor/lowongan-projek"
                className="px-4 py-2 mr-3 text-white transition-all duration-200 bg-green-400 rounded-md hover:bg-green-500"
              >
                Kembali
              </Link>
              {!dataCheck ? (
                <Button onClick={() => openModalAdd()}>Join Tender</Button>
              ) : (
                <Button>Anda Sudah Join Tender</Button>
              )}
            </div>
          </div>
        </div>
      </Layout>

      <ModalTender
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        formInput={formInput}
        inputData={inputData}
        onClick={() => handleSubmit()}
        onChange={(e) => handleChange(e)}
      />

      <NotifContainer></NotifContainer>
    </>
  );
};

export default DetailLowongan;
