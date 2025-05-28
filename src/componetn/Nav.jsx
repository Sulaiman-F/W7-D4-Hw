import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { IoClose } from "react-icons/io5";
import { HiMiniBars3BottomRight } from "react-icons/hi2";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/Home");
  };

  return (
    <div>
      <nav className="flex justify-between  items-center h-13 lg:h-16 text-white bg-gradient-to-r from-sky-500 to-sky-600  w-full fixed px-5 md:px-5 lg:px-25 py-1.5 shadow-md z-50">
        <div className="flex h-full items-center ">
          <img
            className="h-full brightness-75 invert"
            src="https://i5.walmartimages.com/seo/Rick-and-Morty-Metal-Wall-Art_bcc4085e-c311-4886-a7a4-aa58127883d7.5958f8a36f96aa4c08dbc4a8a580e57c.png"
            alt=""
          />
          <ul className="hidden gap-5 ml-10 text-lg font-medium text-neutral-200 lg:flex">
            <li className="transition duration-500 ease-in-out hover:text-white hover:scale-105">
              <Link to="/home">Home</Link>
            </li>
            <li className="transition duration-500 ease-in-out hover:text-white hover:scale-105">
              <Link to="/home/characters">Characters</Link>
            </li>
          </ul>
        </div>
        <div className="hidden lg:flex items-center w-full justify-end ">
          {localStorage.getItem("user") ? (
            <button
              onClick={() => handleLogout()}
              className=" bg-white text-sky-600 px-4 py-1 rounded hover:bg-sky-100 transition cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => handleLogin()}
              className="bg-white text-sky-600 px-4 py-1 rounded hover:bg-sky-100 transition cursor-pointer"
            >
              Login
            </button>
          )}
        </div>
        <div
          className={`lg:flex fixed lg:static top-12 right-0 w-full lg:w-auto bg-gradient-to-r from-sky-500 to-sky-600 text-white transition-transform duration-300 ease-in-out lg:bg-transparent lg:translate-x-0 ${
            isOpen ? "translate-x-0" : "translate-x-[-100%]"
          }`}
        >
          <ul className="flex flex-col gap-5 p-5 text-lg lg:hidden lg:flex-row lg:p-0">
            <li>
              <Link to="/home" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/home/characters" onClick={toggleMenu}>
                Characters
              </Link>
            </li>
          </ul>
          <div className="flex flex-col gap-5 pb-5 pl-5 text-lg lg:hidden lg:flex-row lg:p-0">
            {localStorage.getItem("user") ? (
              <button
                onClick={() => handleLogout()}
                className=" bg-white text-sky-600 px-4 py-1 w-30 rounded hover:bg-sky-100 transition cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => handleLogin()}
                className="bg-white text-sky-600 px-4 py-1 w-30 rounded hover:bg-sky-100 transition cursor-pointer"
              >
                Login
              </button>
            )}
          </div>
        </div>
        <div className="lg:hidden">
          {isOpen ? (
            <IoClose className="text-3xl" onClick={toggleMenu} />
          ) : (
            <HiMiniBars3BottomRight className="text-2xl" onClick={toggleMenu} />
          )}
        </div>
      </nav>
    </div>
  );
}

export default Nav;
