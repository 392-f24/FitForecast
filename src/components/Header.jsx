import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="top-0 left-0 w-full p-4 z-1 border-b-2 border-black shadow-md">
            <nav className="container mx-auto">
                <ul className="flex justify-start gap-4">
                    <li>
                        <Link to="/" className="text-black text-lg font-semibold hover:text-gray-900">
                            Main
                        </Link>
                    </li>
                    <li>
                        <Link to="/closet" className="text-black text-lg font-semibold hover:text-gray-900">
                            Closet
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
