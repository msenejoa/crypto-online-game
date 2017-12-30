import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Demo from './Demo'

class History extends React.Component {

  render() {
    return (
      <div>
        <Demo />
        <br/>
      </div>
    )
  }
}

export default withRouter(connect(state=>({
  user: state.auth.user
}))(History));
