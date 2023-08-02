import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

import Column from './Column/Column'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

const ListColumns = ({ columns }) => {
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
        {columns?.map(column => <Column key={column._id} column={column}/> )}
        {/* Button add new column */}
        <Box sx={{
          minWidth: '200px',
          maxWidth: '200px',
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
      </Box>
    </SortableContext>
  )
}

export default ListColumns