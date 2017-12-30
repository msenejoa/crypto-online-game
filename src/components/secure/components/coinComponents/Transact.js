import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
//import Input, { InputLabel } from 'material-ui/Input';
import TextField from 'material-ui/TextField';

import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';

//import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';


const styles = {
  card: {
    minWidth: 100,
    maxWidth: 200
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 10,
    fontSize: 14,
    //color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 10,
    //color: theme.palette.text.secondary,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    //margin: theme.spacing.unit,
    minWidth: 100,
  },
  selectEmpty: {
    //marginTop: theme.spacing.unit * 2,
  },
};

class Transact extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      loaded: false,
      price: 0,
      amount: null,
      total: 0,
      name: '',
      symbol: '',
      id: '',
      time: 0,
      transactionType: 'buy'
    };
  }

  componentWillReceiveProps(newProps){
    if (newProps.coin.loaded & !this.state.loaded){
      this.setState({
        price: parseFloat(newProps.coin.coin[0].price_usd),
        symbol: newProps.coin.coin[0].symbol,
        name: newProps.coin.coin[0].name,
        id: newProps.coin.coin[0].id,
        loaded: true
      })
    }
  }


  handleChange = name => event =>{
    this.setState({
      [name]: event.target.value
    });
  }


  confirmTransaction(){
    firebase.auth().onAuthStateChanged( (user) =>{
      if(user){
        let uid = firebase.auth().currentUser.uid;
        let ref = firebase.database().ref('users/');
        let uidRef = ref.child(uid)
        let infoRef = uidRef.child('transactions/').push();
        infoRef.set({
          price: this.state.price,
          name: this.state.name,
          symbol: this.state.symbol,
          id: this.state.id,
          quantity: this.state.amount,
          time: Date.now(),
          transactionType: this.state.transactionType
        }).then(()=> this.setState({ amount: 0}))
      }
    }
      )
    }

    transactionType(value){
      this.setState({
        transactionType: value
      })
    }


    handleChange = prop => event => {
      this.setState({ [prop]: event.target.value });
    };


  render(){
    const { classes } = styles;
    const bull = <span className={styles.bullet}>•</span>;
    let totalAmount = parseFloat(this.state.amount * this.state.price).toFixed(2);
    console.log(this.state)
    let buyRaised = (this.state.transactionType == 'buy')? true: false
    let sellRaised = (this.state.transactionType == 'sell')? true: false
    let amount = this.state.amount

    return (

    <div>
        <Card className={styles.card}>
          <CardContent>
      <Button className='primary' raised={buyRaised} onClick={()=> this.transactionType('buy')}>
        buy
      </Button>
      <Button raised={sellRaised} onClick={()=> this.transactionType('sell')}>
        sell
      </Button>


      <br/>
      <br/>
        <FormControl>
          <InputLabel htmlFor="weight">Amount</InputLabel>

          <Input
            id="amount"
            type='number'
            value={amount}
            onChange={this.handleChange('amount')}
            placeholder='0'
            endAdornment={<InputAdornment position="end">{this.state.symbol}</InputAdornment>}
          />


        </FormControl>
        <br/>
        <br/>

                    <Typography type='body1' className={styles.title}>
                      Price per token: <br/>{this.state.price}
                    </Typography>


            <Typography type="body1" className={styles.title}>
              Total
            </Typography>

            <Typography type="headline" component="h3">
              ${totalAmount}
            </Typography>

          </CardContent>

          <CardActions>
              <Button raised color='primary' onClick={()=>this.confirmTransaction()}>
                ok
              </Button>
          </CardActions>

        </Card>
    </div>
  );
}}






function mapStateToProps(state){
  return {
    coin: state.coin,
    auth: state.auth
  }
}




export default withRouter(connect(mapStateToProps, null)(Transact));


