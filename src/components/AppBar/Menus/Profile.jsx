

import { useState } from 'react'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Tooltip from '@mui/material/Tooltip'

import Avatar from '@mui/material/Avatar'
import Logout from '@mui/icons-material/Logout'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'

const Profile = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
  };
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{ color: 'text.main' }}>
      <Tooltip title="Account settings">
        <IconButton 
          id="basic-button-profile"
          aria-controls={open ? 'basic-menu-profile' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{ padding: 1 }}
        >
          <Avatar 
            sx={{ width: 34, height: 34 }} 
            alt='avatar'  
            src='https://scontent.fsgn5-13.fna.fbcdn.net/v/t39.30808-6/352818778_3068864243416812_8688953589671192243_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=sQ7i27EU9EgAX8_U-Ep&_nc_ht=scontent.fsgn5-13.fna&oh=00_AfB0ZevYsAG4JLTNhmf02qnkgn1r-62aNR_BcOArfCZWBQ&oe=64B55717'
          />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu-profile"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-profile'
        }}
      >
        <MenuItem>
          <Avatar sx={{ width: 24, height: 24, mr: 1 }} /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar sx={{ width: 24, height: 24, mr: 1 }} /> My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Profile