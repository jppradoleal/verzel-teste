import React, { useState } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import tutorialImage from '../../assets/login.svg';
import Button from '../../components/Button';
import UserContext from '../../contexts/UserContext';
import api from '../../services/AuthService';
import './login.css';

const Login = () => {
  const {setToken} = useContext(UserContext);
  const [error, setError] = useState("");
  const router = useHistory();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: FormData) => {
    api.post("/login", data)
      .then(response => response.data)
      .then(data => {
        setToken(data);
        router.push('/');
      })
      .catch(err => setError(err.response.data.error));
  }

  return (
    <div id="login-page" onSubmit={handleSubmit(onSubmit)}>
      <img alt="Pessoa assistindo tutorial online" className="login-image" src={tutorialImage} />

      <form id="login-form">
        <div className="form-group">
          <label htmlFor="email-field" >Email</label>
          <input {...register("email")} id="email-field" className="gradient-border" />
        </div>
        <div className="form-group">
          <label htmlFor="senha-field">Senha</label>
          <input {...register("password")} type="password" id="senha-field" className="gradient-border" />
        </div>
        {error.length > 0 ? error : ''}
        <Button text="Acessar" />
      </form>
    </div>
  );
}

export default Login;