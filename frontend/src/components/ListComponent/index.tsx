import React from 'react';
import EditButtons from '../EditButtons';

import './list_component.css';

interface IListComponentProps {
  authenticated: boolean,
  title: string,
  description: string,
  handleDelete: () => void,
  handleEdit: () => void,
}

const ListComponent = ({title, description, authenticated, handleDelete, handleEdit}: IListComponentProps) => (
  <div className="list-component gradient-border">
    <h2>{title}</h2>
    <p>{description}</p>
    {authenticated && <EditButtons handleDelete={handleDelete} handleEdit={handleEdit} />}
  </div>
)

export default ListComponent;