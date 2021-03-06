import React from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class Register extends React.Component {
	state = {
		email: '',
		password: '',
		error: null
	};

	handleSubmit(event) {
		event.preventDefault();
		firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
			.catch((error) => {
				this.setState({ error: error });
			});
	}

	onInputChange(name, event) {
		var change = {};
		change[name] = event.target.value;
		this.setState(change);
	}

	render() {
		var errors = this.state.error ? <p> {this.state.error} </p> : '';
		return (
			<div>
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<label>Email <input type='email'
					                    placeholder='Email'
					                    value={this.state.email}
					                    onChange={this.onInputChange.bind(this, 'email')}
					/></label>
					<br/>
					<label>Password <input type='password'
					                       placeholder='Password'
					                       value={this.state.password}
					                       onChange={this.onInputChange.bind(this, 'password')}
					/></label>

					{errors}
					<br/>
					<button type='submit'>Register</button>
				</form>
			</div>
		);
	}
}

export default connect()(withRouter(Register));
