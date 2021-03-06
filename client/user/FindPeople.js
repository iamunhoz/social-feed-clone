import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { findPeople, follow } from './api-user'
import auth from './../auth/auth-helper'
import SnackBar from '@material-ui/core/Snackbar'
import ViewIcon from '@material-ui/icons/Visibility'

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    padding: '0 0 0 0'/* theme.spacing(1) */,
    margin: 0,
    backgroundColor: theme.palette.primary.main
  }),
  title: {
    margin: `1px 1px 1px 1px`,
    color: theme.palette.openTitle,
    fontSize: '1em'
  },
  avatar: {
    marginRight: 0
  },
  follow: {
    right: 0
  },
  snack: {
    color: theme.palette.protectedTitle
  },
  viewButton: {
    verticalAlign: 'middle'
  },
  userName: {
    color: theme.palette.primary.contrastText
  }
}))

export default function FindPeople() {
  const classes = useStyles()
  const [values, setValues] = useState({
    users: [],
    open: false,
    followMessage: ''
  })
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    findPeople(
      { userId: jwt.user._id },
      { t: jwt.token },
      signal
    ).then(data => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setValues({ ...values, users: data})
      }
    })
  }, [])

  const clickFollow = (user, index) => {
    follow(
      { userId: jwt.user._id },
      { t: jwt.token },
      user._id
    ).then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        let toFollow = values.users
        toFollow.splice(index, 1)
        setValues({
          ...values,
          users: toFollow,
          open: true,
          followMessage: `Following ${user.name}!`
        })
      }
    })
  }

  const handleRequestClose = (event, reason) => {
    setValues({ ...values, open: false })
  }

  return ( <div>
    <Paper className={classes.root} elevation={4}>
      <Typography type='title' className={classes.title}>
        Philosophers to follow
      </Typography>
      <List>
        {values.users.map((user, i) => {
          return <span key={i}>
            <ListItem>
              <Link to={'/user/' + user._id}>
                <ListItemAvatar className={classes.avatar}>
                  <Avatar sr={'/api/users/photo/'+user._id}/>
                </ListItemAvatar>
              </Link>
              <ListItemText primary={user.name} className={classes.userName}/>
              <ListItemSecondaryAction className={classes.follow}>

                <Button
                  aria-label='Follow'
                  variant='contained'
                  color='secondary'
                  size='small'
                  onClick={() => {clickFollow(user, i)}}
                >
                  Follow
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          </span>
        })}
      </List>
    </Paper>
    <SnackBar 
      anchorOrign={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={values.open}
      onClose={handleRequestClose}
      autoHideDuration={5000}
      message={
        <span className={classes.snack}>
          {values.followMessage}
        </span>
      }
    />
  </div> )
}

