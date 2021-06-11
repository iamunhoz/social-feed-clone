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
import ArrowForward from '@material-ui/icons/ArrowForward'
import Person from '@material-ui/icons/Person'
import { Link } from 'react-router-dom'
import { list } from './api-user.js'

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.primary.main,
		width: '50%',
		margin: '50px auto',
		padding: '25px 0',
    
	},
	title: {
		color: theme.palette.openTitle,
		margin: '0 auto',
		width: '50%',
		textAlign: 'center'
	},
	username: {
		'& *': {
			textDecoration: 'none',
			color: theme.palette.primary.contrastText
		}
	},
	arrow: {
		color: theme.palette.primary.contrastText
	}
}))

export default function UserList() {
	const [userList, setUserList] = useState([])
	const classes = useStyles()

	useEffect(() => {
		const abortController = new AbortController()
		const signal = abortController.signal

		list(signal).then((data) => {
			if (data && data.error) {
				console.log(data.error)
			} else {
				setUserList(data)
			}
		})

		return function cleanup() {
			abortController.abort()
		}
	}, [])

	return (
		<Paper className={classes.root} elevation={4}>
			<Typography variant="h6" className={classes.title}>
				All Members
			</Typography>
			<List dense>
				{userList.map((item, i) => {
					return (
						<Link to={'/user/' + item._id} key={i}>
							<ListItem button>
								<ListItemAvatar>
									<Avatar>
										<Person/>
									</Avatar>
								</ListItemAvatar>
								<ListItemText className={classes.username} primary={item.name}/>
								<ListItemSecondaryAction>
									<IconButton>
										<ArrowForward className={classes.arrow}/>
									</IconButton>
								</ListItemSecondaryAction>
							</ListItem>
						</Link>
					)
				})}
			</List>
		</Paper>
	)
}
