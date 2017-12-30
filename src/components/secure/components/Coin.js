import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

import { fetchCoin } from '../../../actions/coin';

import Header from './coinComponents/Header'
import Transaction from './coinComponents/Price'

import Transact from './coinComponents/Transact'
import Graph from './coinComponents/Graph'


class Coin extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      symbol:'',
      mkt_cap: 0,
      percent_change_1h: 0,
      percent_change_24h:0,
      percent_change_7d: 0,
      rank: 0,
      price_usd: 0,
      price_btc: 0
    };
  }

  componentWillMount(){
    this.props.getCoin(this.props.match.params.name)
  }

  componentWillReceiveProps(nextprops){
    if(nextprops.coin.loaded){
      let coin = nextprops.coin.coin[0];
      this.setState({
        name: coin.name,
        symbol: coin.symbol,
        mkt_cap: parseFloat(coin.market_cap_usd),
        percent_change_1h: parseFloat(coin.percent_change_1h),
        percent_change_24h:parseFloat(coin.percent_change_24h),
        percent_change_7d: parseFloat(coin.percent_change_7d),
        rank: parseInt(coin.rank),
        price_usd: parseFloat(coin.price_usd),
        price_btc: parseFloat(coin.price_btc)
      })
    }
  }

  render() {
    //const { classes} = this.props;
    return (
      <div>
        <Grid container className={'flexGrow:1'}>
            <Grid item xs={12}>
                  <Grid container justify={'space-between'}>
                    <Grid item xs={11} sm={12} md={12} lg={12}>
                      <Header information = {this.state}/>
                    </Grid>
                    <Grid item xs={11} sm={4} md={4} lg={4}>
                      <Transact/>
                    </Grid>
                    <Grid item xs={11} sm={8} md={8} lg={8}>
                      <Transaction information = {this.state}/>
                    </Grid>
                  </Grid>
            </Grid>
          </Grid>
      </div>
    )
  }
}



function mapStateToProps(state){
  return {
    coin: state.coin
  }
}


function mapDispatchToProps(dispatch){
  return {
    getCoin: (coin) => {
      dispatch(fetchCoin(coin));
    },
  }}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Coin));

