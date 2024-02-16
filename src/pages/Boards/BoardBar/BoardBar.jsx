import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'

import DashboardIcon from '@mui/icons-material/Dashboard'
import HttpsIcon from '@mui/icons-material/Https'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import ModeStandbyIcon from '@mui/icons-material/ModeStandby'
import FilterListIcon from '@mui/icons-material/FilterList'
import Button from '@mui/material/Button'

import GroupAddIcon from '@mui/icons-material/GroupAdd'

const BoardBar = ({ board }) => {

  const MENU_ITEM_STYLE = {
    fontWeight: '500',
    bgcolor: 'inherit',
    border: 'none',
    borderRadius: '3px',
    paddingX: '6px',
    '&:hover': (theme) => ({
      bgcolor: theme.palette.mode === 'dark' ? '#2d4159' : 'primary.50'
    })
  }

  return (
    <Box px={2} sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#1c2c3f': '#f2f3f9'),
      display: 'flex',
      alignItems: 'center', 
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto',
      borderBottom: '1px solid #e4ebfb'
    }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        textTransform: 'capitalize'
      }}>
        <Tooltip title={board?.description}>
          <Chip 
            icon={<DashboardIcon fontSize='small'/>} 
            label={board?.title} 
            clickable
            sx={MENU_ITEM_STYLE} 
          />
        </Tooltip>
        <Chip 
          icon={<HttpsIcon fontSize='small'/>} 
          label={board?.type} 
          clickable
          sx={MENU_ITEM_STYLE} 
        />
        <Chip 
          icon={<AddToDriveIcon fontSize='small'/>} 
          label="Add to Google Drive" 
          clickable
          sx={MENU_ITEM_STYLE} 
        />
        <Chip 
          icon={<ModeStandbyIcon fontSize='small'/>} 
          label="Automation" 
          clickable
          sx={MENU_ITEM_STYLE} 
        />
        <Chip 
          icon={<FilterListIcon fontSize='small'/>} 
          label="Filters" 
          clickable
          sx={MENU_ITEM_STYLE} 
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button 
          variant="outlined" 
          size='small' 
          startIcon={<GroupAddIcon />} 
          sx={{ 
            color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'primary.main'), 
            '&.MuiButton-outlined': 
              { borderColor: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'primary.main') }
          }}
        >
          Invite
        </Button>
        <AvatarGroup 
          max={4} 
          total={10}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root':{
              width: '30px',
              height: '30px',
              fontSize: 16,
              border: 'none'
            }
          }}
        >
          <Tooltip title='user'>
            <Avatar alt="Remy Sharp" src="" />
          </Tooltip>
          <Tooltip title='user'>
            <Avatar alt="Travis Howard" src="" />
          </Tooltip>
          <Tooltip title='user'>
            <Avatar alt="Cindy Baker" src="" />
          </Tooltip>
          <Tooltip title='user'>
            <Avatar alt="Agnes Walker" src="" />
          </Tooltip>
          <Tooltip title='user'>
            <Avatar alt="Trevor Henderson" src="" />
          </Tooltip>
        </AvatarGroup>  
      </Box>
    </Box>
  )
}

export default BoardBar
