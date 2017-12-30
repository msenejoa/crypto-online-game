import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import InboxIcon from 'material-ui-icons/Inbox';
import AssessmentIcon from 'material-ui-icons/Assessment';
import DraftsIcon from 'material-ui-icons/Drafts';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
});

const Sidebar = (props, {match}) => {
  const classes = props.classes;

  return (
    <div className={classes.root}>
      <List>
        {props.routes.map((route, index) => (
          <Link
          to={route.path}
          key={index}
          onClick={() => props.click()}>
          <ListItem key={index} button>
            <ListItemIcon>
              <div>{route.icon}</div>
            </ListItemIcon>
          <ListItemText primary={route.title} />

          </ListItem>
          </Link>
          ))
        }
      </List>
      <Divider />
      <List>
      <Link to ='/dashboard/profile'>
        <ListItem button>
          <ListItemText primary="Profile" />
        </ListItem>
      </Link>
      <Link to ='/logout'>
        <ListItem button>
          <ListItemText primary="Logout" />
        </ListItem>
      </Link>
      </List>
    </div>
  );
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(connect()(withStyles(styles)(Sidebar)));
