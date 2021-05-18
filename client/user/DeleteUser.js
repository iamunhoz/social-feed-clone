import React, { useState } from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { remove } from './api-user'
import auth from './../auth/auth-helper'
import { Redirect } from 'react-router-dom'

export default function DeleteUser(props) {
	const [open, setOpen] = useState(false)
	const [redirect, setRedirect] = useState(false)
	const jwt = auth.isAuthenticated()

	const clickButton = () => setOpen(true)

	const handleRequestClose = () => setOpen(false)

	const deleteAccount = () => {
		remove(
			{ userId: props.userId },
			{ t: jwt.token }
		).then(data => {
			if (data && data.error) {
				throw new Error('Unable to delete account')
			} else {
				auth.clearJwt(() => console.log('account deleted'))
				setRedirect(true)
			}
		})
	}

	if (redirect) {
		return <Redirect to='/' />
	} else {
		return (<span>
			<IconButton
				arial-label="delete"
				color='secondary'
				onClick={clickButton}>
				<DeleteIcon/>
			</IconButton>

			<Dialog open={open} onClose={handleRequestClose}>
				<DialogTitle>Delete Account</DialogTitle>
				<DialogContent>
					<DialogContentText> Confirm to delete your account</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleRequestClose} color='primary'>
						Cancel
					</Button>
					<Button onClick={deleteAccount} color='secondary' autoFocus='autoFocus'>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</span>)
	}
}
DeleteUser.propTypes = {
	userId: PropTypes.string.isRequired
}
