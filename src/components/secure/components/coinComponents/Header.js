import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Grid from 'material-ui/Grid'
import Graph from './Graph'
import Timeline from './Timeline'

const styles = theme => ({
  root: theme.mixins.gutters({
    //paddingTop: 8,
    //paddingBottom: 8,
    //marginTop: theme.spacing.unit * 2,
  }),
});

function Header(props) {
  const { classes } = props;
  return (
    <div >
      <Card>
        <Grid
        container
        direction={'row'}
        justify={'space-between'}
        alignItems={'center'}>
          <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
            <CardHeader
            title={props.information.name}
            subheader={props.information.symbol}/>
          </Grid>
          <Grid item xs={12} sm={8} md={10} lg={10} xl={10}>
            <Timeline/>
          </Grid>
            <Grid item xs={4}>
              <Typography type="headline" component="h2" align='center'>
                {props.information.price_usd}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography type="headline" component="h2" align='center'>
                {Math.abs(props.information.percent_change_24h * (props.information.price_usd/100))}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography type="headline" component="h2" align='center'>
                {props.information.percent_change_24h}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Graph/>
            </Grid>
        </Grid>
      </Card>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
