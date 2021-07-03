import React from 'react';
import './cadastrar_modulo.css';

const CadastrarModulo = () => {
  return (
    <div id="cadastrar-modulo-page">
      <form>
        <h1>Cadastrar módulo</h1>
        <div className="form-group">
          <label htmlFor="nome-field">Nome do módulo</label>
          <input type="text" id="nome-field" className="gradient-border" />
        </div>
        <button className="gradient-border">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastrarModulo;