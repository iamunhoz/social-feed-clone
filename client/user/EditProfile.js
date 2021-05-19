import React, { useState, useEffect } from 'react'
import auth from './../auth/auth-helper'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import { read, update } from './api-user'
import { Redirect } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import FileUpload from '@material-ui/icons/AddAPhoto'

const useStyles = makeStyles(theme => {
	return ({
		card: {
			maxWidth: 600,
			margin: 'auto',
			textAlign: 'center',
			marginTop: theme.spacing(5),
			paddingBottom: theme.spacing(2),
			backgroundColor: theme.palette.primary.main
		},
		title: {
			margin: theme.spacing(2),
			color: theme.palette.protectedTitle
		},
		bigAvatar: {
			width: 60,
			height: 60,
			margin: 'auto'
		},
		error: {
			verticalAlign: 'middle'
		},
		textField: {
			marginLeft: theme.spacing(1),
			marginRight: theme.spacing(1),
			width: 300,
			'& > *': {
				color: theme.palette.primary.contrastText
			}
		},
		photoField: {
			width: '50%',
			margin: '0 auto'
		},
		submit: {
			margin: 'auto',
			marginBottom: theme.spacing(2)
		},
		inputFile: {
			display: 'none'
		},
		filename: {
			marginLeft: '10px',
			color: theme.palette.primary.contrastText
		}
	})
})

export default function EditProfile({ match }) {
	const classes = useStyles()
	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
		about: '',
		photo: '',
		open: false,
		error: '',
		redirectToProfile: false
	})
	const jwt = auth.isAuthenticated()

	useEffect(() => {
		const abortController = new AbortController()
		const signal = abortController.signal

		read(
			{ userId: match.params.userId },
			{ t: jwt.token },
			signal).then(data => {
			if (data && data.error) {
				setValues({ ...values, error: data.error })
			} else {
				setValues({
					...values,
					name: data.name,
					email: data.email,
					about: data.about
				})
			}
		})
		return function clenup() {
			abortController.abort()
		}
	}, [match.params.Id])

	const clickSubmit = () => {
		const user = new FormData()
		values.name && user.append('name', values.name)
		values.email && user.append('email', values.email)
		values.password && user.append('password', values.password)
		values.about && user.append('about', values.about)
		values.photo && user.append('photo', values.photo)

		update(
			{ userId: match.params.userId },
			{ t: jwt.token },
			user).then(data => {
			if (data && data.error) {
				setValues({ ...values, error: data.error })
			} else {
				setValues({
					...values,
					userId: data._id,
					redirectToProfile: true
				})
			}
		})
	}

	const handleChange = name => event => {
		const value =
			name === 'photo'
				? event.target.files[0]
				: event.target.value
		setValues({
			...values,
			[name]: value
		})
	}

	if (values.redirectToProfile) {
		return (<Redirect to={'/user/' + values.userId} />)
	} else {
		return (
			<Card className={classes.card}>
				<CardContent>
					<Typography variant='h6' className={classes.title}>
						Edit Profile
					</Typography>
					<div className={classes.photoField}>
						<input
							accept='image/*'
							type='file'
							onChange={handleChange('photo')}
							className={classes.inputFile}
							id='icon-button-file'
						/>
						<label htmlFor='icon-button-file'>
							<Button
								variant='contained'
								color='default'
								component='span'>
							Upload
								<FileUpload />
							</Button>
						</label>
						<span className={classes.filename}>
							{values.photo ? values.photo.name : 'Insert photo'}
						</span>
					</div>
					<TextField
						id='name'
						label='name'
						className={classes.textField}
						value={values.name}
						onChange={handleChange('name')}
						margin='normal'
						color='secondary'
					/><br/>
					<TextField
						id='email'
						label='email'
						className={classes.textField}
						value={values.email}
						onChange={handleChange('email')}
						margin='normal'
						color='secondary'
					/><br/>
					<TextField
						id='multiline-flexible'
						label='about'
						multiline
						rows='2'
						className={classes.textField}
						value={values.about}
						onChange={handleChange('about')}
						margin='normal'
						color='secondary'
					/><br/>
					<TextField
						id='password'
						label='password'
						className={classes.textField}
						value={values.password}
						onChange={handleChange('password')}
						margin='normal'
						color='secondary'
					/><br/>
					{ values.error && (
						<Typography component='p' color='error'>
							<Icon color='error' className={classes.error}>
								error
							</Icon>
						</Typography>
					)}
				</CardContent>
				<CardActions>
					<Button
						color='primary'
						variant='contained'
						onClick={clickSubmit}
						className={classes.submit}>
							Submit
					</Button>
				</CardActions>
			</Card>
		)
	}
}
