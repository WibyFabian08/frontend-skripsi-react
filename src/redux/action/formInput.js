import * as api from "../../api";

export const getAllFormInputAdmin = (setFormInput) => async (dispatch) => {
  try {
    const response = await api.getAllFormInput();

    if(response.data.success) {
      let buffer = []
      response.data.data.forEach((data) => {
        if(data.isForAdmin) {
          buffer.push(data)
        }
      })
      setFormInput(buffer)
    }

  } catch (err) {
    console.log(err);
  }
};

export const getAllFormInput = (setFormInput) => async (dispatch) => {
  try {
    const response = await api.getAllFormInput();

    if(response.data.success) {
      let buffer = []
      response.data.data.forEach((data) => {
        if(!data.isForAdmin) {
          buffer.push(data)
        }
      })
      setFormInput(buffer)
    }

  } catch (err) {
    console.log(err);
  }
};

export const getFormInputByKriteriaId =
  (id, setFormInput, setFormType) => async (dispatch) => {
    try {
      const response = await api.getFormInputByKriteriaId(id);

      if (response.data.success) {
        setFormInput({
          type: response.data.data.inputDetail.type,
          placeholder: response.data.data.inputDetail.placeholder,
          label: response.data.data.inputDetail.label,
          isForAdmin: response.data.data.isForAdmin,
        });
        setFormType(response.data.data.inputType);
      }
    } catch (err) {
      console.log(err);
    }
  };
