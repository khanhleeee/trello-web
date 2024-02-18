import { useState } from 'react'

import { toast } from 'react-toastify'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import Column from './Column/Column'

const ListColumns = ({ columns }) => {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')

  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

  const handleAddNewColumn = (e) => {
    e.preventDefault() // Ngăn onBlur của input

    if (!newColumnTitle) { return toast.warn('Please enter the column title!') }
    toast.success(`Add new column ${newColumnTitle}` )
    // Gọi API

    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }

  return (
    <SortableContext items={columns?.map(column => column._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        bg: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}>
        {columns?.map(column => <Column key={column._id} column={column} />)}
        {/* Button add new column */}
        {openNewColumnForm ? (
          <Box
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
              mx: 2,
              p: 1,
              borderRadius: '6px',
              height: 'fit-content',
              flexDirection: 'column',
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2D4159' : '#5c6ac0'),
              gap: 1
            }}
          >
            <TextField
              placeholder='Enter title...'
              type='text'
              size="small"
              autoFocus
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              onBlur={() => { 
                setNewColumnTitle('')
                toggleOpenNewColumnForm()
              }}
              sx={{
                width: '100%',
                '& input': { color: 'white' },
                '& label.Mui-focused': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' }
                }
              }}
            />
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
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
                onMouseDown={handleAddNewColumn}>Add Column</Button>
              <CloseIcon 
                fontSize='small' 
                sx={{ 
                  cursor: 'pointer', 
                  color: 'white', 
                  '&:hover': { color: (theme) => theme.palette.error.light } }} 
                onClick={toggleOpenNewColumnForm} 
              />
            </Box>
          </Box>
        ) : (
          <Box onClick={toggleOpenNewColumnForm} sx={{
            minWidth: '250px',
            maxWidth: '250px',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2D4159' : '#5c6ac0'),
            mx: 2,
            borderRadius: '6px',
            height: 'fit-content'
          }}>
            <Button
              startIcon={<AddCircleOutlineIcon />}
              sx={{
                color: 'white',
                width: '100%',
                justifyContent: 'flex-start',
                pl: 2.5,
                py: 1
              }}
            >
              Add new column
            </Button>
          </Box>
        )}

      </Box>
    </SortableContext>
  )
}

export default ListColumns