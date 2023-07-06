/* eslint-disable indent */
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { grey, indigo } from '@mui/material/colors' 

const theme = extendTheme({
	trello: {
		appBarHeight: '48px',
		boardBarHeight: '58px'
	},
	colorSchemes: {
		light: {
			palette: {
				primary: grey
			}
		},
		dark: {
			palette: {
				primary: indigo
			}
		}
	}
})

export default theme
