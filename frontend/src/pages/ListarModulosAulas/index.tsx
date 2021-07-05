import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { ApiModule } from "../../@types/Api";
import Card from '../../components/Card';
import UserContext from "../../contexts/UserContext";
import api from "../../services/AuthService";
import './listar-modulos-aulas.css';

const ListarModulosAulas = () => {
  const { token } = useContext(UserContext);

  const [modules, setModules] = useState<ApiModule[]>();

  const history = useHistory();

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

  useEffect(() => {
    api.get("/modules")
      .then(response => response.data)
      .then((data: ApiModule[]) => {
        setModules(data);
      })
      .catch(err => toast.error(err.response.data.error));
  }, [])

  return (
    <div id="listar-modulos-aulas-page">
      <div className="card-group">
        {modules && modules.length > 0 ? modules.map(v => {
          return (
            <Card
              imageUrl=""
              name={v.name}
              description={v.description}
              authenticated={!!token}
              handleEdit={() => handleEdit(v.id)}
              handleDelete={() => handleDelete(v.id)}
              actionUrl={`/${v.id}/listar_aulas`}
              key={v.id}
            />
          )
        }) : <p>Nenhum registro encontrado</p>}
      </div>
    </div>
  );
}

export default ListarModulosAulas;