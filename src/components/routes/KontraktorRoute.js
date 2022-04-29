import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const KontraktorRoute = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const ok = JSON.parse(localStorage.getItem("user"));
    if (ok) {
      let decode = jwt_decode(ok);
      dispatch({ type: "SET_ACTIVE_USER", value: decode });

      const now = new Date().getTime() / 1000;

      if (now > decode.exp) {
        localStorage.clear();
        navigate("/login");
      }

      if (decode?.data?.role !== 3) {
        navigate("/unauthorize");
      }
      
    } else {
      navigate("/unauthorize");
    }
  }, [navigate, dispatch]);

  return children;
};

export default KontraktorRoute;
