import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const ok = JSON.parse(localStorage.getItem("user"));
    if (ok) {
      let decode = jwt_decode(ok);

      const now = new Date().getTime() / 1000;

      if (now > decode.exp) {
        localStorage.clear();
        navigate("/login");
      }
      
      dispatch({ type: "SET_ACTIVE_USER", value: decode });
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  return children;
};

export default PublicRoute;
