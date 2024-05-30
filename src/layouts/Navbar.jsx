import { useState } from "react";
import { Animated } from "react-animated-css";

const Navbar = ({
  isLoggedIn,
  setIsLoggedIn,
  setUsername,
  setPassword,
  username,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <div className="navbar bg-base-300 sticky top-0 z-10 flex justify-between items-center px-4">
        <button className="btn bun btn-ghost text-xl uppercase font-bold shadow-md">
          Muzalpra AI
        </button>
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              )}
            </svg>
          </button>
        </div>
        <div className="hidden md:flex items-center bg-transparent shadow-xl sticky top-0 z-10">
          {isLoggedIn && (
            <>
              <div className="w-1/2 bg-transparent shadow-xl sticky z-10 top-0">
                <span className="mr-4">Welcome, {username}</span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="bg-red-500 text-white py-2 px-4 font-semibold rounded-lg hover:opacity-50"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <Animated animationIn="slideInRight" animationInDuration={500}>
          <div className="md:hidden bg-transparent w-1/2 left-40 mt-4 shadow-xl rounded-lg relative text-white">
            <ul className="flex flex-col items-center py-4">
              {isLoggedIn ? (
                <>
                  <li className="mb-2">Haii😎, {username}</li>
                  <li>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="bg-red-500 text-white py-2 px-4 font-semibold hover:opacity-50 rounded-lg"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <span className="text-white font-semibold shadow-md">Login First</span>
              )}
            </ul>
          </div>
        </Animated>
      )}
    </>
  );
};

export default Navbar;
