import React from 'react';
import { useContext } from 'react';
import Button from '../../components/Button';
import DarkModeContext from '../../contexts/DarkModeContext';
import './cadastrar_aula.css';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import api from '../../services/AuthService';
import UserContext from '../../contexts/UserContext';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useEffect } from 'react';

interface ICreateClassProps {
  nome: string,
  modulo: string,
  inicio: string,
}

interface IApiModule {
  id: string,
  name: string,
}

const CadastrarAula = () => {
  const {token} = useContext(UserContext);
  const { isDarkMode } = useContext(DarkModeContext);
  const {register, handleSubmit, formState: { errors } } = useForm();
  const [modules, setModules] = useState<IApiModule[]>();

  useEffect(() => {
    api.get("/modules")
    .then(response => response.data).then((data: IApiModule[]) => {
      setModules(data);
    }).catch(err => toast.error(err.response.data.error));
  }, [])

  const onSubmit = ({nome, modulo, inicio}: ICreateClassProps) => {
    const payload = {
      name: nome,
      module: modulo,
      start_date: dayjs(inicio).toDate(),
    }

    api.post("/classes/create", payload, {
      headers: {
        authorization: `Bearer: ${token}`
      }
    }).then(response => toast(response.statusText))
    .catch(err => toast.error(err.response.data.error));
  };

  return (
    <div id="cadastrar-aula-page">
      <h1>Cadastrar aula</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="nome-field">Nome da aula</label>
          <input {...register("nome", {required: true})} style={{ color: isDarkMode ? "#fff" : "#000" }} className="gradient-border"/>
          {errors.nome && <span className="error">Insira um nome</span>}
        </div>
        <div className="form-group">
          <label htmlFor="modulo-field">Módulo</label>
          <select {...register("modulo", {required: true})} style={{ color: isDarkMode ? "#fff" : "#000" }} className="gradient-border">
            <option value={''}>Selecione um módulo</option>
            {modules?.map(v => (
              <option value={v.id}>{v.name}</option>
            ))}
          </select>
          {errors.module && <span className="error">Selecione um módulo</span>}
        </div>
        <div className="form-group">
          <label htmlFor="inicio-field">Início</label>
          <input {...register("inicio", {required: true})} type="date" id="inicio-field" style={{ color: isDarkMode ? "#fff" : "#000" }} className="gradient-border"/>
          {errors.inicio && <span className="error">Selecione a data de início</span>}
        </div>
        <Button text="Cadastrar" />
      </form>
    </div>
  );
}

export default CadastrarAula;