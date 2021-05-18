import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { create } from './api-user.js'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
	card: {
		width: '50%',
		margin: 'auto',
		marginTop: theme.spacing(5),
		backgroundColor: theme.palette.primary.dark,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	title: {
		padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
		color: theme.palette.openTitle
	},
	textfield: {
		color: theme.palette.primary.contrastText
	}
}))

export default function Signup() {
	const classes = useStyles()
	const [values, setValues] = useState({
		name: '',
		password: '',
		email: '',
		open: false,
		error: ''
	})

	const handleChange = field => event => {
		setValues({ ...values, [field]: event.target.value })
	} /* akes thenew value that's entered in the input field and sets it as the state. */

	const clickSubmit = () => {
		const user = {
			name: values.name || undefined,
			email: values.email || undefined,
			password: values.password || undefined
		}

		create(user).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error })
			} else {
				setValues({ ...values, error: '', open: true })
			}
		})
	}

	return (
		<div>
			<Card className={classes.card}>
				<CardContent>
					<Typography variant='h6' className={classes.title}>
						Sign Up
					</Typography>
					<TextField id='name' label='Name' className={classes.textfield}
						value={values.name} onChange={handleChange('name')}
						margin='normal' /> <br/>
					<TextField id='email' label='Email' type='email' className={classes.textfield}
						value={values.email} onChange={handleChange('email')}
						margin='normal' /> <br/>
					<TextField id='password' label='Password' type='password' className={classes.textfield}
						value={values.password} onChange={handleChange('password')}
						margin='normal' /> <br/>
					{
						values.error && (<Typography component='p' color='error'>
							<Icon color='error' className={classes.error}>error</Icon>
							{values.error} </Typography>)
					}
				</CardContent>
				<CardActions>
					<Button color='primary' variant='contained' onClick={clickSubmit}
						className={classes.submit}>Submit</Button>
				</CardActions>
			</Card>

			<Dialog open={values.open} disableBackdropClick={true}>
				<DialogTitle> New Account</DialogTitle>
				<DialogContent>
					<DialogContentText>
						New account created.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Link to='/signin'>
						<Button color='primary' autoFocus='autoFocus' variant='contained'>
							Sign In
						</Button>
					</Link>
				</DialogActions>
			</Dialog>
		</div>
	)
}
