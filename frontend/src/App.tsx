import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { FaCode } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import './App.css';
import GuardedRoute, { IGuardedRouteProps } from './components/GuardedRoute';
import Header from './components/Header';
import Login from './pages/Login';
import Home from './pages/Home';
import FormularioModulo from './pages/FormularioModulo';
import FormularioAula from './pages/FormularioAula';
import DarkModeContext from './contexts/DarkModeContext';
import UserContext from './contexts/UserContext';
import 'react-toastify/dist/ReactToastify.css';
import ListarModulos from './pages/ListarModulos';
import LoadingContext from './contexts/LoadingContext';

export interface IRouteParams {
  id: string;
}

function App() {
  const [isDarkMode, setDarkMode] = useState(true);
  const [isLoading, setLoading] = useState(true);

  const [token, setToken] = useState('');

  useEffect(() => {
    setLoading(true);
    setDarkMode(localStorage.getItem('darkMode') === 'true');
    const storedToken = localStorage.getItem('token');
    setToken(storedToken || '');
    setLoading(false);
  }, [])

  const handleUserLocalStorage = async (newToken: string) => {
    setLoading(true);
    setToken(newToken);
    await localStorage.setItem('token', newToken);
    setLoading(false);
  }

  const handleDarkMode = async () => {
    setDarkMode(state => {
      (async function () {
        await localStorage.setItem('darkMode', (!isDarkMode).toString());
      })();
      return !isDarkMode;
    });;
  }

  const guardedRouteProps: IGuardedRouteProps = {
    isAuthenticated: !!token,
    authenticationPath: "/login"
  }

  const style = {
    backgroundColor: isDarkMode ? "#020716" : "#efefef",
    color: isDarkMode ? "#fff" : "#000",
  }

  if (isLoading) {
    return <div id="loading" aria-label="Loading" style={style}><FaCode size={48} color="#80FF72" /></div>
  }

  return (
    <LoadingContext.Provider value={{isLoading, setLoading}}>
      <UserContext.Provider value={{ token, setToken: handleUserLocalStorage }}>
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode: handleDarkMode }}>
          <BrowserRouter>
            <div className="App" style={style}>
              <ToastContainer />
              <Header />
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <GuardedRoute path="/cadastrar_aula" component={FormularioAula} {...guardedRouteProps} />
                <GuardedRoute path="/editar_aula/:id" component={FormularioAula} {...guardedRouteProps} />
                <GuardedRoute path="/modulos" component={ListarModulos} {...guardedRouteProps} />
                <GuardedRoute path="/cadastrar_modulo" component={FormularioModulo} {...guardedRouteProps} />
                <GuardedRoute path="/editar_modulo/:id" component={FormularioModulo} {...guardedRouteProps} />
              </Switch>
            </div>
          </BrowserRouter>
        </DarkModeContext.Provider>
      </UserContext.Provider>
    </LoadingContext.Provider>
  );
}

export default App;
