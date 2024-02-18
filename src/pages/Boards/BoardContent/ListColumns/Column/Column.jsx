import { useState } from 'react'

import { toast } from 'react-toastify'

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
import CloseIcon from '@mui/icons-material/Close'


import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { mapOrder } from '~/utils/sorts'
import ListCards from './ListCards/ListCards'
import { TextField } from '@mui/material'

const Column = ({ column }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: { ...column }
  })

  const dndKitColumnStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? '0.5' : undefined
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const [newCardTitle, setNewCardTitle] = useState('')

  const open = Boolean(anchorEl)

  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')


  const handleClick = (e) => { setAnchorEl(e.currentTarget) }
  const handleClose = () => { setAnchorEl(null) }

  // Handle add new card
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)
  const handleAddNewCard = (e) => {
    e.preventDefault() // Ngăn onBlur của input

    if (!newCardTitle) { return toast.warn('Please enter card title!')}
    console.log('Add new card', newCardTitle)
    // Gọi API

    toggleOpenNewCardForm()
    setNewCardTitle('')
  }

  return (
    <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
      <Box
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

        <ListCards cards={orderedCards} />

        {/* Footer */}
        <Box sx={{
          height: (theme) => theme.trello.columnFooterHeight,
          p: 2
        }}>
          {openNewCardForm ? (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <TextField
                placeholder='Enter title...'
                type='text'
                size='small'
                autoFocus
                data-no-dnd='true'
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                onBlur={() => {
                  setNewCardTitle('')
                  toggleOpenNewCardForm()
                }}
                sx={{
                  flex: '1',
                  '& input': { 
                    color: (theme) => theme.palette.mode === 'dark' ? 'white' : theme.palette.primary.main,
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? '#333643' : 'white'
                  },
                  '& label.Mui-focused': { color: (theme) => theme.palette.primary.main },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: (theme) => theme.palette.primary.main },
                    '&:hover fieldset': { borderColor: (theme) => theme.palette.primary.main },
                    '&.Mui-focused fieldset': { borderColor: (theme) => theme.palette.primary.main }
                  },
                  '& .MuiOutlinedInput-input': { borderRadius: 1 }
                }}
              />
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 1
              }}>
                <Button
                  size='small'
                  variant='contained'
                  sx={{
                    color: 'white',
                    justifyContent: 'center',
                    py: '4px',
                    my: 1,
                    boxShadow: 'none'
                  }}
                  onMouseDown={handleAddNewCard}>Add Card</Button>
                <CloseIcon
                  fontSize='small'
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { color: (theme) => theme.palette.error.light }
                  }}
                  onClick={toggleOpenNewCardForm}
                />
              </Box>
            </Box>
          ) : (
            <Box sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Button
                onClick={toggleOpenNewCardForm}
                startIcon={<AddCircleOutlineIcon />}>
                Add new card
              </Button>
              <Tooltip title='Drag to move'>
                <DragHandleIcon sx={{ cursor: 'pointer' }} />
              </Tooltip>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  )
}

export default Column