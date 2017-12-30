import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { requireAuth } from './../../utils/secure';

import Frame from './Frame';
import Portfolio from './components/Portfolio';

class Dashboard extends React.Component {


  componentWillMount() {
  	let secure = requireAuth(this.props)
  	secure(this.props.history)

    }

	render() {





		return (
			<div>

			<Frame/>

			</div>
		)
	}
}

export default connect()(withRouter(Dashboard));
