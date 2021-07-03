import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Card from '../../components/Card';
import api from '../../services/AuthService';
import './home.css';

interface IApiModule {
  id: string,
  name: string,
}

interface IApiClasses {
  name: string,
  module: {
    name: string
  },
  start_date: string,
}

const Home = () => {
  const [modules, setModules] = useState<IApiModule[]>();
  const [classes, setClasses] = useState<IApiClasses[]>();

  useEffect(() => {
    api.get("/modules")
    .then(response => response.data).then((data: IApiModule[]) => {
      setModules(data);
    }).catch(err => toast.error(err.response.data.error));

    api.get("classes")
      .then(response => response.data)
      .then((data:IApiClasses[]) => {
        setClasses(data);
      })
      .catch(err => toast.error(err.response.data.error));
  }, []);

  return (
    <div id="home-page">
      <div className="form">
        <select>
          <option value=''>Filtrar por módulo</option>
          {modules?.map(v => (
            <option value={v.id}>{v.name}</option>
          ))}
        </select>
      </div>
      <div className="card-group">
        {classes?.map(v => (
          <Card
            imageUrl="http://via.placeholder.com/500"
            name={v.name}
            start_date={dayjs(v.start_date, "dd/MM/yyyy").toDate()}
          />
        ))}
        </div>
    </div>
  );
}

export default Home;