import React from 'react'
import PropTypes from 'prop-types'
import Post from './Post'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  postBox: {
    marginTop: '24px',
    backgroundColor: theme.palette.primary.dark
  }

}))
export default function PostList (props) {
  const classes = useStyles()
  return (
    <div className={classes.postBox}>
      {props.posts.map((item, i) => {
        return  <Post
                  post={item}
                  key={i}
                  onRemove={props.removeUpdate}
                  className={classes.postBox}
                />
      })}
    </div>
  )
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  removeUpdate: PropTypes.func.isRequired
}