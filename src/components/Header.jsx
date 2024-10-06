import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full p-4 z-10 bg-white shadow-md">
      <div className="flex">
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

        <p className="font-semibold">FitForecast</p>
      </div>
    </header>
  );
};

export default Header;
