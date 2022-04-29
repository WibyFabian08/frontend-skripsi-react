import jwt_decode from "jwt-decode";

const decriptToken = () => {
  const ok = JSON.parse(localStorage.getItem("user"));
  let decode;
  if (ok) {
    decode = jwt_decode(ok);
  }

  return decode;
};

export default decriptToken;
