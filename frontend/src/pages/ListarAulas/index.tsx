import React, { useEffect, useState, useContext } from 'react';
import dayjs from 'dayjs';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ApiClass, ApiModule, IRouteParams } from '../../@types/Api';
import Card from '../../components/Card';
import UserContext from '../../contexts/UserContext';
import api from '../../services/ApiService';
import './listar_aulas.css';

const ListarAulas = () => {
  const {id} = useParams<IRouteParams>();

  const [modules, setModules] = useState<ApiModule[]>();
  const [classes, setClasses] = useState<ApiClass[]>();

  const {token} = useContext(UserContext);

  const history = useHistory();

  const getClasses = () => {
    api.get("/classes")
      .then(response => response.data)
      .then((data:ApiClass[]) => setClasses(data))
      .catch(err => toast.error(err.response.data.error));
  }

  const getSpecificModule = (id: string) => {
    api.get(`/modules/${id}/classes`)
      .then(response => response.data)
      .then((data: ApiClass[]) => setClasses(data))
      .catch(err => toast.error(err.response.data.error));
  }

  useEffect(() => {
    if(id) {
      getSpecificModule(id);
    } else {
      api.get("/modules")
      .then(response => response.data).then((data: ApiModule[]) => {
        setModules(data);
      }).catch(err => toast.error(err.response.data.error));
      
      getClasses();
    }
  }, [id]);

  const handleModuleSelection = (v: React.ChangeEvent<HTMLSelectElement>) => {
    const value = v.target.value;
    if(value.length > 0) {
      getSpecificModule(value);
    } else {
      getClasses();
    }
  }

  const handleDeleteClass = (id:string) => {
    api.delete(`/classes/${id}/delete`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(response => toast.success(response.data))
      .catch(err => toast.error(err.response.data.error));
    setClasses(state => state?.filter(v => v.id !== id));
  }

  const handleEditClass = (id:string) => history.push(`/editar_aula/${id}`);

  return (
    <div id="listar-aulas-page">
      {id && <button className="gradient-border go-back-btn" onClick={() => history.goBack()} aria-label="Voltar"><FaArrowCircleLeft color="#80FF72" /></button>}
      <div className="form">
        {!id && <select onChange={handleModuleSelection}>
          <option value=''>Filtrar por módulo</option>
          {modules?.map(v => (
            <option key={v.id} value={v.id}>{v.name}</option>
          ))}
        </select>}
      </div>
      <div className="card-group">
        {classes && classes.length > 0 ? classes.map(v => {
          return (
          <Card
            imageUrl={v.imageUrl}
            name={v.name}
            start_date={dayjs(v.start_date)}
            description={v.description}
            authenticated={!!token}
            handleEdit={() => handleEditClass(v.id)}
            handleDelete={() => handleDeleteClass(v.id)}
            key={v.id}
          />
        )}) : <p>Nenhum registro encontrado</p>}
        </div>
    </div>
  );
}

export default ListarAulas;