import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import CoinSearch from './CoinSearch'

class Search extends React.Component {

  render() {
    return (
      <div>
        <CoinSearch/>
        <br/>
      </div>
    )
  }
}

export default withRouter(connect(state=>({
  user: state.auth.user
}))(Search));
