import React from "react";
import { Link } from "react-router-dom";
import { logOut } from "../utilities/auth";

const LogOutButton = () => (
  <button className="bg-neutral-800 p-2 py-1.5" onClick={logOut}>
    <span className="material-symbols-rounded flex justify-center align-center text-sm text-white">
      logout
    </span>
  </button>
);

const Header = ({ user }) => {
  return (
    <header className="fixed top-0 left-0 w-full p-4 z-10 bg-white shadow-md">
      <div className="flex items-center">
        <nav className="container mx-auto">
          <ul className="flex justify-start gap-4">
            <li>
              <Link
                to="/"
                className="text-black font-semibold hover:text-gray-900"
              >
                Main
              </Link>
            </li>
            <li>
              <Link
                to="/closet"
                className="text-black font-semibold hover:text-gray-900"
              >
                Closet
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/" className="text-black font-semibold hover:text-gray-900">
            FitForecast
          </Link>
          {user && <LogOutButton />}
        </div>
      </div>
    </header>
  );
};

export default Header;
