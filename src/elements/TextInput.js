const TextInput = ({
  placeholder,
  type,
  onChange,
  value,
  name,
  dark,
  noMargin,
  label,
  readOnly
}) => {
  if (noMargin) {
    return (
      <div className="">
        {label && (
          <label
            htmlFor={name}
            style={{ color: "#0C0D36" }}
            className="mb-3 font-semibold capitalize text-md"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          style={{ color: "#0C0D36" }}
          placeholder={placeholder}
          value={value}
          name={name}
          readOnly={readOnly}
          onChange={onChange}
          className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none"
        />
      </div>
    );
  }
  if (dark) {
    return (
      <div className="mb-5">
        {label && (
          <label
            htmlFor={name}
            style={{ color: "#0C0D36" }}
            className="mb-3 font-semibold capitalize text-md"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          style={{ color: "#0C0D36" }}
          placeholder={placeholder}
          value={value}
          name={name}
          readOnly={readOnly}
          onChange={onChange}
          className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none"
        />
      </div>
    );
  }

  return (
    <div className="mb-5">
      {label && (
        <label
          htmlFor={name}
          style={{ color: "#0C0D36" }}
          className="mb-3 font-semibold capitalize text-md"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        readOnly={readOnly}
        onChange={onChange}
        className="w-9/12 px-4 py-2 border border-blue-500 rounded-full focus:outline-none"
      />
    </div>
  );
};

export default TextInput;
