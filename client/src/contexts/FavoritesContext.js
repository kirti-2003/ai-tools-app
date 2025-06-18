// === START OF FILE: src/contexts/FavoritesContext.js ===
import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext(undefined);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (toolId) => {
    setFavorites(prev => prev.includes(toolId) ? prev : [...prev, toolId]);
  };

  const removeFavorite = (toolId) => {
    setFavorites(prev => prev.filter(id => id !== toolId));
  };

  const isFavorite = (toolId) => {
    return favorites.includes(toolId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context; 
};
