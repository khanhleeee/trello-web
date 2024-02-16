import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

import PeopleIcon from '@mui/icons-material/People'
import CommentIcon from '@mui/icons-material/Comment'
import InsertLinkIcon from '@mui/icons-material/InsertLink'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const Card = ({ card }) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: card._id,
		data: { ...card },
	})

	const dndKitColumnStyles = {
		transform: CSS.Translate.toString(transform),
		transition,
		opacity: isDragging ? '0.5' : undefined,
	}

	const isShowCardActions = () => {
		return (
			!!card?.memberIds?.length ||
			!!card?.comments?.length ||
			!!card?.attachments?.length
		)
	}

	return (
		<MuiCard
			ref={setNodeRef}
			style={dndKitColumnStyles}
			{...attributes}
			{...listeners}
			sx={{
				boxShadow: '0 0 1px rgba(0, 0, 0, 0.2)',
				overflow: 'unset',
				cursor: 'pointer',
				display: card?.FE_PlaceholderCard ? 'none' : 'block',
				border: '1px solid transparent',
				'&:hover': { borderColor: (theme) => theme.palette.primary.main }
			}}
		>
			{card?.cover && <CardMedia sx={{ height: 140 }} image={card.cover} />}

			<CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
				<Typography>{card?.title}</Typography>
			</CardContent>
			{isShowCardActions() && (
				<CardActions sx={{ p: '0 4px 8px 4px' }}>
					{!!card?.memberIds?.length && (
						<Button size='small' startIcon={<PeopleIcon />}>
							{card.memberIds.length}
						</Button>
					)}
					{!!card?.comments?.length && (
						<Button size='small' startIcon={<CommentIcon />}>
							2
						</Button>
					)}
					{!!card?.attachments?.length && (
						<Button size='small' startIcon={<InsertLinkIcon />}>
							3
						</Button>
					)}
				</CardActions>
			)}
		</MuiCard>
	)
}

export default Card
