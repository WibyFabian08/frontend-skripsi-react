const Testimoni = ({ word }) => {
  return (
    <div className="flex items-center justify-center px-20 py-12 bg-gray-100 shadow-md px rounded-xl md:px-44">
      <div
        className="hidden w-0 overflow-hidden bg-white rounded-full md:block md:w-1/3"
        style={{ width: "100px", height: "100px" }}
      >
        <img
          src="/images/profile.jpg"
          className="object-cover w-full h-full "
          alt="client"
        />
      </div>
      <div className="w-full ml-3 text-sm text-justify md:w-2/3">
        <span className="font-italic">"</span>
        {word}
        <span className="font-italic">"</span>
        <p className="mt-3 text-xs">William, CEO</p>
      </div>
    </div>
  );
};

export default Testimoni;
