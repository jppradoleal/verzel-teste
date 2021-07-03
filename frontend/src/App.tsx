import React from 'react';
import './App.css';
import Header from './components/Header';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import CadastrarModulo from './pages/CadastrarModulo';
import CadastrarAula from './pages/CadastrarAula';
import DarkModeContext from './contexts/DarkModeContext';
import { useState } from 'react';
import GuardedRoute, { IGuardedRouteProps } from './components/GuardedRoute';
import UserContext from './contexts/UserContext';
import { useEffect } from 'react';



function App() {
  const [isDarkMode, setDarkMode] = useState(false);

  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken || '');
  }, [])

  const handleUserLocalStorage = async (newToken: string) => {
    setToken(newToken);
    await localStorage.setItem('token', newToken);
  }

  const guardedRouteProps:IGuardedRouteProps = {
    isAuthenticated: !!token,
    authenticationPath: "/login"
  }

  const style = {
    backgroundColor: isDarkMode ? "#020716": "#efefef",
    color: isDarkMode ? "#fff" : "#000",
  }

  return (
    <UserContext.Provider value={{token, setToken: handleUserLocalStorage}}>
      <DarkModeContext.Provider value={{isDarkMode, toggleDarkMode: () => setDarkMode(!isDarkMode)}}>
        <BrowserRouter>
          <div className="App" style={style}>
            <Header/>
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/login" component={Login}/>
              <GuardedRoute path="/cadastrar_modulo" component={CadastrarModulo} {...guardedRouteProps}/>
              <GuardedRoute path="/cadastrar_aula" component={CadastrarAula} {...guardedRouteProps} />
            </Switch>
          </div>
        </BrowserRouter>
      </DarkModeContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
