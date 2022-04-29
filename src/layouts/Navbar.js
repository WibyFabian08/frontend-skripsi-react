import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../redux/action/auth";
import { getById } from "../redux/action/user";
import {
  BsFillChatLeftTextFill,
  BsFillEyeSlashFill,
} from "react-icons/bs";

import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Loading } from "../elements";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);
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
  });

  const solutions = [
    {
      name: "Insights",
      description: "Measure actions your users take",
      href: "##",
    },
    {
      name: "Automations",
      description: "Create your own targeted content",
      href: "##",
    },
    {
      name: "Reports",
      description: "Keep track of your growth",
      href: "##",
    },
    {
      name: "Reports",
      description: "Keep track of your growth",
      href: "##",
    },
  ];

  const { activeUser } = useSelector((state) => state.userState);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(signOut(navigate));
  };

  const handleClick = () => {
    setShow(!show);
  };

  useEffect(() => {
    if (activeUser !== null) {
      dispatch(getById(activeUser?.data?._id, setUserData, setIsLoadingFetch));
    }
  }, [dispatch, activeUser]);

  if(isLoadingFetch) {
    return <Loading></Loading>
  }

  return (
    <>
      <div className="w-full bg-white shadow-xl">
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center">
            <Link
              to="/"
              className="ml-3 text-xl font-bold md:text-2xl"
              style={{ color: "#23A6F0" }}
            >
              Uwebs Build
            </Link>
          </div>
          <div className="flex items-center">
            {activeUser?.data?.role !== 1 && (
              <div className="mr-5">
                <div className="w-full max-w-sm px-4 top-16">
                  <Popover className="relative">
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={`
                  ${open ? "" : "text-opacity-90"}
                  text-white group bg-transaparent px-3 py-2 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                        >
                          <div className="relative">
                            <div
                              className="absolute bg-red-500 rounded-full -right-1 -top-1"
                              style={{ width: "10px", height: "10px" }}
                            ></div>
                            <BsFillChatLeftTextFill
                              style={{ color: "#23A6F0", cursor: "pointer" }}
                            ></BsFillChatLeftTextFill>
                          </div>
                        </Popover.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel className="absolute z-10 px-4 mt-3 transform -translate-x-1/2 -left-20 sm:px-0">
                            <div
                              className="overflow-y-auto rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
                              style={{ height: "376px" }}
                            >
                              <div className="p-3 bg-white border-b border-gray-300">
                                <p className="mb-4 text-sm text-gray-400">
                                  Kamu mempunyai pesan baru
                                </p>{" "}
                                <span className="px-4 py-2 mt-5 text-xs text-white bg-indigo-400 rounded-full">
                                  <Link to="/message">Lihat semua</Link>
                                </span>
                              </div>
                              <div className="relative bg-white p-7">
                                {solutions.map((item, index) => (
                                  <div className="mb-5" key={index}>
                                    <Link
                                      to="/message"
                                      key={item.name}
                                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                    >
                                      <div className="flex items-center justify-center w-3 h-10 text-indigo-500 sm:h-12 sm:w-12">
                                        <BsFillEyeSlashFill></BsFillEyeSlashFill>
                                      </div>
                                      <div className="flex-1 w-full pr-20 ml-4">
                                        <p className="text-sm font-medium text-gray-900">
                                          {item.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                          {item.description}
                                        </p>
                                      </div>
                                    </Link>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                </div>
              </div>
            )}
            <div
              className="relative flex items-center"
              style={{ cursor: "pointer" }}
              onClick={() => handleClick()}
            >
              <p className="mr-2">{userData && userData?.username}</p>
              <div
                className="mx-1 overflow-hidden bg-white border-2 border-gray-300 rounded-full"
                style={{ height: 40, width: 40 }}
              >
                <img
                  src={
                    userData.image !== null
                      ? `http://localhost:8000/files/${userData?.image}`
                      : "/images/blank.png"
                  }
                  className="object-cover w-full h-full"
                  alt="profile"
                />
              </div>
            </div>
          </div>
          {show && (
            <div className="absolute z-10 bg-white border border-gray-200 rounded-md shadow-lg top-16 right-10">
              <div className="flex flex-col flex-start">
                <div></div>
                <Link
                  to="/profile"
                  className="py-2 transition-all duration-200 px-7 hover:bg-gray-300"
                >
                  Profile
                </Link>
                <div
                  onClick={() => handleLogout()}
                  style={{ cursor: "pointer" }}
                  className="py-2 transition-all duration-200 px-7 hover:bg-gray-300"
                >
                  Sign Out
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* pop over */}
    </>
  );
};

export default Navbar;
