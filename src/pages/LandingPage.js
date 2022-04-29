import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Slider from "react-slick";

import { Hero, Footer, Card, Testimoni } from "../components";

import { BsPeople, BsBuilding, BsHammer } from "react-icons/bs";

import { getLandingPageData } from "../redux/action/landingPage";

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoPlay: true,
  autoplaySpeed: 2000,
};

const LandingPage = () => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLandingPageData(setData));
  }, [dispatch]);

  return (
    <div className="relative overflow-hidden">
      <Hero></Hero>
      <div
        className="relative z-10 flex flex-wrap justify-center"
        style={{ marginTop: "-70px" }}
      >
        <Card
          icon={<BsPeople size="25px"></BsPeople>}
          title={data !== null ? `${data?.totalClients} Clients` : "-"}
          text="Kami dipercaya oleh klien dari berbagai daerah"
        ></Card>
        <Card
          icon={<BsBuilding size="25px"></BsBuilding>}
          title={data !== null ? `${data?.totalMandor} Engineers` : "-"}
          text="Kami memiliki pekerja profesional dan berkualitas"
        ></Card>
        <Card
          icon={<BsHammer size="25px"></BsHammer>}
          title={data !== null ? `${data?.totalPortofolio} Projects` : "-"}
          text="Project kami tersebar diseluruh indonesia"
        ></Card>
      </div>
      <div className="container px-10 mx-auto my-12 md:px-20">
        <h6
          style={{ color: "#0C0D36" }}
          className="mb-16 text-2xl font-bold text-center"
        >
          Project Yang Telah Dikerjakan
        </h6>
        <div className="flex flex-wrap justify-center gap-16">
          {data !== null &&
            data.images.map((data, index) => {
              return <Card karya dataKarya={data} key={index}></Card>;
            })}
        </div>
      </div>
      <div className="container px-10 mx-auto my-12 md:px-20">
        <h6
          style={{ color: "#0C0D36" }}
          className="mb-16 text-2xl font-bold text-center"
        >
          Apa Kata Client Kami?
        </h6>
        <Slider className="slick" {...settings}>
          <Testimoni word="Saya sangat senang karena bisa menemukan pltaform pencarian tukang ini, disini saya dapat menemukan tukang dengan skill dan pengalaman yang baik sekali sehingga projek saya berjalan dengan baik. Terimakasih Uwebs Build"></Testimoni>
          <Testimoni word="Penyedia layanan pencarian tukang terbaik yang pernah saya temukan, dulu saya susah mencari tukang yang baik, setelah mengenal Uwebs Build saya merasa sangat terbantu."></Testimoni>
          <Testimoni word="Mencari tukang tidak perlu lagi keliling, tinggal masuk Uwebs Build tinggal pilih tukang yang kita mau, terbaik emang Uwebs Build."></Testimoni>
        </Slider>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default LandingPage;
