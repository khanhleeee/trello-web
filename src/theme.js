/* eslint-disable indent */
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { indigo } from '@mui/material/colors'

const APP_BAR_HEIGHt = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHt} - ${BOARD_BAR_HEIGHT})`
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

const boardTheme = extendTheme({
	trello: {
		appBarHeight: APP_BAR_HEIGHt,
		boardBarHeight: BOARD_BAR_HEIGHT,
		boardContentHeight: BOARD_CONTENT_HEIGHT,
		columnHeaderHeight: COLUMN_HEADER_HEIGHT,
		columnFooterHeight: COLUMN_FOOTER_HEIGHT
	},
	colorSchemes: {
		light: {
			palette: {
				primary: {
					'50': indigo[50],
					light: indigo[500],
					main: indigo[600]
				},
				text: {
					primary: '#262626'
				},
				background: {
					default:'#f5f5f5',
					paper: '#f5f5f5'
				}
			}
		},
		dark: {
			palette: {
				primary: {
					'50': 'rgba(26, 35, 126, 0.5)',
					main: indigo[500]
				},
				text: {
					primary: '#f0f0f0',
					secondary: '#f5f5f5'
				},
				background: {
					default:'#0a1929',
					paper: '#0a1929'
				}
			}
		}
	},
	components: {
		MuiCssBaseline: {
			styleOverrides:  {
				body: {
					'*::-webkit-scrollbar': {
						width: '8px',
						height: '8px'
					},
					'*::-webkit-scrollbar-thumb': {
						backgroundColor: 'rgba(72,96,127, 0.9)',
						borderRadius: '10px'
					},
					'*::-webkit-scrollbar-thumb:hover': {
						backgroundColor: 'rgba(72,96,127, 1)'
					}	
				}
			}
		},
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
		MuiIconButton: {
			styleOverrides: {
				root: {
					color: 'inherit'
				}
			}
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					color:  'white',
					fontSize: '0.875rem'
				}
			}
		},
		MuiTypography: {
			styleOverrides: {
				root: {
					'&.MuiTypography-body1': { fontSize: '0.875rem' }
				}
			}
		},
    MuiOutlinedInput: {
      styleOverrides: {
        root: {	
						fontSize: '0.875rem',
						'& fieldset': { borderWidth: '1px !important' },
						'&:hover fieldset': { borderWidth: '2px !important' },
						'&.Mui-focused fieldset': { borderWidth: '2px !important' }
				}
      }
    }
	}
	// other properties
})


export default boardTheme
