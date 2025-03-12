import logo from "../../assets/ispsc.png";

const Header = () => {
  return (
    <header className="bg-primary">
      <div className="flex items-center gap-2 w-[90%] mx-auto py-2">
        <div>
          <img src={logo} alt="ispsc logo" className="w-20 h-20" />
        </div>
        <div>
          <h1 className="main-font">Ilocos Sur Polytechnic State College</h1>
          <h2 className="main-font">Admin</h2>
        </div>
      </div>
    </header>
  );
};

export default Header;
