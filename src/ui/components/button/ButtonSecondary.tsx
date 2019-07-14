import React from "react";

interface ButtonSecondaryProps {
  callback?: () => void;
}

const ButtonSecondary: React.FC<ButtonSecondaryProps> = props => {
  const handleClick = (): void => {
    if (props.callback) props.callback();
  };

  return (
    <button onClick={handleClick} className="button">
      {props.children && (
        <span className="has-text-weight-light is-uppercase">
          {props.children}
        </span>
      )}
    </button>
  );
};

export default ButtonSecondary;
