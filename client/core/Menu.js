import { IconButton } from '@material-ui/core'
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import auth from './../auth/auth-helper'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import agoraIcon from './../assets/images/agora.svg'
import theme from './../theme'
import AgoraIcon from './AgoraIcon'
import { Drawer, List, ListItem } from '@material-ui/core'
import { useState } from 'react'

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		justifyContent: 'space-between'
	},
  appName: {
    fontFamily: 'Berkshire Swash',
    fontSize: '2.5rem'
  },
  drawer: {
    '& .MuiDrawer-paper': {
      backgroundColor: theme.palette.primary.dark
    }
  },
  button: {
    color: theme.palette.primary.contrastText
  }
}))

const Menu = withRouter(({ history }) => {
  const [drawerState, setDrawerState] = useState(false)
  const toggleDrawer = open => event => {
    setDrawerState(open)
  }
	const classes = useStyles()
  const isActive = (history, path) => {
    if (history.location.pathname == path) {
      return { color: theme.palette.secondary.main } 
    } else {
      return { color: '#ffffff' }
    }
  }
	return (
		<AppBar position='static'>
			<ToolBar className={classes.container}>
				<Typography variant='h6' color='inherit' className={classes.appName}>
					Agora
				</Typography>
                
        <Button onClick={toggleDrawer(true)}><AgoraIcon /></Button>
				<Drawer
          className={classes.drawer}
          anchor='right'
          open={drawerState}
          onClose={toggleDrawer(false)}        
        >
          <List>
            <ListItem>
              <Link to='/'>
                <Button
                  onClick={toggleDrawer(false)}
                  arial-label='Home'
                  style={isActive(history, '/')}>
                  
                  {auth.isAuthenticated() ? 'Feed' : 'Home'}
                
                </Button>
              </Link>
            </ListItem>
              {auth.isAuthenticated() && (
                <ListItem>
                    <Link to='/users'>
                      <Button
                        onClick={toggleDrawer(false)}
                        style={isActive(history, '/users')}>
                          
                          Philosophers
                          
                      </Button>
                    </Link>
                </ListItem>
              )}
              {!auth.isAuthenticated() && (
                <ListItem>
                  <Link to='/signup'>
                    <Button
                      onClick={toggleDrawer(false)}
                      style={isActive(history, '/signup')}>
                        
                        Sign Up
                        
                    </Button>
                  </Link>
                </ListItem>
              )}
              {!auth.isAuthenticated() && (
                <ListItem>
                  <Link to='/signin'>
                    <Button
                      onClick={toggleDrawer(false)}
                      style={isActive(history, '/signin')}>
                        
                        Log In
                        
                    </Button>
                  </Link>
                </ListItem>
              )}
              {auth.isAuthenticated() && (
                <ListItem>
                  <Link to={'/user/' + auth.isAuthenticated().user._id}>
                    <Button
                      onClick={toggleDrawer(false)}
                      style={isActive(history, '/user' + auth.isAuthenticated().user._id)}>
                      
                      My Profile

                    </Button>
                  </Link>
                </ListItem>
              )}              
              {auth.isAuthenticated() && (
                <ListItem>
                  <Button
                    className={classes.button}
                    onClick={() => {
                      auth.clearJwt(() => {
                        toggleDrawer(false)
                        return history.push('/')})
                    }}>
                      
                      Sign Out
                      
                  </Button>
                </ListItem>
              )}
          </List>
				</Drawer>
			</ToolBar>
		</AppBar>
	)
})

export default Menu
