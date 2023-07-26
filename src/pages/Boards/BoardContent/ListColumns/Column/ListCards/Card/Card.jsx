import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

import PeopleIcon from '@mui/icons-material/People'
import CommentIcon from '@mui/icons-material/Comment'
import InsertLinkIcon from '@mui/icons-material/InsertLink'


const Card = () => {
  return (
    <MuiCard
      sx={{ 
        boxShadow: '0 0 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image='https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1200px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg'
        title="green iguana"
      />
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>AU Project</Typography>
      </CardContent>
      <CardActions sx={{ p: '0 4px 8px 4px' }}>
        <Button size="small" startIcon={<PeopleIcon />}>10</Button>
        <Button size="small" startIcon={<CommentIcon />}>2</Button>
        <Button size="small" startIcon={<InsertLinkIcon />}>3</Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card