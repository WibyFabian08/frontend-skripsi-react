import React from "react";

const TextArea = ({ name, placeholder, value, onChange, noMargin, label, readOnly }) => {
  if (noMargin) {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={name}
            style={{ color: "#0C0D36" }}
            className="mb-3 font-semibold capitalize text-md"
          >
            {label}
          </label>
        )}
        <textarea
          name={name}
          className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none"
          style={{ color: "#0C0D36" }}
          rows="5"
          readOnly={readOnly}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        ></textarea>
      </div>
    );
  }
  return (
    <div className="w-full mb-5">
      {label && (
        <label
          htmlFor={name}
          style={{ color: "#0C0D36" }}
          className="mb-3 font-semibold capitalize text-md"
        >
          {label}
        </label>
      )}
      <textarea
        name={name}
        className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none"
        style={{ color: "#0C0D36" }}
        rows="5"
        readOnly={readOnly}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};

export default TextArea;
