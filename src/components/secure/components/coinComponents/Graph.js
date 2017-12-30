import React from 'react';
import {Line} from 'react-chartjs-2';
import Grid from 'material-ui/Grid';
import moment from 'moment';
import Card, { CardActions, CardContent } from 'material-ui/Card';


import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

const options = {
  maintainAspectRatio: false,
  legend: {display: false},
  scales: {
    xAxes: [{
      type: 'time',
      time: {
        displayFormats: {
           'millisecond': 'MMM DD',
           'second': 'MMM DD',
           'minute': 'MMM DD',
           'hour': 'MMM DD',
           'day': 'MMM DD',
           'week': 'MMM DD',
           'month': 'MMM DD',
           'quarter': 'MMM DD',
           'year': 'MMM DD',
        }
      }
    }]
  }
}

class Graph extends React.Component{
  state = {
    loaded: false,
    graphData: [],
    data: {
      labels: [],
      datasets: [
        {
          label: 'Price',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: []
        }
      ]
    }
  }


  componentWillReceiveProps(nextProps){
    if (nextProps.coin.graphLoaded & !this.state.loaded){
      let newData = nextProps.coin.graphData;
      let newerData =[];
      newData.forEach( (e, i) => {
        let num = moment.unix(e.time)
        newerData.push({ x: num, y: e.close })
      })
      let dataset = this.state.data;
      dataset.datasets[0].data = newerData
      dataset.labels = newerData
      this.setState({ data: dataset, loaded: true})
    }
    if (!nextProps.coin.graphLoaded & this.state.loaded){
      this.setState({ loaded: false })
    }
  }

  render() {
    return (
      <div style={{paddingLeft: 14, paddingRight: 8, paddingBottom: 8}}>
        <Line data={this.state.data} height={250} options={options}/>

      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    coin: state.coin
  }
}



export default withRouter(connect(mapStateToProps, null)(Graph));

