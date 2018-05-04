import MenuIcon from 'material-ui-icons/Menu';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import {withStyles, withTheme} from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import * as React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../Logo/Logo';

const styles = (theme: any) => ({
  header: {
    marginBottom: theme.spacing.unit,
  },
  link: {
    color: theme.palette.primary.contrastText,
    fontSize: theme.typography.fontSize,
    textDecoration: 'none',
  },
  title: {
    marginLeft: theme.spacing.unit * 2,
  },
});

const Header = (props?: any) => {
  const {classes} = props;

  return (
    <AppBar position='static' className={classes.header}>
      <Toolbar className='header__toolbar'>
        <IconButton color='inherit' aria-label='Menu'>
          <MenuIcon/>
        </IconButton>
        <Logo/>
        <Typography className={classes.title} variant='title' color='inherit'>
          Title
        </Typography>
        <Typography className={classes.title} variant='title'>
          <Link className={classes.link} to='/fixtures/premier-league'>Fixtures</Link>
        </Typography>
        <Typography className={classes.title} variant='title'>
          <Link className={classes.link} to='/results/premier-league'>Results</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(withTheme()(Header));
