import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const AdminRoute = ({ children }) => {
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

      if (decode?.data?.role !== 1) {
        navigate("/unauthorize");
      }
      dispatch({ type: "SET_ACTIVE_USER", value: decode });
    } else {
      navigate("/unauthorize");
    }
  }, [navigate, dispatch]);

  return children;
};

export default AdminRoute;
