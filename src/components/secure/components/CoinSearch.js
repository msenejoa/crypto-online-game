import React from 'react';
import {
  FilteringState,
  LocalFiltering,
  SelectionState,
  SortingState,
  LocalSorting,
  DataTypeProvider
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView,
  TableHeaderRow,
  TableFilterRow,
  TableSelection,

} from '@devexpress/dx-react-grid-material-ui';

import {
  generateRows,
  defaultColumnValues
} from './generator';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import purple from 'material-ui/colors/purple';

import GridLoading from 'material-ui/Grid';
import Paper from 'material-ui/Paper';



import { searchCoinId, fetchCoins } from '../../../actions/coins';

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import { push } from 'react-router-redux';


const getRowId = row => (row.id);

const styles = theme => ({
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
});


const PercentTypeProvider = () => (
  <DataTypeProvider
    type='change'
    formatterTemplate={({value })=> (
      <font color={(value>=0)?'green':'red'}> {value}%</font>
    )}
  />
  );


export class CoinSearch extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'symbol', title: 'Symbol'},
        { name: 'price_usd', title: 'Price' },
        { name: 'percent_change_24h', title: '24hr', dataType: 'change'},
        { name: 'market_cap_usd', title: 'Market Cap' },
      ],
      rows: [],
      selection: [],
      coin: '',
      loaded: false,
      coins: []
    };
  }




  componentWillMount(){
    this.props.fetchCoinList();
  }

  componentWillReceiveProps(props){
    if(props.coins.loaded){
      let coins = props.coins.coins;
      coins.forEach((obj) => {
        obj.price_usd = parseFloat(obj.price_usd);
        obj.percent_change_24h = parseFloat(obj.percent_change_24h);
        obj.market_cap_usd = parseFloat(obj.market_cap_usd)
      });
      this.setState({
        loaded: true,
        rows: coins
      })
    }
  }

  onSelection(selection){
    console.log(selection[0])
    if(selection.length > 0){
      this.setState({ selection: [selection[0].id]});
      this.props.searchCoin(selection[0])
      let path = '/dashboard/coin/'  + selection[0].id
      this.props.onRedirect(path);
  }
   // this.onSelection(rows.filter(row => row.id == selection))
  }


  render() {
    const { rows, columns, selection } = this.state;
    //const { classes } = props;
    //console.log(classes)


    return (
    <div>
      { this.state.loaded ?
      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
      >

        <SortingState />
        <LocalSorting />
        <FilteringState defaultFilters={[]} />
        <LocalFiltering />
        <PercentTypeProvider/>
        <TableView />
        <SelectionState
          selection = {[]}
          onSelectionChange={(selection)=> this.onSelection(rows.filter(row => row.id == selection))}
        />
        <TableSelection
          selectByRowClick
          highlightSelected
          showSelectionColumn={false}
          />
        <TableHeaderRow allowSorting/>
        <TableFilterRow />
      </Grid>
         : <div>
          <Paper elevation={4}>

          <GridLoading
            container
            alignItems={'center'}
            direction={'row'}
            justify={'center'}
            >
              <CircularProgress className={{margin: `0 ${1 * 2}px`}} size={50} />
          </GridLoading>
          </Paper>
          </div>
       }
        </div>
    );
  }
}



function mapStateToProps(state){
  return {
    coins: state.coins
  }
}


function mapDispatchToProps(dispatch){
  return {
    searchCoin: (coin) => {
      dispatch(searchCoinId(coin));
    },
    fetchCoinList: () => {
      dispatch(fetchCoins());
    },
    onRedirect: (path) => {
      dispatch(push(path))
    }
  }}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CoinSearch));
