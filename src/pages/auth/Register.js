import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { TextInput, Button, NotifContainer } from "../../elements";

import { showError, showSuccess } from "../../utils/showNotif";

import { signUp } from "../../redux/action/auth";

const Register = () => {
  const dispatch = useDispatch();

  const [formRegister, setFormRegister] = useState({
    username: "",
    email: "",
    role: 3,
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormRegister({
      ...formRegister,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      signUp(
        formRegister,
        showSuccess,
        showError,
        setFormRegister,
        setIsLoading
      )
    );
  };

  return (
    <>
      <div className="flex flex-wrap items-center h-screen">
        <div className="w-full mx-auto text-center md:w-1/2">
          <div className="mb-5 text-2xl font-bold text-blue-500">
            <Link to="/">Uwebs Build</Link>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <TextInput
              name="username"
              placeholder="Username"
              value={formRegister.username}
              onChange={(e) => handleChange(e)}
              type="text"
            ></TextInput>
            <TextInput
              name="email"
              placeholder="Email Address"
              value={formRegister.email}
              onChange={(e) => handleChange(e)}
              type="email"
            ></TextInput>
            {/* <div className="mb-5">
              <select
                className="w-9/12 px-4 py-2 text-gray-400 border border-blue-500 rounded-full focus:outline-none"
                name="role"
                value={formRegister.role}
                onChange={(e) => handleChange(e)}
              >
                <option value="">Pilih Role</option>
                <option value={2}>Client</option>
                <option value={3}>Mandor</option>
              </select>
            </div> */}
            <TextInput
              name="password"
              placeholder="Password"
              value={formRegister.password}
              onChange={(e) => handleChange(e)}
              type="password"
            ></TextInput>
            <Button type="submit" disabled={isLoading} btnLogin>
              {isLoading ? "Loading..." : "Register"}
            </Button>
          </form>
          <div className="flex justify-center">
            <Button toAuth path="/login">
              Login
            </Button>
          </div>
        </div>
        <div
          className="flex-col items-center justify-center hidden w-0 h-screen text-center md:flex md:w-1/2"
          style={{ backgroundColor: "#23A6F0" }}
        >
          <img
            src="/images/register.jpg"
            width="70%"
            className="rounded-3xl"
            alt=""
          />
          <p className="mt-5 text-xl font-bold text-white">
            Win the battle. <br />
            Be the Champion.
          </p>
          <p className="mt-5 text-xs text-gray-200">
            Kami menyediakan jutaan cara untuk <br /> membantu players menjadi{" "}
            <br /> pemenang sejati
          </p>
        </div>
      </div>

      <NotifContainer />
    </>
  );
};

export default Register;
