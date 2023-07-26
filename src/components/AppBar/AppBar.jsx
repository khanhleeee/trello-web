import { useState } from 'react'

import Box from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import InputAdornment from '@mui/material/InputAdornment'

import AppsIcon from '@mui/icons-material/Apps'
import CloseIcon from '@mui/icons-material/Close'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import SearchIcon from '@mui/icons-material/Search'

import ModeSelect from '~/components/ModeSelect/ModeSelect'

import { ReactComponent as TrelloLogo } from '~/assets/trello.svg'
import { ReactComponent as PlusIcon } from '~/assets/plus_solid.svg'

import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Templates from './Menus/Templates'
import Starred from './Menus/Starred'
import Profile from './Menus/Profile'
import { Fade } from '@mui/material'

const AppBar = () => {
  const [searchValue, setSearchValue] = useState('')


  return (
    <Box px={2} sx={{
      width: '100%',
      height: (theme) => theme.trello.appBarHeight,
      bgcolor: (theme) => 
        (theme.palette.mode === 'dark' ? theme.palette.background : theme.palette.primary.main),
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto',
      overflowY: 'hidden'
    }}>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <AppsIcon sx={{ color: 'white' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SvgIcon component={TrelloLogo} inheritViewBox fontSize='small' sx={{ color: 'white' }} />
            <Typography 
              variant='span' 
              sx={{ fontSize: '1.2rem', fontWeight: '800', userSelect: 'none', color: 'white' }}>
              Trello
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Workspaces />
            <Recent />
            <Templates />
            <Starred />
            <Button 
              variant="outlined" 
              size='small'
              startIcon={<SvgIcon component={PlusIcon} inheritViewBox sx={{ width: 14, height: 14 }}/>}
              sx={{ color: 'white', border: 'none', '&:hover': { border: 'none' } }}
            >
            Create new
            </Button>
          </Box>

        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', minWidth: '120px', maxWidth: '200px' }}>
          <TextField
            label="Search"
            type='text'
            id="outlined-size-small"
            size="small"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'white' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <Fade in={searchValue}>
                  <CloseIcon
                    fontSize='small' 
                    sx={{ color: 'white', cursor: 'pointer' }}
                    onClick={() => setSearchValue('')}
                  />
                </Fade>
              )
            }}
            sx={{ 
              '& label': { color: 'white' },
              '& input': { color: 'white' },
              '& label.Mui-focused': { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' }
              }
            }}
          />
        </Box>
        <ModeSelect />
        
        <Tooltip title='Notifications'>
          <IconButton variant="plain" sx={{ color: 'text.main' }}>
            <Badge color="error" variant="dot">
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title='Help'>
          <HelpOutlineIcon sx={{ cursor: 'pointer' }} />
        </Tooltip>

        <Profile />
      </Box>
    </Box>
  )
}

export default AppBar
