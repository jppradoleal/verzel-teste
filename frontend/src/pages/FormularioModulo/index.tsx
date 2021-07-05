import React, {useState, useEffect, useContext} from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ApiModule, IRouteParams } from '../../@types/Api';
import Button from '../../components/Button';
import DarkModeContext from '../../contexts/DarkModeContext';
import UserContext from '../../contexts/UserContext';
import api from '../../services/ApiService';
import './cadastrar_modulo.css';

const FormularioModulo = () => {
  const { id } = useParams<IRouteParams>();

  const { isDarkMode } = useContext(DarkModeContext);
  const { token } = useContext(UserContext);

  const { register, handleSubmit, reset, setValue, formState: { isDirty } } = useForm();

  const [error, setError] = useState('');

  const history = useHistory();

  useEffect(() => {
    if (id) {
      api.get(`/modules/${id}`)
        .then(response => response.data)
        .then(({ name, description }: ApiModule) => {
          setValue('name', name);
          setValue('description', description);
        })
        .catch(err => toast.error(err.response.data.error));
    }
  }, [id, setValue]);

  const onSubmit = ({ name, description }: ApiModule) => {
    api({
      method: id ? "put" : "post",
      url: id ? `/modules/${id}/edit` : "/modules/create",
      data: { name, description },
      headers: {
        authorization: `Bearer: ${token}`
      }
    }).then(response => {
      setError('');
      reset();
      toast.success(id ? "Module updated" : response.statusText);
      history.push("/");
    }).catch(err => toast.error(err.response.data.error, { role: "" }));
  }

  return (
    <div id="cadastrar-modulo-page">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Cadastrar módulo</h1>
        <div className="form-group">
          <label htmlFor="nome-field">Nome do módulo</label>
          <input {...register("name")} id="nome-field" style={{ color: isDarkMode ? "#fff" : "#000" }} className="gradient-border" />
        </div>
        <div className="form-group">
          <label htmlFor="description-field">Descrição</label>
          <textarea {...register("description")} id="description-field" style={{ color: isDarkMode ? "#fff" : "#000" }} className="gradient-border" rows={5} />
        </div>
        {error ?? ''}
        <Button text={id ? "Atualizar" : "Cadastrar"} disabled={!isDirty} style={{color: isDarkMode ? "#fff" : "#000"}} />
      </form>
    </div>
  );
}

export default FormularioModulo;