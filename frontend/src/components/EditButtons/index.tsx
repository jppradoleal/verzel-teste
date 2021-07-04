import React from 'react';
import {FaTrash, FaPencilAlt} from 'react-icons/fa';

import './edit_buttons.css';

interface IEditButtonHandlers {
  handleDelete: () => void,
  handleEdit: () => void,
}

const EditButtons = ({handleDelete, handleEdit}: IEditButtonHandlers) => (
  <div className="btn-group">
    <button className="gradient-border" onClick={handleDelete}><FaTrash color="#80FF72"/></button>
    <button className="gradient-border" onClick={handleEdit}><FaPencilAlt color="#80FF72"/></button>
  </div>
);

export default EditButtons;