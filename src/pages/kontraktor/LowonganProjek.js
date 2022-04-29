import React, { useEffect, useState } from "react";
import Layout from "../../layouts";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getLowongan } from "../../redux/action/lowonganProjek";
import { Loading } from "../../elements";

const LowonganProjek = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLowongan(setData, setIsLoading));
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <div>
        <h6 style={{ color: "#0C0D36" }} className="text-2xl font-semibold">
          Lowongan Projek
        </h6>
        <p className="text-sm text-gray-400">
          Semua lowongan projek yang dapat anda lamar
        </p>
      </div>

      <div className="w-full mt-5">
        <div className="flex flex-wrap w-full -mx-2">
          {data.length > 0 &&
            data.map((data, index) => {
              if (data.isAvail) {
                return (
                  <div className="w-full px-2 md:w-1/2" key={index}>
                    <div className="flex w-full p-5 mb-5 bg-white rounded-lg shadow-lg">
                      <div className="w-1/2 mr-5">
                        <img
                          src={`http://localhost:8000/files/${data.gambar}`}
                          alt="preview"
                          className="object-cover w-full"
                        />
                      </div>
                      <div className="w-1/2 truncate ... flex flex-col">
                        <p className="mb-2 text-sm text-gray-500">
                          Projek : {data.name || "-"}
                        </p>
                        <p className="mb-2 text-sm text-gray-500">
                          Lokasi : {data.lokasi || "-"}
                        </p>
                        <p className="mb-2 text-sm text-gray-500">
                          Pemilik : {data.pemilik || "-"}
                        </p>
                        <p className="mb-2 text-sm text-gray-500">
                          Volume Pekerjaan : {data.volumePekerjaan || "-"} m
                        </p>
                        <p className="text-sm text-gray-500 ">
                          Item Pekerjaan :
                        </p>
                        {data.itemPekerjaan.map((item, index2) => {
                          return (
                            <p
                              key={index2}
                              className="mb-2 ml-2 text-sm text-gray-500 truncate ..."
                            >
                              - {item || "-"}
                            </p>
                          );
                        })}
                        <Link
                          to={`/kontraktor/lowongan-projek/detail/${data._id}`}
                          className="w-full px-4 py-2 font-semibold text-center text-white transition-all duration-300 bg-blue-400 rounded-md hover:bg-blue-500"
                        >
                          Detail
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="w-full mt-5 text-xl">
                    <p className="text-center" style={{ color: "#0C0D36" }}>
                      Lowongan Proyek Kosong
                    </p>
                  </div>
                );
              }
            })}
        </div>
      </div>
    </Layout>
  );
};

export default LowonganProjek;
