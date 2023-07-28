import Box from '@mui/material/Box'

import { mapOrder } from '~/utils/sorts'
import ListColumns from './ListColumns/ListColumns'

const BoardContent = ({ board }) => {
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')

  return (
    <Box sx={{
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#1c2c3f' : theme.palette.primary.main),
      width: '100%',
      height: (theme) => theme.trello.boardContentHeight,
      display: 'flex',
      pt: 2,
      p: '10px 0'
    }}>
      <ListColumns columns={orderedColumns}/>
    </Box>
  )
}

export default BoardContent
