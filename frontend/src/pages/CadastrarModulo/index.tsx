import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Button from '../../components/Button';
import DarkModeContext from '../../contexts/DarkModeContext';
import UserContext from '../../contexts/UserContext';
import api from '../../services/AuthService';
import './cadastrar_modulo.css';

interface IModuleFormData {
  nome: string,
}

const CadastrarModulo = () => {
  const {isDarkMode} = useContext(DarkModeContext);
  const {token} = useContext(UserContext);
  const {register, handleSubmit} = useForm();
  const [error, setError] = useState('');

  const onSubmit = ({nome}:IModuleFormData) => {
    if(nome) {
      api.post(
        "/modules/create", 
        {
          name: nome
        }, 
        {
          headers: {
            authorization: `Bearer: ${token}`
        }
      }).then(response => {
        setError('');
        toast.success(response.statusText);
      }).catch(err => toast.error(err.response.data.error, {role: ""}));
    }
  }
  
  return (
    <div id="cadastrar-modulo-page">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Cadastrar módulo</h1>
        <div className="form-group">
          <label htmlFor="nome-field">Nome do módulo</label>
          <input {...register("nome")} id="nome-field" style={{color: isDarkMode ? "#fff" : "#000"}} className="gradient-border" />
        </div>
        {error ?? ''}
        <Button text="Cadastrar" />
      </form>
    </div>
  );
}

export default CadastrarModulo;