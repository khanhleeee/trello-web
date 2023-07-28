import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

import PeopleIcon from '@mui/icons-material/People'
import CommentIcon from '@mui/icons-material/Comment'
import InsertLinkIcon from '@mui/icons-material/InsertLink'


const Card = ({ card }) => {
  const isShowCardActions = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  }

  return (
    <MuiCard
      sx={{ 
        boxShadow: '0 0 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset',
        cursor: 'pointer'
      }}
    >
      {card?.cover && <CardMedia sx={{ height: 140 }} image={card.cover} /> }
      
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>{card?.title}</Typography>
      </CardContent>
      {isShowCardActions() && (
        <CardActions sx={{ p: '0 4px 8px 4px' }}>
          {!!card?.memberIds?.length && 
            <Button size="small" startIcon={<PeopleIcon />}>{card.memberIds.length}</Button>
          }
          {!!card?.comments?.length && 
            <Button size="small" startIcon={<CommentIcon />}>2</Button>
          }
          {!!card?.attachments?.length && 
            <Button size="small" startIcon={<InsertLinkIcon />}>3</Button>
          }
        </CardActions>
      )}
    </MuiCard>
  )
}

export default Card