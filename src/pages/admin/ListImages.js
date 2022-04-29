import React, { useEffect, useState } from "react";
import Layout from "../../layouts";
import { Loading } from "../../elements";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { ModalDetail } from "../../components";
import { NotifContainer } from "../../elements";
import { getKontraktorImages } from "../../redux/action/kontraktorGallery";

const ListImages = () => {
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [selectImage, setSelectImage] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let count = [];
    const perPage = 10;
    dispatch(getKontraktorImages(setData, setIsLoading, perPage, page));
    for (let i = 0; i < data?.totalPage; i++) {
      count.push(i + 1);
    }

    setTotalPage(count);
  }, [page, dispatch, data?.totalPage]);

  const handleNext = () => {
    if (page < totalPage.length) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const showDetail = (image) => {
    setIsOpenDetail(!isOpenDetail);
    setSelectImage(image);
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <Layout>
      <div>
        <h6 style={{ color: "#0C0D36" }} className="text-2xl font-semibold">
          List Images
        </h6>
        <p className="text-sm text-gray-400">
          Semua gambar yang telah diupload kontraktor
        </p>
      </div>

      <div className="flex justify-center mx-auto mt-5">
        <div className="flex flex-col w-full overflow-x-auto">
          <div className="w-full ">
            <div className="border-b border-gray-200 shadow">
              <table className="w-full hover:table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-2 text-xs text-gray-500">No</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Image</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Pemilik</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Phone</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Email</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {data !== null && data?.data?.length > 0 ? (
                    data.data.map((data, index) => {
                      return (
                        <tr
                          className="whitespace-nowrap hover:bg-gray-100"
                          key={index}
                        >
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-center text-gray-500">
                              <img
                                width={100}
                                className="rounded-md"
                                src={`http://localhost:8000/files/${data.image}`}
                                alt="preview"
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-center text-gray-500">
                              {data?.mandorId.fullname || "-"}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-center text-gray-500">
                            {data.mandorId.phone || "-"}
                          </td>
                          <td className="px-6 py-4 text-sm text-center text-gray-500">
                            {data.mandorId.email || "-"}
                          </td>
                          <td className="px-6 py-4 text-sm text-center">
                            <button
                              onClick={() => showDetail(data.image)}
                              className="px-4 py-1 text-sm text-white bg-blue-400 rounded"
                            >
                              Detail
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-4 text-xl text-center text-gray-400"
                      >
                        Data tidak ditemukan
                      </td>
                    </tr>
                  )}
                </tbody>
                <tr>
                  <td colspan={7}>
                    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
                      <div className="flex justify-between flex-1 sm:hidden">
                        <button className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                          Previous
                        </button>
                        <button className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                          Next
                        </button>
                      </div>
                      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm text-gray-700">
                            Showing{" "}
                            <span className="font-medium">
                              {data !== null && data.data.length}{" "}
                            </span>
                            of{" "}
                            <span className="font-medium">
                              {data !== null && data.totalImages}
                            </span>{" "}
                            results
                          </p>
                        </div>
                        <div>
                          <nav
                            className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
                            aria-label="Pagination"
                          >
                            <button
                              onClick={() => handlePrev()}
                              // disabled={page === 1 ? true : false}
                              className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50"
                            >
                              <span className="sr-only">Previous</span>
                              <BsArrowLeft
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </button>
                            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                            {totalPage.length > 0 &&
                              totalPage.map((_, index) => {
                                return (
                                  <button
                                    key={index}
                                    onClick={() => setPage(index + 1)}
                                    aria-current="page"
                                    className="relative z-10 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 border border-gray-300 bg-gray-50"
                                  >
                                    {index + 1}
                                  </button>
                                );
                              })}
                            <button
                              // disabled={page === data?.totalPage ? true : false}
                              onClick={() => handleNext()}
                              className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50"
                            >
                              <span className="sr-only">Next</span>
                              <BsArrowRight
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </button>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>

      <ModalDetail
        imagePreview
        isOpenDetail={isOpenDetail}
        setIsOpenDetail={setIsOpenDetail}
        title="Detail Image"
        image={selectImage}
      />

      <NotifContainer />
    </Layout>
  );
};

export default ListImages;
