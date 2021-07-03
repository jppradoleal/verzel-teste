import dayjs from 'dayjs';
import React from 'react';
import './card.css';

interface IProps {
  imageUrl: string,
  name: string,
  start_date: Date,
}

const Card = ({imageUrl, name, start_date}: IProps) => {
  const strDate = dayjs(start_date).format('MMM d, YYYY');
  return (
    <div className="card">
      <div style={{background: `url('${imageUrl}')`}} className="header-image"/>
      <h2 className="title">{name}</h2>
      <h3 className="date">Início: {strDate}</h3>
      <p className="description">Lorem ipsum dolor, sit amet consectetur 
        adipisicing elit. A aliquam quo natus 
        repellendus at, impedit optio dolorem 
        suscipit deleniti eum eius praesentium
        neque, enim alias pariatur? Ullam 
        temporibus labore, voluptatibus ea 
        soluta earum velit! Vero soluta 
        architecto quaerat possimus ipsam totam
        ea dolor, facilis error pariatur consequatur
        quas voluptatem voluptatibus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, adipisci. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel velit tempore ex animi voluptatem ea repudiandae consequatur rem! Officia adipisci explicabo ratione repellat cupiditate repellendus dolorum tenetur aliquid odit culpa animi, sit id at, vel labore vitae quia! Aspernatur tempore eligendi reprehenderit omnis mollitia, ad numquam. Provident error voluptatem soluta consectetur nulla animi minus beatae repellendus. Ratione blanditiis iure consequuntur ut deleniti quidem rem expedita, corrupti repellendus voluptate odit id nostrum velit quasi accusantium fugit commodi voluptatum quaerat sit temporibus? Velit quidem sint neque error ratione ad, excepturi repellat laudantium! Suscipit ullam velit omnis necessitatibus officiis. Suscipit quidem molestias magnam.</p>
    </div>
  );
}

export default Card;