import React, { useEffect, useState } from "react";
import { Button, Loading, TextInput } from "../elements";

const form = [
  {
    type: "input",
    name: "username",
    detail: {
      placeholder: "Masukan username",
      label: "Username",
      inputType: "text",
      value: "",
    },
  },
  {
    type: "input",
    name: "pengalaman",
    detail: {
      placeholder: "Lama Pengalaman",
      label: "Pengalaman",
      inputType: "text",
      value: "",
    },
  },
  {
    type: "select",
    name: "gender",
    detail: {
      label: "Jenis Kelamin",
      value: "",
      option: [
        {
          value: 0,
          string: "Laki-Laki",
        },
        {
          value: 1,
          string: "Perempuan",
        },
      ],
    },
  },
  {
    type: "select",
    name: "bisabacagambar",
    detail: {
      label: "Baca Gambar",
      value: "",
      option: [
        {
          value: 1,
          string: "Tidak Bisa",
        },
        {
          value: 2,
          string: "Kurang Bisa",
        },
        {
          value: 3,
          string: "Agak Bisa",
        },
        {
          value: 4,
          string: "Bisa",
        },
        {
          value: 5,
          string: "Sangat Bisa",
        },
      ],
    },
  },
];

const Test = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formInput, setFormInput] = useState([]);
  const [inputData, setInputData] = useState({});

  const handleChange = (e) => {
    if (e.target.type === "text" || e.target.type === "number") {
      setInputData({
        ...inputData,
        [e.target.name]: e.target.value,
      });
    } else {
      setInputData({
        ...inputData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = () => {
    console.log(inputData);
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setFormInput(form);

      let buffer = {};
      form.forEach((data) => {
        buffer = {
          ...buffer,
          [data.name]: "",
        };
      });

      setInputData(buffer);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="container justify-center mx-auto pt-11">
      {formInput.length > 0 &&
        formInput.map((data, index) => {
          if (data.type === "input") {
            return (
              <div key={index}>
                <TextInput
                  placeholder={data.detail.placeholder}
                  label={data.detail.label}
                  value={inputData[data.name]}
                  name={data.name}
                  type={data.detail.inputType}
                  onChange={(e) => handleChange(e)}
                  dark
                ></TextInput>
              </div>
            );
          } else {
            return (
              <div className="w-full" key={index}>
                <div className="mb-5">
                  <label
                    htmlFor="gender"
                    style={{ color: "#0C0D36" }}
                    className="mb-3 font-semibold capitalize text-md"
                  >
                    {data.detail.label}
                  </label>
                  <select
                    className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none"
                    name={data.name}
                    style={{ color: "#0C0D36" }}
                    value={inputData[data.name]}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="">Pilih Salah Satu</option>
                    {data.detail.option.map((option, index2) => {
                      return (
                        <option key={index2} value={option.value}>
                          {option.string}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            );
          }
        })}
      <Button onClick={() => handleSubmit()}>Submit</Button>
      <div style={{height: "100px"}} className="mb-18"></div>
      <div className="flex">
        <div className="flex-1">
          <TextInput placeholder={"Masukan Range"} name="value" dark></TextInput>
        </div>
        <div className="flex-1">
          <TextInput placeholder={"Masukan Range"} name="string" dark></TextInput>
        </div>
        <div className="flex-1">
          <Button>Add</Button>
        </div>
      </div>
    </div>
  );
};

export default Test;
