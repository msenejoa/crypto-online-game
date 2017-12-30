import React  from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router-dom';


class Logout extends React.Component {
	componentDidMount() {
		console.log(this.props)
		firebase.auth().signOut();
		this.props.onRedirect('/');
	}

	render() {
		return null;
	}
}

function mapDispatchToProps(dispatch){
	return{
		onRedirect: (path) => {
			dispatch(push(path));
		}
	};
}


export default withRouter(connect(null, mapDispatchToProps)(Logout));
