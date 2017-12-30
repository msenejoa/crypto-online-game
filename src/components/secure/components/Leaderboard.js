import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import UserTable from './UserTable'

class Leaderboard extends React.Component {

  render() {
    return (
      <div>
        <UserTable />
        <br/>
      </div>
    )
  }
}

export default withRouter(connect(state=>({
  user: state.auth.user
}))(Leaderboard));
