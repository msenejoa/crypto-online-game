import React from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { login, logout, resetNext } from '../actions/auth';
import history from '../history.js';

//import history from 'history';


import { push } from 'react-router-redux';
import { Route, Switch, withRouter } from 'react-router-dom'

import Home from './Home'
import Login from './auth/Login'
import Register from './auth/Register'
import Logout from './auth/Logout'
import Dashboard from './secure/Dashboard'
import Profile from './secure/Profile'


class App extends React.Component {
	state = {
		loaded: false
	};

	styles = {
		app: {
			fontFamily: [
				'HelveticaNeue-Light',
				'Helvetica Neue Light',
				'Helvetica Neue',
				'Helvetica',
				'Arial',
				'Lucida Grande',
				'sans-serif'
			],
			fontWeight: 200
		}
	};

	componentWillMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.props.onLogin(user);
				this.props.onRedirect(this.props.next || '/dashboard');
				this.props.onResetNext();
			} else {
				if (this.props.user) {
					this.props.onRedirect('/');
					this.props.onResetNext();
				} else {
					this.props.onLogout();
				}
			}
			if (!this.state.loaded) {
				this.setState({ loaded: true });
			}
		});
	}

	render() {
		return (
			<div style={ this.styles.app }>
				{ this.state.loaded ?
				<div>

					<Switch>
						<Route exact path='/' component={Home}/>
						<Route path='/login' component={Login}/>
						<Route path='/register' component={Register}/>
						<Route path='/logout' component={Logout}/>
						<Route path='/dashboard' component={Dashboard}/>
				</Switch>
			</div>
				 : null}
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		next: state.auth.next,
		user: state.auth.user
	}
}

function mapDispatchToProps(dispatch){
	return {
		onLogin: user => {
			dispatch(login(user));
		},
		onLogout: () => {
			dispatch(logout());
		},
		onRedirect: (path) => {
			dispatch(push(path));
		},
		onResetNext: () => {
			dispatch(resetNext());
		}
	}}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
