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
import FollowButton from './../user/FollowButton'

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
	contrastText: {
		color: theme.palette.primary.contrastText
	}
}))

export default function Profile({ match }) {
	const classes = useStyles()
	// const [user, setUser] = useState({})
	const [values, setValues] = useState({
		user: {
			following: [],
			followers: []
		},
		redirecttoSignin: false,
		following: false
	})
	// const [redirectToSignin, setRedirectToSignin] = useState(false)
	const jwt = auth.isAuthenticated()

	useEffect(() => {
		const abortController = new AbortController()
		const signal = abortController.signal

		read(
			{ userId: match.params.userId },
			{ t: jwt.token },
			signal
		).then(data => {
			if (data && data.error) {
				setValues(...values, { redirecToSignin: true })
			} else {
				const following = checkFollow(data)
				setValues({ ...values, user: data, following: following })
			}
		})

		return function cleanup() {
			abortController.abort()
		}
	}, [match.params.userId])

	const clickFollowButton = callApi => {
		callApi(
			{ userId: jwt.user._id },
			{ t: jwt.token },
			values.user._id
		).then(data => {
			if (data.error) {
				setValues({ ...values, error: data.error })
			} else {
				setValues({ ...values, user: data, following: !values.following })
			}
		})
	}

	const checkFollow = user => {
		const match = user.followers.some(follower => {
			return follower._id == jwt.user._id
		})
		return match
	}

	const photoUrl = values.user._id ?
		`/api/users/photo/${values.user._id}?${new Date().getTime()}` :
		'/api/users/defaultphoto'

	if (values.redirectToSignin) {
		return <Redirect to='/signin' />
	} else {
		return (
			<Paper className={classes.root} elevation={4}>
				<Typography
					variant='h6'
					className={classes.title}>
						Profile
				</Typography>
				<List dense>
					<ListItem>
						<ListItemAvatar>
							<Avatar src={photoUrl}/>
						</ListItemAvatar>
						<ListItemText
							primary={values.user.name}
							secondary={values.user.email}
							className={classes.userInfo}
						/>
						<ListItemText
							primary={values.user.about}
							className={classes.about}
						/>
						{ auth.isAuthenticated().user && auth.isAuthenticated().user._id === values.user._id ?
							(<ListItemSecondaryAction>
								<Link to={'/user/edit/' + values.user._id}>
									<IconButton arial-label='Edit' color='primary'>
										<Edit className={classes.contrastText} />
									</IconButton>
								</Link>
								<DeleteUser userId={values.user._id}/>
							</ListItemSecondaryAction>)
							:
							(
								<FollowButton
									following={values.following}
									onButtonClick={clickFollowButton}
								/>
							)
						}
					</ListItem>
					<Divider />
					<ListItem>
						<ListItemText primary={'Joined: ' + (new Date(values.user.created)).toDateString()} className={classes.contrastText}/>
					</ListItem>
				</List>
			</Paper>
		)
	}
}
