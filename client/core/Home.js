import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import agoraPhoto from './../assets/images/agoraPhotoPB.jpg'
import Grid from '@material-ui/core/Grid'
import auth from './../auth/auth-helper'
import FindPeople from './../user/FindPeople'
import NewsFeed from './../post/NewsFeed'
import MediaQuery from 'react-responsive'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30
  },
	card: {
		maxWidth: 600,
		margin: 'auto',
		marginTop: theme.spacing(5),
		backgroundColor: theme.palette.primary.main
	},
	title: {
		padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
		color: theme.palette.openTitle
	},
	media: {
		minHeight: 400
	},
	link: {
		marginRight: 5
	},
	text: {
		color: theme.palette.primary.contrastText,
    fontFamily: 'Berkshire Swash',
    
	},
  credit: {
    padding: 10,
    textAlign: 'right',
    backgroundColor: '#ededed',
    '& a':{
      color: '#3f4771'
    } 
  }
}))

export default function Home({history}) {
	const classes = useStyles()
  const [defaultPage, setDefaultPage]= useState(false)

  useEffect(() => {
    setDefaultPage(auth.isAuthenticated())
    const unListen = history.listen(() => {
      setDefaultPage(auth.isAuthenticated())
    })
    return () => unListen()
    }, []
  )
	return (<div className={classes.root}>
    { !defaultPage &&
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={agoraPhoto}
              title="Agora is an ancient place for gatherings"
            />
            <CardContent>
              <Typography
              variant="h6"
              component="p"
              className={classes.text}
              align='center'
              >
                Agora is an ancient place for gatherings
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    }
    { defaultPage &&
      <Grid container spacing={8}>
        <Grid item xs >
          <NewsFeed/>
        </Grid>
        <MediaQuery minWidth={720}>
        <Grid item xs={6} sm={5}>
          <FindPeople/>
        </Grid>
        </MediaQuery>
      </Grid>
    }
		
	</div>)
}
