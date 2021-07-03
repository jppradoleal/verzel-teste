import React from 'react';
import './App.css';
import Header from './components/Header';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import CadastrarModulo from './pages/CadastrarModulo';
import CadastrarAula from './pages/CadastrarAula';
import DarkModeContext from './contexts/dark_mode_context';
import { useState } from 'react';

function App() {
  const [isDarkMode, setDarkMode] = useState(false);

  const style = {
    backgroundColor: isDarkMode ? "#020716": "#efefef",
    color: isDarkMode ? "#fff" : "#000",
  }

  return (
    <DarkModeContext.Provider value={{isDarkMode, toggleDarkMode: () => setDarkMode(!isDarkMode)}}>
      <BrowserRouter>
        <div className="App" style={style}>
          <Header/>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/cadastrar_modulo" component={CadastrarModulo}/>
            <Route path="/cadastrar_aula" component={CadastrarAula}/>
          </Switch>
        </div>
      </BrowserRouter>
    </DarkModeContext.Provider>
  );
}

export default App;
