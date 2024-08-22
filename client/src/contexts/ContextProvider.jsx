import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const StateContext = createContext();

const initialState = {
  visible: false,
  isLoading: false,
  showNew: false,
  reloadfetch: false,
  authenticated: false,
};

export const ContextProvider = ({ children }) => {
  const [visible, setVisible] = useState(initialState.visible);
  const [isLoading, setIsLoading] = useState(initialState.isLoading);
  const [showNew, setShowNew] = useState(initialState.showNew);
  const [reloadfetch, setReloadfetch] = useState(initialState.reloadfetch);
  const [isAuthenticated, setIsAuthenticated] = useState(initialState.authenticated);
  const [selectedRoute, setSelectedRoute] = useState({});
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
        reloadfetch,
        setReloadfetch,
        showNew,
        setShowNew,
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
        selectedRoute,
        setSelectedRoute
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useStateContext = () => useContext(StateContext);
