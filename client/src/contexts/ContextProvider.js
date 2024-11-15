import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const initialState = {
  visible: false,
  isLoading: false,
};

export const ContextProvider = ({ children }) => {
  const [visible, setVisible] = useState(initialState.visible);
  const [isLoading, setIsLoading] = useState(initialState.isLoading);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [routeData, setRouteData] = useState({});
  const [dropdowns, setDropdowns] = useState({
    favorites: false,
    users: false,
    pages: false,
    permissions: false,
    application: false,
  });

  return (
    <StateContext.Provider
      value={{
        dropdowns,
        setDropdowns,
        routeData,
        setRouteData,
        isAuthenticated,
        setIsAuthenticated,
        isLoading, 
        setIsLoading, 
        visible,
        setVisible,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
