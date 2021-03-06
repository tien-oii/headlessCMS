import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import LayersIcon from '@material-ui/icons/Layers';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    minHeight: 20,
    margin: 'auto'
  },
  link: {
    marginRight: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  primaryAction: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  menuButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  iconWrapper: {
    minWidth: 40,
  },
  icon: {
    color: theme.palette.text.hint
  },
  drawerContainer: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(3),
    width: 300,
  }
}));

export default function Navigation(props) {
  const classes = useStyles();

  const content = {
    'primary-action': '',
    'color': '#000',
    'backgroundColor': '',
    ...props.content
  };

  const [state, setState] = React.useState({ open: false });

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, open });
  };

  return (
    <AppBar position="static" color="inherit" style={{'backgroundColor':content.backgroundColor}}>
      <Toolbar className={classes.toolbar}>
        {content.nav &&
          content.nav.map((item, i) => <Link key={i} href={item.link||'#'} color="background.emphasis" variant="body2" className={classes.link}>{item.name}</Link> ) 
        }        
        {content['primary-action'] &&
          <Button variant="contained" color="secondary" className={classes.primaryAction}>{content['primary-action']}</Button>
        }
        <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton} onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
      
      <Drawer anchor="left" open={state.open} onClose={toggleDrawer(false)}>
        <div className={classes.drawerContainer}>
          <List>
            {content.nav && 
              content.nav.map((item, i) => {
                <ListItem button key={item.name}>
                  <ListItemIcon className={classes.iconWrapper}>
                    <LayersIcon className={classes.icon} />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              })
            }
          </List>
          <Box mt={1} ml={2} pt={3} border={1} borderBottom={0} borderLeft={0} borderRight={0} borderColor="background.emphasis">
            <Button variant="contained" color="secondary" fullWidth>{content['primary-action']}</Button>
          </Box>
        </div>
      </Drawer>
    </AppBar>
  );
}