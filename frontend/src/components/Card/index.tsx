import { Dayjs } from 'dayjs';
import React from 'react';
import EditButtons from '../EditButtons';
import './card.css';

interface IProps {
  imageUrl: string,
  name: string,
  start_date: Dayjs,
  description: string,
  authenticated: boolean,
  handleDelete: () => void,
  handleEdit: () => void,
}

const Card = ({imageUrl, name, start_date, description, authenticated, handleDelete, handleEdit}: IProps) => {
  const strDate = start_date.format('MMM DD, YYYY');
  return (
    <div className="card">
      <div style={{backgroundImage: `url('${imageUrl}')`}} className="header-image"/>
      <h2 className="title">{name}</h2>
      <h3 className="date">Início: {strDate}</h3>
      <p className="description">{description?.split(" ").splice(0, 50).join(" ")}</p>
      {authenticated && <EditButtons handleDelete={handleDelete} handleEdit={handleEdit}/>}
    </div>
  );
}

export default Card;