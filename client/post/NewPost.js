import React, { useState, useEffect } from 'react'
import auth from './../auth/auth-helper'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Icon from '@material-ui/core/Icon'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { create } from './api-post'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    padding: `${theme.spacing(3)}px 0px 1px`
  },
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.primary.main,
    boxShadow: 'none'
  },
  cardContent: {
    backgroundColor: theme.palette.primary.main,
    paddingTop: 0,
    paddingBottom: 0
  },
  cardHeader: {
    paddingTop: 8,
    paddingBottom: 8,
    color: theme.palette.primary.contrastText
  },
  photoButton: {
    height: 30,
    marginBottom: 5
  },
  input: {
    display: 'none',
    color: theme.palette.primary.contrastText
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: '90%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '& ::placeholder': {
      color: theme.palette.primary.contrastText
    }
  },
  submit: {
    margin: theme.spacing(2)
  },
  fileName: {
    verticalAlign: 'super'
  }
}))

export default function NewPost(props) {
  const classes = useStyles()
  const [values, setValues] = useState({
    text: '', photo: '', error: '', user: {}
  })
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    setValues({ ...values, user: auth.isAuthenticated().user })
  }, [])

  const clickPost = () => {
    let postData = new FormData()
    postData.append('text', values.text)
    postData.append('photo', values.photo)
    create(
      { userId: jwt.user._id },
      { t: jwt.token },
      postData
    ).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error})
      } else {
        setValues({ ...values, text: '', photo: ''})
        props.addUpdate(data)
      }
    })
  }

  const handleChange = name => event => {
    const value = name === 'photo' ?
      event.target.files[0] :
      event.target.value
    setValues({ ...values, [name]: value })
  }

  const photoURL = values.user._id ? 
    '/api/users/photo/'+values.user._id :
    '/api/users/defaultphoto'

  return (<div className={classes.root}>
    <Card className={classes.card}>
      <CardHeader
        avatar={ <Avatar src={photoURL}/> }
        title={values.user.name}
        className={classes.cardHeader}
      />
      <CardContent className={classes.cardContent}>
        <TextField
          placeholder="Share your thoughts ..."
          multiline
          rows='3'
          value={values.text}
          onChange={handleChange('text')}
          className={classes.textField}
          margin='normal'
        />
        <input
          accept='image/*'
          onChange={handleChange('photo')}
          className={classes.input}
          id='icon-button-file'
          type='file'
        />
        <label htmlFor='icon-button-file'>
          <IconButton
            color='secondary'
            className={classes.photoButton}
          >
            <PhotoCamera />
          </IconButton>
        </label>
        <span className={classes.fileName}>
          { values.photo ? values.photo.name : '' }
        </span>
        { values.error &&
          (<Typography component='p' color='error'>
            <Icon color='error' className={classes.error}>error</Icon>
            {values.error}
          </Typography>)
        }
      </CardContent>
      <CardActions>
        <Button
          color='secondary'
          variant='contained'
          disabled={values.text === ''}
          onClick={clickPost}
          className={classes.submit}
        >
          POST
        </Button>
      </CardActions>
    </Card>
  </div>)
}

NewPost.propTypes = {
  addUpdate: PropTypes.func.isRequired
}
