import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../redux/action/auth";
import { getById } from "../redux/action/user";
import { BsFillChatLeftTextFill, BsFillEyeSlashFill } from "react-icons/bs";

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

  if (isLoadingFetch) {
    return <Loading></Loading>;
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
