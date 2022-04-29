import React from "react";
import Layout from "../../layouts";
import { Card } from "../../components";
import { BsPeople, BsBuilding, BsFillCartCheckFill, BsFillImageFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div>
        <h6 style={{ color: "#0C0D36" }} className="text-2xl font-semibold">
          Admin Dashboard
        </h6>
        <p className="text-sm text-gray-400">
          Summary informasi pada akun anda
        </p>
      </div>

      <div className="flex flex-wrap gap-5 mt-5">
        <Card
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/admin/client")}
          icon={<BsPeople size="25px"></BsPeople>}
          title="100 client"
          text="User aktif yang terdaftar"
        ></Card>
        <Card
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/admin/mandor")}
          icon={<BsBuilding size="25px"></BsBuilding>}
          title="20 mandor"
          text="Mandor yang terdaftar dan aktif"
        ></Card>
        <Card
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/admin/transaksi")}
          icon={<BsFillCartCheckFill size="25px"></BsFillCartCheckFill>}
          title="20 transaksi"
          text="Transaksi deal antara client dan mandor"
        ></Card>
        <Card
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/admin/transaksi")}
          icon={<BsFillImageFill size="25px"></BsFillImageFill>}
          title="20 portofolio"
          text="Portofolio dari projek yang dikerjakan mandor"
        ></Card>
      </div>
      <div className="p-5 bg-white rounded-md shadow-md"></div>
    </Layout>
  );
};

export default AdminHome;
