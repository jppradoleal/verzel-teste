import React from 'react';
import { Link } from 'react-router-dom';
import { Dayjs } from 'dayjs';
import EditButtons from '../EditButtons';
import './card.css';

interface IProps {
  imageUrl: string,
  name: string,
  start_date?: Dayjs,
  description: string,
  authenticated: boolean,
  actionUrl?: string,
  handleDelete: () => void,
  handleEdit: () => void,
}

const Card = ({imageUrl, name, start_date, description, authenticated, actionUrl, handleDelete, handleEdit}: IProps) => {
  const strDate = start_date?.format('MMM DD, YYYY');
  return (
    <div className="card">
      <div style={{backgroundImage: `url('${imageUrl || "/placeholder.svg"}')`}} className="header-image"/>
      <h2 className="title">{name}</h2>
      { strDate && <h3 className="date">Início: {strDate}</h3>}
      <p className="description">{description?.split(" ").splice(0, 50).join(" ")}</p>
      <div className="footer">
        {actionUrl && <Link to={actionUrl} className="actionButton">Ver mais...</Link>}
        {authenticated && <EditButtons handleDelete={handleDelete} handleEdit={handleEdit}/>}
      </div>
    </div>
  );
}

export default Card;