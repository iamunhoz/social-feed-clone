import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import dancemacabre from './../assets/images/dancemacabre.jpg'

const useStyles = makeStyles(theme => ({
	card: {
		maxWidth: 600,
		margin: 'auto',
		marginTop: theme.spacing(5),
		backgroundColor: theme.palette.primary.dark
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
		color: theme.palette.primary.contrastText
	}
}))

export default function Home() {
	const classes = useStyles()
	return (<div>
		<Card className={classes.card}>
			<Typography variant="h6" className={classes.title}>
				Home Page
			</Typography>
			<CardMedia className={classes.media}
				image={dancemacabre} title="Skeletons also dance"/>
			<CardContent>
				<Typography variant="h6" component="p" className={classes.text}>
					This is a MERN skeleton with CRUD capabilities
				</Typography>
			</CardContent>
		</Card>
	</div>)
}
