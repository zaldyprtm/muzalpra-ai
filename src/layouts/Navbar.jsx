const Navbar = ({ isLoggedIn, setIsLoggedIn, setUsername, setPassword }) => {
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <div className="navbar bg-base-300 sticky top-0 z-10">
        <button className="btn btn-ghost text-xl uppercase font-bold">Muzalpra AI</button>
        {isLoggedIn && (
          <button
            type="button"
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 font-semibold rounded-lg ml-auto"
          >
            Logout
          </button>
        )}
      </div>
    </>
  );
};

export default Navbar;
