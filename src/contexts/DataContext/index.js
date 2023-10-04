import PropTypes from "prop-types";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [newData, setNewData] = useState(null);


  const getData = useCallback(async () => {
    try {
      setData(await api.loadData());
    } catch (err) {
      setError(err);
    }
  }, []);
  // 

  // Ajout de la fonction getNewData pour récupérer la dernière prestation
  const getNewData = useCallback(async () => {
    try {
      if (data && data.events && data.events.length > 0) {
        setNewData(data.events[data.events.length - 1]);
      }
    } catch (err) {
      setError(err);
    }
  }, [data]);



  useEffect(() => {
    // L'ordre des appels est important
    getNewData();
    getData();
  }, [getNewData]);

  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        newData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};


DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);


export default DataContext;