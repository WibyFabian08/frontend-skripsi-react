import { Link, useNavigate, useLocation } from "react-router-dom";
import { NavLink, Button } from "../elements";

import { BsMenuButtonWide, BsFillXSquareFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Navbar = ({ dark }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { activeUser } = useSelector((state) => state.userState);

  const TOP = isOpen ? 0 : "-700px";

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const updateWidth = () => {
    if (window.innerWidth > 767) {
      setIsOpen(false);
    }
  };

  const handleClickBtn = () => {
    if (activeUser !== null) {
      switch (activeUser.data.role) {
        case 1:
          navigate("/admin");
          break;

        case 2:
          navigate("/user");
          break;

        case 3:
          navigate("/mandor");
          break;

        default:
          break;
      }
    }
  };

  const getNavLink = (path) => {
    return location.pathname === path ? "text-blue-300" : "text-white";
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  if (dark) {
    return (
      <>
        <div className="container px-5 mx-auto overflow-hidden bg-white md:px-20">
          <div className="flex items-center justify-between w-full navbar">
            <div className="flex items-center">
              <div className="mr-0 text-2xl font-bold text-white md:mr-5">
                <Link to="/" className="text-black">
                  Uwebs Build
                </Link>
              </div>
            </div>
            <div className="hidden md:block nav-button">
              {activeUser !== null ? (
                <Button btnLogin onClick={() => handleClickBtn()}>
                  {activeUser?.data?.username}
                </Button>
              ) : (
                <Button path="/login" btnAuth>
                  Login
                </Button>
              )}
            </div>
            <div
              className="block md:hidden nav-button"
              style={{ cursor: "pointer" }}
            >
              <BsMenuButtonWide
                size="25px"
                color="white"
                onClick={() => handleOpen()}
              ></BsMenuButtonWide>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            height: "300px",
            backgroundColor: "#23A6F0",
            top: TOP,
          }}
          className="container absolute left-0 right-0 z-50 p-3 mx-auto transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="mr-0 text-2xl font-bold text-white md:mr-5">
              <Link to="/">Uwebs Build</Link>
            </div>
            <div
              className="block md:hidden nav-button"
              style={{ cursor: "pointer" }}
            >
              <BsFillXSquareFill
                size="25px"
                color="gray"
                onClick={() => handleOpen()}
              ></BsFillXSquareFill>
            </div>
          </div>
          <div className="flex flex-col">
            {activeUser !== null ? (
              <Button btnLogin onClick={() => handleClickBtn()}>
                {activeUser?.data?.username}
              </Button>
            ) : (
              <Button path="/login" btnAuth>
                Login
              </Button>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container px-5 mx-auto overflow-hidden md:px-20">
        <div className="flex items-center justify-between w-full navbar">
          <div className="flex items-center">
            <div className="mr-0 text-2xl font-bold text-white md:mr-5">
              <Link to="/">Uwebs Build</Link>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center ml-5 nav-link">
                <NavLink getNavLink={getNavLink("/")} path="/">
                  Home
                </NavLink>
                <NavLink getNavLink={getNavLink("/about")} path="/about">About</NavLink>
                <NavLink getNavLink={getNavLink("/pricing")} path="/pricing">Pricing</NavLink>
                <NavLink getNavLink={getNavLink("/product")} path="/product">Product</NavLink>
              </div>
            </div>
          </div>
          <div className="hidden md:block nav-button">
            {activeUser !== null ? (
              <Button btnLogin onClick={() => handleClickBtn()}>
                {activeUser.data.username}
              </Button>
            ) : (
              <Button path="/login" btnAuth>
                Login
              </Button>
            )}
          </div>
          <div
            className="block md:hidden nav-button"
            style={{ cursor: "pointer" }}
          >
            <BsMenuButtonWide
              size="25px"
              color="white"
              onClick={() => handleOpen()}
            ></BsMenuButtonWide>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "300px",
          backgroundColor: "#23A6F0",
          top: TOP,
        }}
        className="container absolute left-0 right-0 z-50 p-3 mx-auto transition-all duration-300"
      >
        <div className="flex items-center justify-between">
          <div className="mr-0 text-2xl font-bold text-white md:mr-5">
            <Link to="/">Uwebs Build</Link>
          </div>
          <div
            className="block md:hidden nav-button"
            style={{ cursor: "pointer" }}
          >
            <BsFillXSquareFill
              size="25px"
              color="white"
              onClick={() => handleOpen()}
            ></BsFillXSquareFill>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="py-3">
            <NavLink path="/home">Home</NavLink>
          </div>
          <div className="py-3">
            <NavLink path="/about">About</NavLink>
          </div>
          <div className="py-3">
            <NavLink path="/pricing">Pricing</NavLink>
          </div>
          <div className="py-3">
            <NavLink path="/product">Product</NavLink>
          </div>
          {activeUser !== null ? (
            <Button btnLogin onClick={() => handleClickBtn()}>
              {activeUser.data.username}
            </Button>
          ) : (
            <Button path="/login" btnAuth>
              Login
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
