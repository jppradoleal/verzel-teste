import React from 'react';
import tutorialImage from '../../assets/login.svg';
import './login.css';

const Login = () => {
  return (
    <div id="login-page">
      <img alt="Pessoa assistindo tutorial online" className="login-image" src={tutorialImage}/>

      <form id="login-form">
        <div className="form-group">
          <label htmlFor="email-field" >Email</label>
          <input id="email-field" name="email" className="gradient-border" />
        </div>
        <div className="form-group">
          <label htmlFor="senha-field">Senha</label>
          <input name="senha" type="password" id="senha-field" className="gradient-border"/>
        </div>
        <button className="gradient-border submit-button">Acessar</button>
      </form>
    </div>
  );
}

export default Login;