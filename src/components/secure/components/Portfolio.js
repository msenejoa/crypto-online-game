import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

import LineChart from './LineChart'
import PieChart from './PieChart'
import EnhancedTable from './UserTable'

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: 0,
    //textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});



const Portfolio = (props) => {
    const { classes } = props;

    console.log(props)
    return (
      <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
               <LineChart/>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <PieChart/>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div>
                <EnhancedTable/>
              </div>

            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper}>xs=6 sm=3</Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper}>xs=6 sm=3</Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper}>xs=6 sm=3</Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper}>xs=6 sm=3</Paper>
            </Grid>
          </Grid>
      </div>
    )
  }

Portfolio.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default connect()(withStyles(styles)(withRouter(Portfolio)));



