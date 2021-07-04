import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IRouteParams } from '../../App';
import Button from '../../components/Button';
import DarkModeContext from '../../contexts/DarkModeContext';
import UserContext from '../../contexts/UserContext';
import api from '../../services/AuthService';
import './cadastrar_modulo.css';

interface IModuleFormData {
  nome: string,
}

interface IModuleApi {
  name: string,
}

const CadastrarModulo = () => {
  const {id} = useParams<IRouteParams>();

  const {isDarkMode} = useContext(DarkModeContext);
  const {token} = useContext(UserContext);
  const {register, handleSubmit, reset, setValue} = useForm();
  const [error, setError] = useState('');

  useEffect(() => {
    if(id) {
      api.get(`/modules/${id}`)
        .then(response => response.data)
        .then(({name}: IModuleApi) => {
          setValue('nome', name)
        })
        .catch(err => toast.error(err.response.data.error));
    }
  }, [id, setValue]);

  const onSubmit = ({nome}:IModuleFormData) => {
    if(nome) {
      api.post(
        !id ?
        "/modules/create"
        : `/modules/${id}/edit`, 
        {
          name: nome
        }, 
        {
          headers: {
            authorization: `Bearer: ${token}`
        }
      }).then(response => {
        setError('');
        reset();
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