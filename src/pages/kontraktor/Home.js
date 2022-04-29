import Layout from "../../layouts";
import { Card } from "../../components";
import { BsPeople, BsBuilding, BsFillCartCheckFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const MandorHome = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div>
        <h6 style={{ color: "#0C0D36" }} className="text-2xl font-semibold">
          May Dashboard
        </h6>
        <p className="text-sm text-gray-400">
          Summary informasi pada akun anda
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-5 mt-5">
        <Card
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/admin/client")}
          icon={<BsPeople size="25px"></BsPeople>}
          title="100 client"
          text="Client yang sudah menggunakan jasa anda"
        ></Card>
        <Card
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/admin/mandor")}
          icon={<BsBuilding size="25px"></BsBuilding>}
          title="20 project"
          text="Project yang telah anda selesaikan"
        ></Card>
        <Card
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/admin/transaksi")}
          icon={<BsFillCartCheckFill size="25px"></BsFillCartCheckFill>}
          title="20 transaksi"
          text="Transaksi deal antara client dan mandor"
        ></Card>
      </div>
    </Layout>
  );
};

export default MandorHome;
