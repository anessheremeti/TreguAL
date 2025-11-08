import pageLogo from "../../assets/8df3bd592c22da650b58b166b08590f8ca1cbb49.png";
import burger from "../../assets/Frame 1.png";
import React from "react";

const Navbar = () => {
  return (
    <div className="menu_and_items flex items-center justify-between p-8">
      <img src={pageLogo} />
      <ul className="flex text-white gap-[15px]">
        <li>Home</li>
        <li>E-shop</li>
        <li>Rreth Nesh</li>
        <li>Blog</li>
      </ul>
      <div className="icons">
        <img src={burger} alt="burger" />
      </div>
    </div>
  );
};
export default Navbar;
