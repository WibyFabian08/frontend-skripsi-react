import React, { useRef, useState } from "react";
import { BsCardImage } from "react-icons/bs";

const InputFile = ({
  name,
  placeholder,
  onChange,
  gallery,
  label,
  setGallery,
  icon,
  labelTitle,
}) => {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const getFileName = (e) => {
    onChange({
      target: {
        name: e.target.name,
        value: e.target.files[0],
      },
    });
    setFileName(e.target.files[0].name);
  };

  const getGallery = (e) => {
    setGallery(e.target.files[0]);
  };

  if (icon) {
    return (
      <>
        <input
          name={name}
          type="file"
          className="hidden w-full px-4 py-2 focus:outline-none"
          onChange={(e) => getFileName(e)}
          ref={inputRef}
        ></input>
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: "#23A6F0",
            cursor: "pointer",
          }}
        >
          <BsCardImage
            style={{ fontSize: "20px", color: "white" }}
            onClick={() => inputRef.current.click()}
          ></BsCardImage>
        </div>
      </>
    );
  }

  if (gallery) {
    return (
      <div className="w-full mb-5">
        <input
          name={name}
          type="file"
          className="hidden w-full px-4 py-2 focus:outline-none"
          onChange={(e) => getGallery(e)}
          ref={inputRef}
        ></input>
        <button
          readOnly
          className="w-full px-4 py-2 text-center border border-gray-300 rounded-md focus:outline-none"
          value={fileName}
          style={{
            backgroundColor: "#23A6F0",
            color: "white",
          }}
          onClick={() => inputRef.current.click()}
        >
          {label}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full mb-5">
      {labelTitle && (
        <label
          htmlFor={name}
          style={{ color: "#0C0D36" }}
          className="mb-3 font-semibold capitalize text-md"
        >
          {name}
        </label>
      )}
      <input
        name={name}
        type="file"
        className="hidden w-full px-4 py-2 focus:outline-none"
        onChange={(e) => getFileName(e)}
        ref={inputRef}
      ></input>
      <input
        readOnly
        className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none"
        placeholder={placeholder}
        value={fileName}
        style={{ color: "#0C0D36", cursor: "pointer" }}
        onClick={() => inputRef.current.click()}
      />
    </div>
  );
};

export default InputFile;
