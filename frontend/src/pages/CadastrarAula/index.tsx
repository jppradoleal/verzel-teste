import React from 'react';
import { useContext } from 'react';
import Button from '../../components/Button';
import DarkModeContext from '../../contexts/DarkModeContext';
import './cadastrar_aula.css';
import { useForm } from 'react-hook-form';

const CadastrarAula = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const {register, handleSubmit, } = useForm();

  const onSubmit = (data: FormData) => {
    console.log(JSON.stringify(data));
  };

  return (
    <div id="cadastrar-aula-page">
      <h1>Cadastrar aula</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="nome-field">Nome da aula</label>
          <input {...register("nome")} style={{ color: isDarkMode ? "#fff" : "#000" }} className="gradient-border"/>
        </div>
        <div className="form-group">
          <label htmlFor="modulo-field">Módulo</label>
          <select {...register("modulo")} style={{ color: isDarkMode ? "#fff" : "#000" }} className="gradient-border">
            <option>React</option>
            <option>NodeJS</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="inicio-field">Início</label>
          <input {...register("inicio")} type="date" id="inicio-field" style={{ color: isDarkMode ? "#fff" : "#000" }} className="gradient-border"/> 
        </div>
        <Button text="Cadastrar" />
      </form>
    </div>
  );
}

export default CadastrarAula;