import React, {useState, useEffect, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ApiModule } from '../../@types/Api';
import ListComponent from '../../components/ListComponent';
import UserContext from '../../contexts/UserContext';
import api from '../../services/AuthService';
import './listar_modulos.css';

const ListarModulos = () => {
  const {token} = useContext(UserContext);

  const [modules, setModules] = useState<ApiModule[]>();

  const history = useHistory();

  useEffect(() => {
    api.get("/modules")
      .then(response => response.data)
      .then((data: ApiModule[]) => {
        setModules(data);
      })
      .catch(err => toast.error(err.response.data.error));
  }, []);
  
  const handleEdit = (id: string) => {
    history.push(`/editar_modulo/${id}`);
  }

  const handleDelete = (id: string) => {
    api.delete(`/modules/${id}/delete`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        toast.success(response.data);
        setModules(state => state?.filter(v => v.id !== id));
      })
      .catch(err => toast.error(err.response.data.error))
  }

  return (
    <div id="listar-modulos-page">
      <h1>Listar módulos</h1>
      <div className="modules-list">
        {modules && modules.length > 0 ? modules.map(v => (
          <ListComponent 
            authenticated={!!token} 
            title={v.name}
            description={v.description}
            handleEdit={() => handleEdit(v.id)} 
            handleDelete={() => handleDelete(v.id)}/>
        ))
        : <p>Nenhum registro encontrado</p>}
      </div>
    </div>
  );
}

export default ListarModulos;