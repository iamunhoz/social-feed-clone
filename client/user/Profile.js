import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Edit from '@material-ui/icons/Edit'
import Divider from '@material-ui/core/Divider'
import DeleteUser from './DeleteUser'
import auth from './../auth/auth-helper'
import { read } from './api-user'
import { Redirect, Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
	root: theme.mixins.gutters({
		maxWidth: 600,
		margin: 'auto',
		padding: theme.spacing(3),
		marginTop: theme.spacing(5),
		backgroundColor: theme.palette.primary.main
	}),
	title: {
		marginTop: theme.spacing(3),
		color: theme.palette.protectedTitle
	},
	about: {
		fontStyle: 'italic',
		color: theme.palette.primary.contrastText
	},
	userInfo: {
		maxWidth: '110px',
		color: theme.palette.primary.contrastText
	},
	joined: {
		color: theme.palette.primary.contrastText
	}
}))

export default function Profile({ match }) {
	const classes = useStyles()
	const [user, setUser] = useState({})
	const [redirectToSignin, setRedirectToSignin] = useState(false)
	const jwt = auth.isAuthenticated()

	useEffect(() => {
		const abortController = new AbortController()
		const signal = abortController.signal

		read({
			userId: match.params.userId
		}, { t: jwt.token }, signal).then((data) => {
			if (data && data.error) {
				setRedirectToSignin(true)
			} else {
				setUser(data)
			}
		})

		return function cleanup() {
			abortController.abort()
		}
	}, [match.params.userId])

	const photoUrl = user._id ?
		`/api/users/photo/${user._id}?${new Date().getTime()}` :
		'/api/users/defaultphoto'

	if (redirectToSignin) {
		return <Redirect to='/signin' />
	} else {
		return (
			<Paper className={classes.root} elevation={4}>
				<Typography variant='h6' className={classes.title}>
					Profile
				</Typography>
				<List dense>
					<ListItem>
						<ListItemAvatar>
							<Avatar src={photoUrl}/>
						</ListItemAvatar>
						<ListItemText primary={user.name} secondary={user.email} className={classes.userInfo} />
						<ListItemText primary={user.about} className={classes.about} />
						{ auth.isAuthenticated().user && auth.isAuthenticated().user._id === user._id &&
							(<ListItemSecondaryAction>
								<Link to={'/user/edit/' + user._id}>
									<IconButton arial-label='Edit' color='primary'>
										<Edit />
									</IconButton>
								</Link>
								<DeleteUser userId={user._id}/>
							</ListItemSecondaryAction>)
						}
					</ListItem>
					<Divider />
					<ListItem>
						<ListItemText primary={'Joined: ' + (new Date(user.created)).toDateString()} className={classes.joined}/>
					</ListItem>
				</List>
			</Paper>
		)
	}
}
