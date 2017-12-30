import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import Sidebar from './Sidebar';
import AssessmentIcon from 'material-ui-icons/Assessment';
import SearchIcon from 'material-ui-icons/Search';
import HistoryIcon from 'material-ui-icons/History';
import LeaderboardIcon from 'material-ui-icons/FormatListNumbered';
import StarsIcon from 'material-ui-icons/Stars';


import { Router, Route, Link, Switch, withRouter } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';
import history from './../../history';

import Logout from './../auth/Logout';

//import { mailFolderListItems, otherMailFolderListItems } from './tileData';

import Portfolio from './components/Portfolio';
import Profile from './Profile';
import History from './components/History';
import Search from './components/Search';
import Leaderboard from './components/Leaderboard';
import Coin from './components/Coin';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    //marginTop: theme.spacing.unit * 1,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'fixed',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    background: 'black',
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100%',
    },
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
});

const routes = [
  { path: '/dashboard/portfolio',
    sidebar: () => <div>Portfolio</div>,
    main: () => <Portfolio/>,
    icon: <AssessmentIcon/>,
    title: 'Portfolio',
  },
  { path: '/dashboard/search',
    sidebar: () => <div>Search</div>,
    main: () => <Search/>,
    icon: <SearchIcon/>,
    title: 'Search'
  },
  { path: '/dashboard/coin/:name',
    main: () => <Coin />,
    icon: <StarsIcon/>,
    title: 'Coin',
    sidebar: () => <div>Coin</div>,
    },
  { path: '/dashboard/history',
    sidebar: () => <div>History</div>,
    main: () => <History/>,
    icon: <HistoryIcon/>,
    title: 'History',
  },
  { path: '/dashboard/leaderboard',
    main: () => <Leaderboard />,
    icon: <LeaderboardIcon/>,
    title: 'Leaderboard',
    sidebar: () => <div>Leaderboard</div>,
    },
]

class Frame extends React.Component {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes } = this.props;

    const drawer = (
      <div>
        <div className={classes.drawerHeader} />
        <Sidebar routes={routes} click = {this.handleDrawerToggle} />
        <Divider />
        <Divider />

      </div>
    );

    return (
      <div>
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="contrast"
                aria-label="open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide}
              >
                <MenuIcon />
              </IconButton>

                    <Switch>
                      {routes.map((route, index) => (
                        <Route
                          key={index}
                          path={route.path}
                          exact={route.exact}
                          component={route.sidebar}
                          />
                        ))}
                      </Switch>

            </Toolbar>
          </AppBar>
          <Hidden mdUp>
            <Drawer
              type="temporary"
              open={this.state.mobileOpen}
              classes={{
                paper: classes.drawerPaper,
              }}
              onRequestClose={this.handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}

              </Drawer >

          </Hidden>
          <Hidden mdDown implementation="css">
            <Drawer
              type="permanent"
              open
              classes={{
                paper: classes.drawerPaper,
              }}
            >

              {drawer}
            </Drawer>
          </Hidden>
          <main className={classes.content}>


                    <Switch>
                      {routes.map((route, index) => (
                        <Route
                          key={index}
                          path={route.path}
                          exact={route.exact}
                          component={route.main}
                          />
                        ))}
                      <Route path='/dashboard/profile' component={Profile}/>
                      </Switch>

          </main>
        </div>
      </div>

      </div>
    );
  }
}

Frame.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(connect()(withStyles(styles)(Frame)));
