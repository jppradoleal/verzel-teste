import React, { useContext, useState, useEffect} from 'react';
import Button from '../../components/Button';
import DarkModeContext from '../../contexts/DarkModeContext';
import './cadastrar_aula.css';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import api from '../../services/ApiService';
import UserContext from '../../contexts/UserContext';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { ApiClass, ApiModule, IRouteParams } from '../../@types/Api';

interface IClassWithFile extends Omit<ApiClass, 'module'> {
  thumbnail: FileList,
  module: string
}

const FormularioAula = () => {
  const {id} = useParams<IRouteParams>();

  const {token} = useContext(UserContext);
  const { isDarkMode } = useContext(DarkModeContext);

  const {register, handleSubmit, setValue, reset, formState: { errors, isDirty } } = useForm();

  const [modules, setModules] = useState<ApiModule[]>();

  useEffect(() => {
    (async function() {
      try {
        const modules = (await api.get("/modules")).data;
        setModules(modules);

        if(id) {
          const classe: ApiClass = (await api.get(`/classes/${id}`)).data;
          setValue('name', classe.name);
          setValue('module', classe.module.id)
          setValue('description', classe.description)
          setValue('start_date', dayjs(classe.start_date).format('YYYY-MM-DD'));
        }
      } catch (err) {
        toast.error(err.response.data.error)
      }
    })();
  }, [id, setValue]);

  const onSubmit = ({name, description, module: apiModule, start_date, thumbnail}: IClassWithFile) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description)
    formData.append('module', apiModule);
    formData.append('start_date', dayjs(start_date).toString());
    formData.append('thumbnail', thumbnail.item(0) as Blob);
    
    console.log(formData.values);
    api({
      method: id ? "put" : "post",
      url: id ? `/classes/${id}/edit` : "/classes/create",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer: ${token}`
      }
    }).then(response => {
      reset();
      toast.success(id ? "Class updated" : response.statusText)
    })
    .catch(err => toast.error(err.response.data.error));
  };

  return (
    <div id="cadastrar-aula-page">
      <h1>{id ? "Atualizar aula" : "Cadastrar aula"}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="nome-field">Nome da aula</label>
          <input 
            {...register("name", {required: true})} 
            style={{ color: isDarkMode ? "#fff" : "#000" }} 
            className="gradient-border"/>
          {errors.nome && <span className="error">Insira um nome</span>}
        </div>
        <div className="form-group">
          <label htmlFor="description-field">Descrição</label>
          <input 
            {...register("description", {required: true})} 
            style={{ color: isDarkMode ? "#fff" : "#000" }} 
            className="gradient-border"/>
          {errors.nome && <span className="error">Insira uma descrição</span>}
        </div>
        <div className="form-group">
          <label htmlFor="modulo-field">Módulo</label>
          <select 
            {...register("module", {required: true})} 
            style={{ color: isDarkMode ? "#fff" : "#000" }} 
            className="gradient-border">
            <option value={''}>Selecione um módulo</option>
            {modules?.map(v => (
              <option value={v.id} key={v.id}>{v.name}</option>
            ))}
          </select>
          {errors.module && <span className="error">Selecione um módulo</span>}
        </div>
        <div className="form-group">
          <label htmlFor="inicio-field">Início</label>
          <input 
            {...register("start_date", {required: true})} 
            type="date" 
            id="inicio-field" 
            style={{ color: isDarkMode ? "#fff" : "#000" }} 
            className="gradient-border"/>
          {errors.inicio && <span className="error">Selecione a data de início</span>}
        </div>
        <div className="form-group file-input">
            <label htmlFor="thumbnail-field">Thumbnail</label>
            <input
              {...register("thumbnail")}
              type="file"
              multiple={false}
              id="thumbnail-field"
              style={{color: isDarkMode ? "#fff" : "#000"}}
              className="gradient-border" />
          </div>
        <Button text={id ? "Atualizar" : "Cadastrar"} disabled={!isDirty} style={{color: isDarkMode ? "#fff" : "#000"}} />
      </form>
    </div>
  );
}

export default FormularioAula;