import React, { useContext } from 'react';
import DarkModeContext from '../../contexts/DarkModeContext';

interface IProps {
  text: string,
}

const Button = ({text}: IProps) => {
  const {isDarkMode} = useContext(DarkModeContext);
  return (
    <button className="gradient-border" style={{color: isDarkMode ? "#fff" : "#000"}} type="submit">{text}</button>
  );
}

export default Button;
