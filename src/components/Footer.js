import { FooterLink } from "../elements";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#020308" }}>
      <div className="container px-5 py-20 mx-auto md:px-20">
        <div className="flex flex-wrap">
          <div className="w-full mb-10 md:w-2/5 md:mb-0">
            <div className="flex items-center">
              <p className="text-4xl font-bold text-white">
                Uwebs Build
              </p>
            </div>
            <div className="flex flex-col mt-5">
              <p className="font-bold text-white">Head Office</p>
              <p className="mt-3 text-sm text-gray-400">
                Kp Simpang RT. 02 RW. 04 Ds Simpangsari <br />
                Kec Cisurupan Kab. Garut <br />
                Jawa Barat 44163, Indonesia <br />
                (+62) 896 6319 1201
              </p>
            </div>
          </div>
          <div className="w-full mb-10 md:w-1/6 md:mb-0">
            <h1 className="text-white">
              <p className="mb-3 font-bold text-white ">Company</p>
            </h1>
            <div className="flex flex-col">
              <FooterLink path="/">Home</FooterLink>
              <FooterLink path="/about">About Us</FooterLink>
              <FooterLink path="/study-case">Case Study</FooterLink>
              <FooterLink path="/contact">Contact</FooterLink>
            </div>
          </div>
          <div className="w-full mb-10 md:w-1/5 md:mb-0">
            <h1 className="text-white">
              <p className="mb-3 font-bold text-white">Services</p>
            </h1>
            <div className="flex flex-col">
              <FooterLink path="/">
                Konsultasi Bangunan
              </FooterLink>
              <FooterLink path="/">Referensi Bangunan</FooterLink>
              <FooterLink path="/">Design Bangunan</FooterLink>
              <FooterLink path="/">Biaya Bangunan</FooterLink>
            </div>
          </div>
          <div className="w-full ml-0 md:w-1/5 md:ml-7">
            <h1 className="text-white">
              <p className="mb-3 font-bold text-white">Expertise</p>
            </h1>
            <div className="flex flex-col">
              <FooterLink path="/">Design Bangunan</FooterLink>
              <FooterLink path="/">Hitung Bangunan</FooterLink>
              <FooterLink path="/">Pertukangan</FooterLink>
              <FooterLink path="/">Pengawasan Bangunan</FooterLink>
              <FooterLink path="/">Perencanaan Bangunan</FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
