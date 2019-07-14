import React from "react";

interface ButtonProps {
  callback?: () => void;
}

const Button: React.FC<ButtonProps> = props => {
  const handleClick = (): void => {
    if (props.callback) props.callback();
  };

  return (
    <button onClick={handleClick} className="button is-primary ripple">
      <span className="has-text-weight-light is-uppercase">
        {props.children}
      </span>
    </button>
  );
};

export default Button;
