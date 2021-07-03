import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../components/Button';
import DarkModeContext from '../../contexts/DarkModeContext';
import './cadastrar_modulo.css';

const CadastrarModulo = () => {
  const {isDarkMode} = useContext(DarkModeContext);
  const {register, handleSubmit} = useForm();
  
  const onSubmit = (data: FormData) => {
    console.log(JSON.stringify(data));
  }
  
  return (
    <div id="cadastrar-modulo-page">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Cadastrar módulo</h1>
        <div className="form-group">
          <label htmlFor="nome-field">Nome do módulo</label>
          <input {...register("nome")} id="nome-field" style={{color: isDarkMode ? "#fff" : "#000"}} className="gradient-border" />
        </div>
        <Button text="Cadastrar" />
      </form>
    </div>
  );
}

export default CadastrarModulo;