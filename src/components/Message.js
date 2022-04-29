// import {format} from 'timeago.js'
import moment from "moment";
const MessageContent = ({ data, messageRef, mine }) => {
  if (mine) {
    return (
      <div className="flex w-full pr-3">
        <div className="mb-8 ml-auto" ref={messageRef}>
          {data.image && (
            <img
              src={`http://localhost:8000/images/${data.image}`}
              width={200}
              className="object-cover mb-5 ml-auto border border-gray-300 rounded-md ml-aut-1o"
              alt="profile"
            />
          )}
          <div
            className="py-2 pl-3 pr-10 ml-auto text-left text-white rounded-lg"
            style={{ maxWidth: "75%", backgroundColor: "#23A6F0" }}
          >
            <p className="w-full mr-3">{data.text}</p>
          </div>
          <p className="mt-2 text-xs text-right text-gray-400">
            {moment(data.createdAt).fromNow()}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full mr-3">
      <div className="mb-8" ref={messageRef}>
        {data.image && (
          <img
            src={`http://localhost:8000/images/${data.image}`}
            width={200}
            className="object-cover mb-5 border-gray-300 rounded-md border-1"
            alt="profile"
          />
        )}
        <div
          className="py-2 pl-3 pr-10 text-white bg-gray-400 rounded-lg"
          style={{ maxWidth: "75%" }}
        >
          <p className="w-full mr-3">{data.text}</p>
        </div>
        <p className="block mt-2 text-xs text-gray-400">
          {moment(data.createdAt).fromNow()}
        </p>
      </div>
    </div>
  );
};

export default MessageContent;
