// Header.jsx

import React from 'react';
import headerLogo from "../image/header__logo.svg";

function Header() {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={headerLogo}
        alt="логотип"/>
    </header>
  );
}

export default Header;