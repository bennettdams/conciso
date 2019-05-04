import * as React from "react";
import { createContext, useState, useMemo, useContext } from "react";

type CountContextValue = {
  count: number;
  setCount: (updater: (count: number) => number) => void;
};

const CountContext = createContext<CountContextValue | undefined>(undefined);

type CountProviderProps = {
  value?: CountContextValue;
  children: React.ReactNode;
};

function CountProvider(props: CountProviderProps) {
  const [count, setCount] = useState(0);
  const value = useMemo(() => {
    return {
      count,
      setCount
    };
  }, [count]);
  return <CountContext.Provider value={value} {...props} />;
}

function useCount() {
  const context = useContext(CountContext);
  if (!context) {
    throw new Error("useCount must be used within a CountProvider");
  }
  const { count, setCount } = context;
  const increment = () => setCount(c => c + 1);
  return {
    count,
    increment
  };
}

export { CountProvider, useCount };
