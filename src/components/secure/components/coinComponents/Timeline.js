import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Grid from 'material-ui/Grid'

import { fetchGraphData } from '../../../../actions/coin';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'



function TabContainer(props) {
  return <div style={{ padding: 8 * 3 }}>{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    //flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    position: 'fixed',
    background: 'black',
  },
});

class Timeline extends React.Component {
  state = {
    value: 'day',
    loaded: false
  };

  componentWillReceiveProps(newProps){
    if (newProps.coin.loaded & !this.state.loaded) {
    let sym = newProps.coin.coin[0].symbol
    let time = this.state.value
    this.props.setTimeline(sym, time)
    this.setState({ loaded: true })
  }
  }

  handleChange = (event, value) => {
    this.setState({ value });
    let sym = this.props.coin.coin[0].symbol
    console.log(value)
    //let sym = 'BTC'
    this.props.setTimeline(sym, value)
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div>
        <Grid container
        direction={'row'}
        justify={'flex-start'}
        alignItems={'flex-start'}>
          <Grid item xs={12} xl={12}>
            <Tabs value={value} onChange={this.handleChange} textColor='accent' fullWidth  >
              <Tab value="hour" label="Hour"/>
              <Tab value='day' label="Day" />
              <Tab value='week' label="Week" />
              <Tab value ='month' label="Month" />
              <Tab value ='year' label="Year" />
            </Tabs>
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    coin: state.coin
  }
}

function mapDispatchToProps(dispatch){
  return {
    setTimeline: (sym, time) => {
      dispatch(fetchGraphData(sym, time));
    },
  }}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Timeline));
