import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import FollowGrid from './FollowGrid'
import PostList from './../post/PostList'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  contrastText: {
    color: theme.palette.primary.contrastText,
    '& :selected': {
      color: theme.palette.openTitle
    }
  }
}))

export default function ProfileTabs(props) {
  const classes = useStyles()
  const [tab, setTab] = useState(0)

  const handleTabChange = (event, value) => {
    setTab(value)
  }

  return (
    <div>
      <AppBar position="static" className={classes.root}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          indicatorColor='secondary'
          textColor='secondary'
          variant='fullWidth'
        >
          <Tab label='Posts' className={classes.contrastText}/>
          <Tab label='Following' className={classes.contrastText} />
          <Tab label='Followers' className={classes.contrastText} />
        </Tabs>
      </AppBar>
      {tab === 0 &&
        <TabContainer>
          <PostList removeUpdate={props.removePostUpdate} posts={props.posts} />
        </TabContainer>
      }
      {tab === 1 &&
        <TabContainer>
          <FollowGrid people={props.user.following} />
        </TabContainer>
      }
      {tab === 2 &&
        <TabContainer>
          <FollowGrid people={props.user.following} />
        </TabContainer>
      }
    </div>
  )
}

ProfileTabs.propTypes = {
  user: PropTypes.object.isRequired,
  removePostUpdate: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired
}

const TabContainer = (props) => {
  
  return (
    <Typography component='div' style={{ padding: 16 }}>
      {props.children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
}
