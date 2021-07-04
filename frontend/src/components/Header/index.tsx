import React from 'react';
import "./header.css";
import {FaMoon, FaSun, FaUserAlt, FaSignOutAlt, FaHome} from 'react-icons/fa';
import Logo from '../../assets/logo.svg';
import LogoWhite from '../../assets/logo-white.svg';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import DarkModeContext from '../../contexts/DarkModeContext';
import UserContext from '../../contexts/UserContext';

const Header = () => {
  const history = useHistory();
  const location = useLocation();
  const {token, setToken} = useContext(UserContext);
  const {isDarkMode, toggleDarkMode} = useContext(DarkModeContext);

  const handleSignButton = () => {
    if(!!token) {
      setToken('');
      history.go(0);
    } else {
      history.push("/login");
    }
  }

  return (
    <>
      <nav id="header">
        <img alt="Devaria" src={isDarkMode ? LogoWhite : Logo}/>
        <div className="btn-group">
          {location.pathname !== '/' && (
            <button className="gradient-border" onClick={() => history.push("/")} aria-label="Home">
              <FaHome color="#7EE8FA"/>
            </button>)}
          {location.pathname !== '/login' && (
            <button className="gradient-border" onClick={handleSignButton} aria-label="Login">
            {!!token ? <FaSignOutAlt color="#7EE8FA" /> : <FaUserAlt color="#7EE8FA"/>}
          </button>
          )}
          <button className="gradient-border" onClick={() => toggleDarkMode()} aria-label="Dark mode">
            {isDarkMode ? <FaSun color="#7EE8FA" /> : <FaMoon color="#7EE8FA"/>}
          </button>
        </div>
      </nav>
      {!!token &&  
      <header>
        <Link to="/">Início</Link>
        <Link to="/modulos">Módulos</Link>
        <Link to="/cadastrar_modulo">Cadastrar módulo</Link>
        <Link to="/cadastrar_aula">Cadastrar aula</Link>
      </header>}
    </>
  );
}

export default Header;