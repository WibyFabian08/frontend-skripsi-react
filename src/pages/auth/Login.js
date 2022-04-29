import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextInput, Button, NotifContainer } from "../../elements";

import { signIn } from "../../redux/action/auth";

import { useDispatch } from "react-redux";

import { showError } from "../../utils/showNotif";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      signIn(
        loginForm,
        showError,
        navigate,
        loginForm,
        setLoginForm,
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
              name="email"
              placeholder="email"
              value={loginForm.email}
              onChange={(e) => handleChange(e)}
              type="email"
            ></TextInput>
            <TextInput
              name="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={(e) => handleChange(e)}
              type="password"
            ></TextInput>
            <Button type="submit" disabled={isLoading} btnLogin>
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </form>
          <div className="flex justify-center">
            <Button toAuth path="/register">
              Register
            </Button>
          </div>
        </div>
        <div
          className="flex-col items-center justify-center hidden w-0 h-screen text-center md:flex md:w-1/2"
          style={{ backgroundColor: "#23A6F0" }}
        >
          <img
            src="/images/auth.jpg"
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

export default Login;
