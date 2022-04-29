import * as api from "../../api";

export const getLandingPageData =
  (setData) => async (dispatch) => {
    try {
      const response = await api.getLandingPageData();

      if (response.data.success) {
        setData(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
