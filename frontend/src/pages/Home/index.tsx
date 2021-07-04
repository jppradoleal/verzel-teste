import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ApiClass, ApiModule } from '../../@types/Api';
import Card from '../../components/Card';
import UserContext from '../../contexts/UserContext';
import api from '../../services/AuthService';
import './home.css';

const Home = () => {
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

  useEffect(() => {
    api.get("/modules")
    .then(response => response.data).then((data: ApiModule[]) => {
      setModules(data);
    }).catch(err => toast.error(err.response.data.error));

    getClasses();
  }, []);

  const handleModuleSelection = (v: React.ChangeEvent<HTMLSelectElement>) => {
    if(v.target.value.length > 0) {
      api.get(`/modules/${v.target.value}/classes`)
      .then(response => response.data)
      .then((data: ApiClass[]) => setClasses(data))
      .catch(err => toast.error(err.response.data.error));
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
    <div id="home-page">
      <div className="form">
        <select onChange={handleModuleSelection}>
          <option value=''>Filtrar por módulo</option>
          {modules?.map(v => (
            <option key={v.id} value={v.id}>{v.name}</option>
          ))}
        </select>
      </div>
      <div className="card-group">
        {classes && classes.length > 0 ? classes.map(v => {
          console.log(dayjs(v.start_date));
          return (
          <Card
            imageUrl={v.imageUrl}
            name={v.name}
            start_date={dayjs(v.start_date)}
            description={v.module.description}
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

export default Home;