import React from 'react';
import "./header.css";
import {FaMoon, FaSun, FaUserAlt, FaSignOutAlt} from 'react-icons/fa';
import Logo from '../../assets/logo.svg';
import LogoWhite from '../../assets/logo-white.svg';
import { Link, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import DarkModeContext from '../../contexts/DarkModeContext';
import UserContext from '../../contexts/UserContext';

interface IProps {
  isAuthenticated: boolean
}

const Header = () => {
  const router = useHistory();
  const {token, setToken} = useContext(UserContext);
  const {isDarkMode, toggleDarkMode} = useContext(DarkModeContext);

  const handleSignButton = () => {
    if(!!token) {
      setToken('');
      router.go(0);
    } else {
      router.push("/login");
    }
  }

  return (
    <>
      <nav id="header">
        <img alt="Devaria" src={isDarkMode ? LogoWhite : Logo}/>
        <div className="btn-group">
          <button className="gradient-border" onClick={handleSignButton} aria-label="Login">
            {!!token ? <FaSignOutAlt color="#7EE8FA" /> : <FaUserAlt color="#7EE8FA"/>}
          </button>
          <button className="gradient-border" onClick={() => toggleDarkMode()} aria-label="Dark mode">
            {isDarkMode ? <FaSun color="#7EE8FA" /> : <FaMoon color="#7EE8FA"/>}
          </button>
        </div>
      </nav>
      {!!token &&  
      <header>
        <Link to="/">Início</Link>
        <Link to="/cadastrar_modulo">Cadastrar módulo</Link>
        <Link to="/cadastrar_aula">Cadastrar aula</Link>
      </header>}
    </>
  );
}

export default Header;