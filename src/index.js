import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
//import { Router, IndexRoute, browserHistory } from 'react-router';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import { requireAuth } from './utils/secure';

import thunk from "redux-thunk";

import reducer from './reducers'
import App from './components/App'
import Home from './components/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Logout from './components/auth/Logout'
import Dashboard from './components/secure/Dashboard'
import Profile from './components/secure/Profile'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
//import createHistory from 'history/createHashHistory';
import history from './history'
import logger from 'redux-logger'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';


//noinspection JSUnresolvedVariable
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
	composeEnhancers(applyMiddleware(logger, thunk, routerMiddleware(history)))
);

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
});


ReactDOM.render(
	<Provider store={store}>
  <MuiThemeProvider theme ={theme}>
		<ConnectedRouter history={history}>
			<Route path="/" component ={App}/>
		</ConnectedRouter>
  </MuiThemeProvider>
	</Provider>,
	document.getElementById('root')
);
