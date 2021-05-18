import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './core/Home'
import UserList from './user/UserList'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import Menu from './core/Menu'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	MainRouter: {
		backgroundColor: theme.palette.primary.light,
		height: '100%'
	}
}))

const MainRouter = () => {
	const classes = useStyles()
	return (
		<div className={classes.MainRouter}>
			<Menu />
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route path='/users' component={UserList}/>
				<Route path='/signup' component={Signup}/>
				<Route path='/signin' component={Signin}/>
				<PrivateRoute path='/user/edit/:userId' component={EditProfile}/>
				<Route path='/user/:userId' component={Profile}/>
			</Switch>
		</div>
	)
}

export default MainRouter
