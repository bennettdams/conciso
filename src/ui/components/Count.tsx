import React from "react";
import { useCount } from "../../data/context/count-context";

const Count: React.FC = () => {
  const { count, increment } = useCount();
  return (
    <div className="count">
      <div>{`The current title is ${count}`}</div>
      <button onClick={increment}>Increment count</button>
    </div>
  );
};

export default Count;
