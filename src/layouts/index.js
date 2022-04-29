import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  BsArrowRightShort,
  BsArrowLeftShort,
  BsFillHouseDoorFill,
  BsBuilding,
  BsFillChatLeftTextFill,
  BsPeople,
  BsFillCartCheckFill,
  BsFillImageFill,
  BsSearch,
} from "react-icons/bs";

const Layout = ({ children }) => {
  const { activeUser } = useSelector((state) => state.userState);

  const location = useLocation();
  const [left, setLeft] = useState(800);
  const [homePath, setHomePath] = useState("/");
  const [toggleMenu, setTogglemenu] = useState(false);
  const dispatch = useDispatch();

  const updateWidth = () => {
    setLeft(window.innerWidth);
  };

  const getNavLink = (path) => {
    return location.pathname === path
      ? "bg-gray-200 text-blue-400"
      : "text-white";
  };

  const closeSidebar = () => {
    setTogglemenu(false);
    setTogglemenu(true);
    setLeft(-300);
    setTogglemenu(false);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, [dispatch]);

  useEffect(() => {
    if (activeUser !== null) {
      switch (activeUser?.data?.role) {
        case 1:
          setHomePath("/admin");
          break;

        case 3:
          setHomePath("/kontraktor");
          break;

        default:
          setHomePath("/");
          break;
      }
    }
  }, [activeUser]);

  const LEFT = left < 770 && !toggleMenu ? -300 : 0;

  if (activeUser?.data?.role === 1) {
    return (
      <section className="relative flex w-full">
        <div
          className="absolute z-20 h-screen overflow-y-auto transition-all duration-300 ease-in-out md:relative admin-sidebar"
          style={{ left: LEFT, width: "300px", backgroundColor: "#23A6F0" }}
        >
          <div
            className="absolute right-0 block px-2 py-2 bg-white rounded-l-full top-1/2 md:hidden "
            style={{ cursor: "pointer" }}
            onClick={() => closeSidebar()}
          >
            <BsArrowLeftShort style={{ color: "#23A6F0" }}></BsArrowLeftShort>
          </div>
          <div className="flex flex-col p-5">
            <div className="mb-3">
              <p className="text-sm font-bold text-gray-100">Dashboard</p>
              <ul className="px-2 py-1">
                <li
                  className={[
                    "flex items-center w-full px-2 py-1 rounded-xl hover:bg-gray-200 hover:text-blue-400",
                    getNavLink(homePath),
                  ].join(" ")}
                >
                  <BsFillHouseDoorFill
                    className={[getNavLink(homePath)].join(" ")}
                  ></BsFillHouseDoorFill>
                  <Link className="ml-1 font-semibold" to={homePath}>
                    Home
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mb-3">
              <p className="text-sm font-bold text-gray-100">Master Data</p>
              <ul className="px-2 py-1">
                <li
                  className={[
                    "flex items-center w-full px-2 py-1 rounded-xl hover:bg-gray-200 hover:text-blue-400",
                    getNavLink("/admin/kriteria"),
                  ].join(" ")}
                >
                  <BsFillHouseDoorFill
                    className={[getNavLink("/admin/kriteria")].join(" ")}
                  ></BsFillHouseDoorFill>
                  <Link className="ml-1 font-semibold" to={"/admin/kriteria"}>
                    List Kriteria
                  </Link>
                </li>
                <li
                  className={[
                    "flex items-center w-full px-2 py-1 rounded-xl hover:bg-gray-200 hover:text-blue-400",
                    getNavLink("/admin/projek-baru"),
                  ].join(" ")}
                >
                  <BsBuilding
                    className={[getNavLink("/admin/projek-baru")].join(" ")}
                  ></BsBuilding>
                  <Link
                    className="ml-1 font-semibold"
                    to={"/admin/projek-baru"}
                  >
                    List Proyek Baru
                  </Link>
                </li>
                <li
                  className={[
                    "flex items-center w-full px-2 py-1 rounded-xl hover:bg-gray-200 hover:text-blue-400",
                    getNavLink("/admin/riwayat-tender"),
                  ].join(" ")}
                >
                  <BsBuilding
                    className={[getNavLink("/admin/riwayat-tender")].join(" ")}
                  ></BsBuilding>
                  <Link
                    className="ml-1 font-semibold"
                    to={"/admin/riwayat-tender"}
                  >
                    Riwayat Tender
                  </Link>
                </li>
                <li
                  className={[
                    "flex items-center w-full px-2 py-1 rounded-xl hover:bg-gray-200 hover:text-blue-400",
                    getNavLink("/admin/kontraktor"),
                  ].join(" ")}
                >
                  <BsPeople
                    className={[
                      "hover:text-blue-400",
                      getNavLink("/admin/kontraktor"),
                    ].join(" ")}
                  ></BsPeople>
                  <Link className="ml-1 font-semibold" to="/admin/kontraktor">
                    List Kontraktor
                  </Link>
                </li>
                <li
                  className={[
                    "flex items-center w-full px-2 py-1 rounded-xl hover:bg-gray-200 hover:text-blue-400",
                    getNavLink("/admin/images"),
                  ].join(" ")}
                >
                  <BsFillImageFill
                    className={[
                      "hover:text-blue-400",
                      getNavLink("/admin/images"),
                    ].join(" ")}
                  ></BsFillImageFill>
                  <Link className="ml-1 font-semibold" to="/admin/images">
                    Galleries
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="relative w-full h-screen overflow-x-hidden overflow-y-auto bg-gray-200 md:w-4/5">
          <div
            className="fixed left-0 z-10 block px-2 py-2 rounded-r-full top-1/2 md:hidden "
            style={{ cursor: "pointer", backgroundColor: "#23A6F0" }}
            onClick={() => setTogglemenu(!toggleMenu)}
          >
            <BsArrowRightShort style={{ color: "white" }}></BsArrowRightShort>
          </div>
          <Navbar dark></Navbar>
          <div className="py-5 px-9">{children}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex w-full">
      <div
        className="absolute z-20 h-screen overflow-y-auto transition-all duration-300 ease-in-out md:relative admin-sidebar"
        style={{ left: LEFT, width: "300px", backgroundColor: "#23A6F0" }}
      >
        <div
          className="absolute right-0 block px-2 py-2 bg-white rounded-l-full top-1/2 md:hidden "
          style={{ cursor: "pointer" }}
          onClick={() => closeSidebar()}
        >
          <BsArrowLeftShort style={{ color: "#23A6F0" }}></BsArrowLeftShort>
        </div>
        <div className="flex flex-col p-5">
          <div className="mb-3">
            <p className="text-sm font-bold text-gray-100">Dashboard</p>
            <ul className="px-2 py-1">
              <li
                className={[
                  "flex items-center w-full px-2 py-1 rounded-xl hover:bg-gray-200 hover:text-blue-400",
                  getNavLink(homePath),
                ].join(" ")}
              >
                <BsFillHouseDoorFill
                  className={[getNavLink(homePath)].join(" ")}
                ></BsFillHouseDoorFill>
                <Link className="ml-1 font-semibold" to={homePath}>
                  Home
                </Link>
              </li>
            </ul>
          </div>

          <div className="mb-3">
            <p className="text-sm font-bold text-gray-100">Main Menu</p>
            <ul className="px-2 py-1">
              <li
                className={[
                  "flex items-center w-full px-2 py-1 rounded-xl hover:bg-gray-200 hover:text-blue-400",
                  getNavLink("/kontraktor/lowongan-projek"),
                ].join(" ")}
              >
                <BsBuilding
                  className={[getNavLink("/kontraktor/lowongan-projek")].join(" ")}
                ></BsBuilding>
                <Link className="ml-1 font-semibold" to="/kontraktor/lowongan-projek">
                  Lowongan Proyek
                </Link>
              </li>
              <li
                className={[
                  "flex items-center w-full px-2 py-1 rounded-xl hover:bg-gray-200 hover:text-blue-400",
                  getNavLink("/kontraktor/tender-list"),
                ].join(" ")}
              >
                <BsFillCartCheckFill
                  className={[getNavLink("/kontraktor/tender-list")].join(" ")}
                ></BsFillCartCheckFill>
                <Link className="ml-1 font-semibold" to="/kontraktor/tender-list">
                  Riwayat Tender
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative w-full h-screen overflow-x-hidden overflow-y-auto bg-gray-200 md:w-4/5">
        <div
          className="fixed left-0 z-10 block px-2 py-2 rounded-r-full top-1/2 md:hidden "
          style={{ cursor: "pointer", backgroundColor: "#23A6F0" }}
          onClick={() => setTogglemenu(!toggleMenu)}
        >
          <BsArrowRightShort style={{ color: "white" }}></BsArrowRightShort>
        </div>
        <Navbar dark></Navbar>
        <div className="py-5 px-9">{children}</div>
      </div>
    </section>
  );
};

export default Layout;
