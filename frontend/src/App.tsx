import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import GuardedRoute, { IGuardedRouteProps } from './components/GuardedRoute';
import Header from './components/Header';
import Login from './pages/Login';
import Home from './pages/Home';
import CadastrarModulo from './pages/CadastrarModulo';
import CadastrarAula from './pages/CadastrarAula';
import DarkModeContext from './contexts/DarkModeContext';
import UserContext from './contexts/UserContext';
import 'react-toastify/dist/ReactToastify.css';

export interface IRouteParams {
  id: string;
}

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
            <ToastContainer />
            <Header/>
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/login" component={Login}/>
              <GuardedRoute path="/cadastrar_modulo" component={CadastrarModulo} {...guardedRouteProps}/>
              <GuardedRoute path="/cadastrar_aula" component={CadastrarAula} {...guardedRouteProps} />
              <GuardedRoute path="/editar_modulo/:id" component={CadastrarModulo} {...guardedRouteProps} />
              <GuardedRoute path="/editar_aula/:id" component={CadastrarAula} {...guardedRouteProps} />
            </Switch>
          </div>
        </BrowserRouter>
      </DarkModeContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
