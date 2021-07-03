import React from 'react';
import './cadastrar_aula.css';

const CadastrarAula = () => {
  return (
    <div id="cadastrar-aula-page">
    <form>
      <h1>Cadastrar aula</h1>
      <div className="form-group">
        <label htmlFor="nome-field">Nome da aula</label>
        <input type="text" id="nome-field" className="gradient-border" />
      </div>
      <div className="form-group">
        <label htmlFor="modulo-field">Módulo</label>
        <select name="" id="modulo-field" className="gradient-border">
          <option>React</option>
          <option>NodeJS</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="inicio-field">Início</label>
        <input type="date" id="inicio-field" className="gradient-border"/>
      </div>
      <button className="gradient-border">Cadastrar</button>
    </form>
  </div>
  );
}

export default CadastrarAula;