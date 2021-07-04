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
import { useParams } from 'react-router-dom';
import { IRouteParams } from '../../App';

interface ICreateClassProps {
  name: string,
  module: string,
  start_date: string,
}

interface IApiModule {
  id: string,
  name: string,
}

interface IClassApi extends Omit<ICreateClassProps, 'module'> {
  module: IApiModule,
}

const CadastrarAula = () => {
  const {id} = useParams<IRouteParams>();

  const {token} = useContext(UserContext);
  const { isDarkMode } = useContext(DarkModeContext);
  const {register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [modules, setModules] = useState<IApiModule[]>();

  useEffect(() => {
    api.get("/modules")
    .then(response => response.data).then((data: IApiModule[]) => {
      setModules(data);
    }).catch(err => toast.error(err.response.data.error));

    if(id) {
      api.get(`/classes/${id}`)
        .then(response => response.data)
        .then((data: IClassApi) => {
          setValue('name', data.name);
          setValue('module', data.module.id)
          console.log(data.start_date);
          setValue('start_date', dayjs(data.start_date).format('YYYY-MM-DD'))
        })
        .catch(err => toast.error(err.response.data.error));
    }
  }, [id, setValue]);

  const onSubmit = ({name, module, start_date}: ICreateClassProps) => {
    const payload = {
      name,
      module,
      start_date: dayjs(start_date).toDate(),
    }

    api({
      method: id ? "put" : "post",
      url: id ? `/classes/${id}/edit` : "/classes/create",
      data: payload,
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
          <input {...register("name", {required: true})} style={{ color: isDarkMode ? "#fff" : "#000" }} className="gradient-border"/>
          {errors.nome && <span className="error">Insira um nome</span>}
        </div>
        <div className="form-group">
          <label htmlFor="modulo-field">Módulo</label>
          <select {...register("module", {required: true})} style={{ color: isDarkMode ? "#fff" : "#000" }} className="gradient-border">
            <option value={''}>Selecione um módulo</option>
            {modules?.map(v => (
              <option value={v.id}>{v.name}</option>
            ))}
          </select>
          {errors.module && <span className="error">Selecione um módulo</span>}
        </div>
        <div className="form-group">
          <label htmlFor="inicio-field">Início</label>
          <input {...register("start_date", {required: true})} type="date" id="inicio-field" style={{ color: isDarkMode ? "#fff" : "#000" }} className="gradient-border"/>
          {errors.inicio && <span className="error">Selecione a data de início</span>}
        </div>
        <Button text="Cadastrar" />
      </form>
    </div>
  );
}

export default CadastrarAula;