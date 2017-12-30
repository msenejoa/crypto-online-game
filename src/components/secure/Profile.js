import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { requireAuth } from './../../utils/secure';


class Profile extends React.Component {

	  componentWillMount() {
  	let secure = requireAuth(this.props)
  	secure(this.props.history)

    }

	render() {
		return (
			<div>
				<h1>Profile</h1>
				You are {this.props.user.email}
				<br/>
				<Link to='/dashboard'>Dashboard</Link>
			</div>
		)
	}
}

export default withRouter(connect(state=>({
	user: state.auth.user
}))(Profile));
