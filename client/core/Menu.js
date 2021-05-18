import { IconButton } from '@material-ui/core'
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import auth from './../auth/auth-helper'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import HomeIcon from '@material-ui/icons/Home'
import { makeStyles } from '@material-ui/core/styles'

import theme from './../theme'

const isActive = (history, path) => {
	if (history.location.pathname == path) { return { color: theme.palette.secondary.main } } else { return { color: '#ffffff' } }
}

const useStyles = makeStyles({
	container: {
		display: 'flex',
		justifyContent: 'space-between'
	}
})

const Menu = withRouter(({ history }) => {
	const classes = useStyles()
	return (
		<AppBar position='static'>
			<ToolBar className={classes.container}>
				<Link to='/'>
					<IconButton arial-label='Home' style={isActive(history, '/')}>
						<HomeIcon/>
					</IconButton>
				</Link>
				<Typography variant='h6' color='inherit'>
					MERN skeleton
				</Typography>
				<div>
					<Link to='/users'>
						<Button style={isActive(history, '/users')}>Users</Button>
					</Link>
					{!auth.isAuthenticated() && (<span>
						<Link to='/signup'>
							<Button style={isActive(history, '/signup')}>Sign Up</Button>
						</Link>
						<Link to='/signin'>
							<Button style={isActive(history, '/signin')}>Sign In</Button>
						</Link>
					</span>)}
					{auth.isAuthenticated() && (<span>
						<Link to={'/user/' + auth.isAuthenticated().user._id}>
							<Button style={isActive(history, '/user' + auth.isAuthenticated().user._id)}>
					My Profile
							</Button>
						</Link>
						<Button color='inherit' onClick={() => {
							auth.clearJwt(() => history.push('/'))
						}}> Sign Out </Button>
					</span>)}
				</div>
			</ToolBar>
		</AppBar>
	)
})

export default Menu
