import { useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'

import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import Cloud from '@mui/icons-material/Cloud'
import ContentCut from '@mui/icons-material/ContentCut'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DragHandleIcon from '@mui/icons-material/DragHandle'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { mapOrder } from '~/utils/sorts'
import ListCards from './ListCards/ListCards'

const Column = ({ column }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: column._id,
    data: { ...column }
  })

  const dndKitColumnStyles = {
    transform: CSS.Translate.toString(transform),
    transition
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (e) => { setAnchorEl(e.currentTarget) }
  const handleClose = () => { setAnchorEl(null) }

  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')

  return (
    <Box 
      ref={setNodeRef}
      style={dndKitColumnStyles}
      {...attributes}
      {...listeners}
      sx={{
        minWidth: '300px',
        maxWidth: '300px',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2d4159' : '#dedede'),
        ml: 2,
        borderRadius: '6px',
        height: 'fit-content',
        maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
      }}>
      {/* Header */}
      <Box sx={{
        height: (theme) => theme.trello.columnHeaderHeight,
        p: 2,
        display: 'flex',
        alightItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Typography 
          variant='h6'
          sx={{
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {column?.title} 
        </Typography>
        <Tooltip title='more options'>
          <MoreHorizIcon
            id="basic-column-dropdown"
            aria-controls={open ? 'basic-menu-column' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{ color: 'text.primary', cursor: 'pointer' }}
          />
        </Tooltip>
        <Menu
          id="basic-menu-column"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-column-dropdown'
          }}
        >
          <MenuItem>
            <ListItemIcon>
              <AddCircleOutlineIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Add new card</ListItemText>
            <Typography variant="body2" color="text.secondary">
              ⌘X
            </Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentCut fontSize="small" />
            </ListItemIcon>
            <ListItemText>Cut</ListItemText>
            <Typography variant="body2" color="text.secondary">
              ⌘X
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon> <RemoveCircleIcon fontSize="small" /></ListItemIcon>
            <ListItemText>Remove</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon> <Cloud fontSize="small" /></ListItemIcon>
            <ListItemText>Archive this column</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
      
      <ListCards cards={orderedCards}/>
      
      {/* Footer */}
      <Box sx={{
        height: (theme) => theme.trello.columnFooterHeight,
        p: 2,
        display: 'flex',
        alightItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Button
          startIcon={<AddCircleOutlineIcon />}>
          Add new card
        </Button>
        <Tooltip title='Drag to move'>
          <DragHandleIcon sx={{ cursor: 'pointer' }} />
        </Tooltip>
      </Box>
    </Box>
  )
}

export default Column