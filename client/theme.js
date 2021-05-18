import { createMuiTheme } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
const theme = createMuiTheme({
	typography: {
		useNextVariants: true
	},
	palette: {
		primary: {
			light: '#4d4d4d',
			main: '#212121',
			dark: '#171717',
			contrastText: '#ccc'
		},
		secondary: {
			light: '#3378af',
			main: '#01579b',
			dark: '#003c6c',
			contrastText: '#ccc'
		},
		openTitle: '#fbec5d',
		protectedTitle: green['400'],
		type: 'light'
	}
})

export default theme
