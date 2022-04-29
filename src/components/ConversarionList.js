import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getById } from "../redux/action/user";

const ConversationList = ({ member, onClick, friendId }) => {
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    address: "",
    description: "",
    gender: "",
    phone: "",
    profession: "",
    image: null,
    username: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getById(friendId, setUserData, setIsLoadingFetch));
  }, []);

  return (
    <div
      style={{ height: "80px", cursor: "pointer" }}
      className="flex items-center px-5 transition-all duration-200 hover:bg-gray-300"
      onClick={onClick}
    >
      <div
        style={{ height: "50px", width: "50px" }}
        className="overflow-hidden bg-white rounded-full"
      >
        <img
          src={
            userData
              ? `http://localhost:8000/images/${userData?.image}`
              : "/images/blank.png"
          }
          alt="profile"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="ml-3">
        <h6 style={{ color: "#0C0D36" }} className="font-semibold text-md">
          {userData && userData?.fullname}
        </h6>
      </div>
    </div>
  );
};

export default ConversationList;
