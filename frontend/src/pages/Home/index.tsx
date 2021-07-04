import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../../components/Card';
import UserContext from '../../contexts/UserContext';
import api from '../../services/AuthService';
import './home.css';

interface IApiModule {
  id: string,
  name: string,
}

interface IApiClasses {
  id: string,
  name: string,
  module: {
    name: string
  },
  start_date: string,
}

const Home = () => {
  const [modules, setModules] = useState<IApiModule[]>();
  const [classes, setClasses] = useState<IApiClasses[]>();

  const {token} = useContext(UserContext);

  const history = useHistory();

  const getClasses = () => {
    api.get("/classes")
      .then(response => response.data)
      .then((data:IApiClasses[]) => setClasses(data))
      .catch(err => toast.error(err.response.data.error));
  }

  useEffect(() => {
    api.get("/modules")
    .then(response => response.data).then((data: IApiModule[]) => {
      setModules(data);
    }).catch(err => toast.error(err.response.data.error));

    getClasses();
  }, []);

  const handleModuleSelection = (v: React.ChangeEvent<HTMLSelectElement>) => {
    if(v.target.value.length > 0) {
      api.get(`/modules/${v.target.value}/classes`)
      .then(response => response.data)
      .then((data: IApiClasses[]) => setClasses(data))
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
        {classes?.map(v => (
          <Card
            imageUrl="http://via.placeholder.com/500"
            name={v.name}
            start_date={dayjs(v.start_date, "dd/MM/yyyy").toDate()}
            description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium vero recusandae tempora libero error dignissimos est harum, in sunt sapiente aut? Autem excepturi nulla vel sapiente at cupiditate laudantium sit corporis voluptatem dolores, reiciendis suscipit minima? Nihil sed nemo nostrum non error! Iste ipsa eius ullam obcaecati soluta. Laudantium, debitis! Mollitia accusantium ullam quibusdam provident repellat tenetur quaerat eaque laboriosam perferendis soluta, rerum necessitatibus alias doloremque dolor, facere assumenda eligendi consequatur quisquam? Sapiente odit tempora alias id illum ut dolore placeat, nihil esse tenetur eius deleniti! Omnis, blanditiis magni distinctio facilis eos totam ex, molestias quisquam libero vitae, voluptas soluta."}
            handleEdit={() => handleEditClass(v.id)}
            handleDelete={() => handleDeleteClass(v.id)}
            key={v.id}
          />
        ))}
        </div>
    </div>
  );
}

export default Home;