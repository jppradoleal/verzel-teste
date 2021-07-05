import React from 'react';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  text: string,
}

const Button = ({text, ...rest}: IProps) => {
  return (
    <button className="gradient-border" type="submit" {...rest}>{text}</button>
  );
}

export default Button;
