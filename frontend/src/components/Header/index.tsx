import React from 'react';
import "./header.css";
import {FaMoon} from 'react-icons/fa';
import Logo from '../../assets/logo.svg';

const Header = () => {
  return (
    <nav id="header">
      <img alt="Devaria" src={Logo}/>
      <button className="gradient-border">
        <FaMoon color="#7EE8FA"/>
      </button>
    </nav>
  );
}

export default Header;