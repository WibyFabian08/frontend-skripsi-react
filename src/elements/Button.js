import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  children,
  onClick,
  btnAuth,
  btnHeroBlue,
  btnHeroOutline,
  btnLogin,
  type,
  toAuth,
  path,
  disabled,
}) => {
  if (btnLogin) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        type={type}
        className="w-9/12 px-8 py-2 truncate ... font-semibold text-white transition-all duration-300 bg-blue-500 rounded-full hover:bg-blue-400"
      >
        {children}
      </button>
    );
  }
  if (btnHeroOutline) {
    return (
      <button
        onClick={onClick}
        type={type}
        className="px-8 py-2 ml-2 font-semibold text-white transition-all duration-300 border border-white rounded-full hover:bg-blue-400"
      >
        {children}
      </button>
    );
  }
  if (btnHeroBlue) {
    return (
      <button
        onClick={onClick}
        type={type}
        className="px-8 py-2 mr-2 font-semibold text-white transition-all duration-300 bg-blue-400 rounded-full hover:bg-transparent hover:border hover:border-white"
      >
        {children}
      </button>
    );
  }
  if (toAuth) {
    return (
      <Link
        to={path}
        className="block w-9/12 px-4 py-2 mt-5 font-semibold text-white transition-all duration-300 bg-gray-300 rounded-full hover:bg-gray-400"
      >
        {children}
      </Link>
    );
  }
  if (btnAuth) {
    return (
      <Link
        to={path}
        // type={type}
        className="px-4 py-2 font-semibold text-white transition-all duration-300 bg-blue-400 rounded-md hover:bg-blue-500"
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className="px-4 py-2 font-semibold text-white transition-all duration-300 bg-blue-400 rounded-md hover:bg-blue-500"
    >
      {children}
    </button>
  );
};

export default Button;
