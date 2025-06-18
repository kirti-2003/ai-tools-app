// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ToolList from './components/ToolList';
import Favorites from './components/Favorites';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
  
 const queryClient = new QueryClient(); 
function App() {
  return (
    <QueryClientProvider client={queryClient}>
   <FavoritesProvider>
    <Router>
      <Routes>
        <Route path="/" element={<ToolList />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
    </FavoritesProvider>
    </QueryClientProvider>
  );
}

export default App;
