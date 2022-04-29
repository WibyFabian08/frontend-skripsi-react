const HeroCard = ({
  icon,
  title,
  text,
  style,
  onClick,
  karya,
  dataKarya,
  titleKarya,
  descKarya,
}) => {
  if (karya) {
    return (
      <div className="flex flex-col w-3/4 mb-5 overflow-hidden bg-white shadow-xl md:w-1/4">
        <div style={{ height: 200 }} className="w-full overflow-hidden">
          <img
            src={`http://localhost:8000/files/${dataKarya.image}`}
            className="object-cover w-full h-full"
            alt="preview"
          />
        </div>
        <div className="flex-1 p-5">
          <h6 style={{ color: "#0C0D36" }} className="mb-3 text-xl font-semibold">
            Town House
          </h6>
          <p className="mb-3 text-sm text-justify text-gray-500">
            Townhouse biasanya diartikan sebagai kompleks perumahan dengan
            jumlah unit terbatas yang ada di tengah kota dengan sistem layaknya
            rumah cluster di mana semua kompleks dilindungi dengan pagar atau
            tembok.
          </p>
          <p className="text-sm font-semibold" style={{ color: "#0C0D36" }}>
            Karya : {dataKarya.mandorId.fullname}
          </p>
        </div>
      </div>
    );
  }
  return (
    <div
      style={style}
      onClick={onClick}
      className="w-3/4 px-8 pt-5 pb-8 mx-5 mb-10 transition-all duration-300 shadow-lg md:w-1/4 hero-card"
    >
      {icon}
      <h2 className="mt-3 text-lg font-bold">{title}</h2>
      <p className="mt-3 text-sm">{text}</p>
    </div>
  );
};

export default HeroCard;
