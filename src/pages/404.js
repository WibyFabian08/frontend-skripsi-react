import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src="/images/404.jpg" alt="404" width={400} />
      <br />
      <button
        className="px-4 py-2 text-white transition-all duration-300 bg-blue-400 rounded-full hover:bg-blue-500"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
};

export default NotFound;
