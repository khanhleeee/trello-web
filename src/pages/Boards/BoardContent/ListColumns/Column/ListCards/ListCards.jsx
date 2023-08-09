
import Box from '@mui/material/Box'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import Card from './Card/Card'

const ListCards = ({ cards }) => {
  return (
    <SortableContext items={cards?.map(card => card._id)} strategy={verticalListSortingStrategy}>
      <Box sx={{
        p: '0 8px',
        m: '0 8px',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        overflow: 'auto',
        maxHeight: (theme) => `calc(
                ${theme.trello.boardContentHeight}
                - ${theme.spacing(5)}
                - ${theme.trello.columnHeaderHeight}
                - ${theme.trello.columnFooterHeight}
              )`,
        '&::-webkit-scrollbar-thumb': { backgroundColor: '#ced0da' },
        '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#bfc2cf' }
      }}>
        {cards?.map(card => <Card key={card._id} card={card}/> )}
      </Box>
    </SortableContext>
  )
}

export default ListCards