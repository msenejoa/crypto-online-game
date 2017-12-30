import React from 'react';
import {
  SortingState,
  LocalSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';

import {
  generateRows,
  employeeTaskValues,
} from './../generator';

import firebase from 'firebase'
import moment from 'moment'

const priorityWeights = {
  Low: 0,
  Normal: 1,
  High: 2,
};

import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';


const comparePriority = (a, b) => {
  const priorityA = priorityWeights[a];
  const priorityB = priorityWeights[b];
  if (priorityA === priorityB) {
    return 0;
  }
  return (priorityA < priorityB) ? -1 : 1;
};

const getColumnCompare = columnName =>
  (columnName === 'priority' ? comparePriority : undefined);

class Transactions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'transactionType', title: 'Order', width: 60},
        { name: 'time', title: 'Date' },
        { name: 'quantity', title: 'Quantity', width: 60},
        { name: 'price', title: 'Price' },
        { name: 'total', title: 'Total'}

      ],
      rows: [],
      transaction: [],
      transactionLoaded: false,
      id: '',
      coinLoaded: false,

    };
  }
  componentWillReceiveProps(nextProps){
    //load coin id
    if (nextProps.coin.loaded & !this.state.loaded){
      this.setState({ id: nextProps.coin.coin[0].id, coinLoaded: true})
    }
    //load transactions
    if(nextProps.coin.loaded & this.state.coinLoaded & !this.state.transactionLoaded){
      firebase.auth().onAuthStateChanged( (user) =>{
        if(user){
          let uid = firebase.auth().currentUser.uid;
          let ref = firebase.database().ref('users/');
          let uidRef = ref.child(uid)
          let infoRef = uidRef.child('transactions/')
          infoRef.on('value', (snapshot) => {
            let values = Object.values(snapshot.val())
            values.forEach((e, i)=>{
              values[i].total = (e.quantity * e.price).toFixed(2);
              values[i].time = moment(e.time).format('YYYY/MM/DD')
            })
            this.setState({
              rows: (values.filter((el)=> el.id == this.state.id)),
              transactionLoaded: true
            })
          })
          }
      })
    }
  }

  componentWillMount(){

    }


  render() {
    const { rows, columns } = this.state;
    console.log(this.state)

    return (
      <div>
      <Grid
        rows={rows}
        columns={columns}
      >

        <SortingState />
        <LocalSorting
          getColumnCompare={getColumnCompare}
        />
        <TableView />
        <TableHeaderRow allowSorting />
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




export default withRouter(connect(mapStateToProps, null)(Transactions));


