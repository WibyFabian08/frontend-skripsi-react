import * as api from "../../api";
import decriptToken from "../../utils/decriptToken";

export const signIn =
  (data, showError, navigate, loginForm, setLoginForm, setIsLoading) =>
  async (dispatch) => {
    setIsLoading(true);
    try {
      const response = await api.signIn(data);

      if (response) {
        localStorage.setItem("user", JSON.stringify(response.data.token));

        let decode = decriptToken();
        dispatch({ type: "SET_ACTIVE_USER", value: decode });
        
        switch (decode.data.role) {
          case 1:
            navigate("/admin");
            break;

          default:
            navigate("/kontraktor");
            break;
        }

        setLoginForm({
          ...loginForm,
          email: "",
          password: "",
        });

        setIsLoading(false);
      }
    } catch (err) {
      showError(err?.response?.data?.message);
      setIsLoading(false);
    }
  };

export const signUp =
  (data, showSuccess, showError, setFormRegister, setIsLoading) => async () => {
    setIsLoading(true);
    try {
      const response = await api.signUp(data);

      if (response) {
        showSuccess("Register Berhasil, Sllahkan Login");
        setIsLoading(false);
        setFormRegister({
          ...data,
          username: "",
          email: "",
          role: "",
          password: "",
        });
      }
    } catch (err) {
      showError(err?.response?.data?.message);
      setIsLoading(false);
    }
  };

  export const signOut = (navigate) => async (dispatch) => {
    dispatch({type: "SET_ACTIVE_USER", value: null})
    localStorage.clear()
    navigate('/login')
    window.location.reload();
  }
