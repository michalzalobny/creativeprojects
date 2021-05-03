import React, { createContext, useContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

type ExampleContextTypes = {
  testValue: number;
  setTestValue: React.Dispatch<React.SetStateAction<number>>;
};

const ExampleContext = createContext<ExampleContextTypes | undefined>(
  undefined,
);

export const ExampleContextProvider = React.memo<Props>(props => {
  const { children } = props;

  const [testValue, setTestValue] = useState(0);

  return (
    <ExampleContext.Provider
      value={{
        testValue,
        setTestValue,
      }}
    >
      {children}
    </ExampleContext.Provider>
  );
});

export const useExampleContext = () => {
  const ctx = useContext(ExampleContext);
  if (ctx === undefined) {
    throw new Error(
      'useExampleContext must be used within a ExampleContextProvider',
    );
  }
  return ctx;
};

ExampleContext.displayName = 'ExampleContext';
ExampleContextProvider.displayName = 'ExampleContextProvider';
