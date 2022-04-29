import { ToastContainer } from "react-toastify";

const NotifContainer = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
      <ToastContainer />
    </>
  );
};

export default NotifContainer;
