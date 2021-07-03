import React from 'react';
import "./header.css";
import {FaMoon, FaSun} from 'react-icons/fa';
import Logo from '../../assets/logo.svg';
import LogoWhite from '../../assets/logo-white.svg';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import DarkModeContext from '../../contexts/dark_mode_context';

const Header = () => {
  const {isDarkMode, toggleDarkMode} = useContext(DarkModeContext);
  return (
    <>
      <nav id="header">
        <img alt="Devaria" src={isDarkMode ? LogoWhite : Logo}/>
        <button className="gradient-border" onClick={() => toggleDarkMode()}>
          {isDarkMode ? <FaSun color="#7EE8FA" /> : <FaMoon color="#7EE8FA"/>}
        </button>
      </nav>  
      <header>
        <Link to="/">Início</Link>
        <Link to="/cadastrar_modulo">Cadastrar módulo</Link>
        <Link to="/cadastrar_aula">Cadastrar aula</Link>
      </header>
    </>
  );
}

export default Header;