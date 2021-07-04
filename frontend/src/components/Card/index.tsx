import dayjs from 'dayjs';
import React from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import './card.css';

interface IProps {
  imageUrl: string,
  name: string,
  start_date: Date,
  description: string,
  handleDelete: () => void,
  handleEdit: () => void,
}

const Card = ({imageUrl, name, start_date, description, handleDelete, handleEdit}: IProps) => {
  const strDate = dayjs(start_date).format('MMM d, YYYY');
  return (
    <div className="card">
      <div style={{background: `url('${imageUrl}')`}} className="header-image"/>
      <h2 className="title">{name}</h2>
      <h3 className="date">Início: {strDate}</h3>
      <p className="description">{description.split(" ").splice(0, 50).join(" ")}</p>
      <div className="btn-group">
        <button className="gradient-border" onClick={handleDelete}><FaTrash color="#80FF72"/></button>
        <button className="gradient-border" onClick={handleEdit}><FaPencilAlt color="#80FF72"/></button>
      </div>
    </div>
  );
}

export default Card;