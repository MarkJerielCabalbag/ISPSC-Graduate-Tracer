import logo from "../assets/ispsc.png";
import bagongPilipinas from "../assets/bagong-pilipinas.png";
const Header = () => {
  return (
    <div className="bg-primary py-5 rounded-md flex flex-col items-center text-center gap-3">
      <div className="flex gap-2 items-center">
        <img src={logo} alt="ispsc logo" className="w-20 h-20" />
        <img
          src={bagongPilipinas}
          alt="bagong-pilipinas"
          className="w-20 h-20 "
        />
      </div>
      <div className="">
        <h1 className="main-font sm:text-lg md:text-2xl">
          Ilocos Sur Polytechnic State College
        </h1>
        <p
          className="main-font sm:text-sm md:text-xl
          "
        >
          Sta. Maria Campus
        </p>
      </div>
    </div>
  );
};

export default Header;
