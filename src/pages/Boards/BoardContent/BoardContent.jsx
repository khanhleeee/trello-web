import { useCallback, useEffect, useRef, useState } from 'react'
import { cloneDeep, isEmpty } from 'lodash'

import Box from '@mui/material/Box'

import {
	DndContext,
	PointerSensor,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
	DragOverlay,
	defaultDropAnimationSideEffects,
	closestCorners,
	pointerWithin,
	getFirstCollision
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

import { mapOrder } from '~/utils/sorts'

import ListColumns from './ListColumns/ListColumns'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

import { generatePlaceholderCard } from '~/utils/formatter'

const ACTIVE_DRAG_ITEM_TYPE = {
	COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
	CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD',
}

const BoardContent = ({ board }) => {
	// const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
	const pointerSensor = useSensor(PointerSensor, {
		activationConstraint: { distance: 10 }
	})
	const mouseSensor = useSensor(MouseSensor, {
		activationConstraint: { distance: 10 }
	})

	const touchSensor = useSensor(TouchSensor, {
		activationConstraint: { delay: 250, tolerance: 500 },
	})
	// const sensors = useSensors(pointerSensor)
	const sensors = useSensors(mouseSensor, touchSensor)

	const [orderedColumns, setOrderedColumns] = useState([])
	const [activeDragItemId, setActiveDragItemId] = useState(null)
	const [activeDragItemType, setActiveDragItemType] = useState(null)
	const [activeDragItemData, setActiveDragItemData] = useState(null)
	const [oldColumnWhenDraggingCard, setoldColumnWhenDraggingCard] = useState(null)

	// Điểm va chạm cuối cùng (Xử lý thuật toán va chạm)
	const lastOverId = useRef(null)

	useEffect(() => {
		setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
	}, [board])

	// Functions
	const findColumnByCardId = (cardId) => {
		return orderedColumns.find((column) =>
			column?.cards?.map((card) => card._id)?.includes(cardId)
		)
	}

	const moveCardBetweenDifferentColumn = (
			overColumn,
			overCardId, 
			active, 
			over, 
			activeColumn, 
			activeDraggingCardId, 
			activeDraggingCardData
		) => {
		setOrderedColumns((prevColumns) => {
			const overCardIndex = overColumn.cards?.findIndex(
				(card) => card._id === overCardId
			)

			let newCardIndex
			// check xem card drag nằm phía trên hay dưới over card
			const isBelowOverCard =	active.rect.current.translated && 
				active.rect.current.translated.top > over.rect.top + over.rect.height
			const modifier = isBelowOverCard ? 1 : 0

			newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn.cards?.length + 1

			// // Clone ra 1 mảng mới để xử lý sau đó set lại OrderedColumns mới
			const nextColumns = cloneDeep(prevColumns)
			const nextActiveColumn = nextColumns.find((column) => column._id === activeColumn._id)
			const nextOverColumn = nextColumns.find((column) => column._id === overColumn._id)

			if (nextActiveColumn) {
				// Xoá card đang kéo ra khỏi column cũ
				nextActiveColumn.cards = nextActiveColumn.cards.filter((card) => card._id !== activeDraggingCardId)

				// Thêm placeholder card nếu column bị rỗng (bị kéo hết card đi)
				if (isEmpty(nextActiveColumn.cards)) {
					nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
				}

				nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((card) => card._id)
			}

			if (nextOverColumn) {

				// Nếu activeCard đang kéo đã tồn tại ở overColumn thì xoá trước
				nextOverColumn.cards = nextOverColumn.cards.filter((card) => card._id !== activeDraggingCardId)
				// Rebuild lại data của card đó (vì column id vẫn lưu là column id cũ)
				const rebuild_activeDraggingCardData = { ...activeDraggingCardData, columnId: nextOverColumn._id }

				// Xoá placeholder card đi (nếu column là column rỗng)
				nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)

				// Thêm activeCard đang kéo vào overColumn với index mới -> syntax: index thêm, số lượng delete, dữ liệu
				// toSpliced(start, deleteCount, item1)
				nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)
				nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card) => card._id)
			}

			return nextColumns

		})
	}

	const handleDragStart = (e) => {
		setActiveDragItemId(e?.active?.id)
		setActiveDragItemType(
			e?.active?.data?.current?.columnId
				? ACTIVE_DRAG_ITEM_TYPE.CARD
				: ACTIVE_DRAG_ITEM_TYPE.COLUMN
		)
		setActiveDragItemData(e?.active?.data?.current)

		//  Nếu kéo card, lưu data column cũ
		if (e?.active?.data?.current?.columnId) {
			setoldColumnWhenDraggingCard(findColumnByCardId(e?.active?.id))
		}
	}

	const handleDragEnd = (e) => {
		const { active, over } = e

		if (!active || !over) return

		// Dragging cards
		if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
			// activeDraggingCardData: active.data.current
			const {
				id: activeDraggingCardId,
				data: { current: activeDraggingCardData }
			} = active
			
			const { id: overCardId } = over

			const activeColumn = findColumnByCardId(activeDraggingCardId)
			const overColumn = findColumnByCardId(overCardId)

			if (!activeColumn || !overColumn) return

			// dragging card to another column
			if (oldColumnWhenDraggingCard._id !== overColumn._id) {
				moveCardBetweenDifferentColumn(
					overColumn,
					overCardId, 
					active, 
					over, 
					activeColumn, 
					activeDraggingCardId, 
					activeDraggingCardData
				)

				// dragging card in the same column
			} else {
				const prevCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(
					(card) => card._id === activeDragItemId
				)
				const nextCardIndex = overColumn?.cards?.findIndex(
					(card) => card._id === overCardId
				)

				// Lưu lại thông tin cards trong column
				const dndKitOrderedCards = arrayMove(
					oldColumnWhenDraggingCard?.cards,
					prevCardIndex,
					nextCardIndex
				)
				setOrderedColumns((prevColumns) => {
					const nextColumns = cloneDeep(prevColumns)

					const overColumnData = nextColumns.find(
						(column) => column._id === overColumn._id
					)

					//  Update cards data
					overColumnData.cards = dndKitOrderedCards
					overColumnData.cardOrderIds = dndKitOrderedCards.map(
						(card) => card._id
					)

					return nextColumns
				})
			}
		}

		// Dragging columns
		if (
			activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN &&
			active.id !== over.id
		) {
			const prevColumnIndex = orderedColumns.findIndex(
				(column) => column._id === active.id
			)
			const nextColumnIndex = orderedColumns.findIndex(
				(column) => column._id === over.id
			)

			const dndKitOrderedColumns = arrayMove(
				orderedColumns,
				prevColumnIndex,
				nextColumnIndex
			)
			// const orderedColumnIds = dndKitOrderedColumns.map(c => c._id)

			setOrderedColumns(dndKitOrderedColumns)
		}

		setActiveDragItemId(null)
		setActiveDragItemType(null)
		setActiveDragItemData(null)
		setoldColumnWhenDraggingCard(null)
	}

	const handleDragOver = (e) => {
		if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

		const { active, over } = e

		if (!active || !over) return

		// activeDraggingCardData: active.data.current
		const {
			id: activeDraggingCardId,
			data: { current: activeDraggingCardData },
		} = active
		const { id: overCardId } = over

		const activeColumn = findColumnByCardId(activeDraggingCardId)
		const overColumn = findColumnByCardId(overCardId)

		if (!activeColumn || !overColumn) return

		if (activeColumn._id !== overColumn._id) {
			moveCardBetweenDifferentColumn(
				overColumn,
				overCardId, 
				active, 
				over, 
				activeColumn, 
				activeDraggingCardId, 
				activeDraggingCardData
			)
		}
	}

	const customDropAnimation = {
		sideEffects: defaultDropAnimationSideEffects({
			styles: { active: { opacity: '0.5' } }
		})
	}
	
	// Function custom thuật toán va chạm của dndkit
	const collisionDetectionStrategy = useCallback((args) => {
		if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
			return closestCorners({ ...args })
		} 

		const pointerIntersections = pointerWithin(args)

		if (!pointerIntersections?.length > 0) return [{ id: null }]

		let overId = getFirstCollision(pointerIntersections, 'id')

		if (overId) {
			const checkColumn = orderedColumns.find(column => column._id === overId)
			if (checkColumn) {
				overId = closestCorners({
					...args,
					droppableContainers: args.droppableContainers.filter(container =>
						(container.id !== overId) && checkColumn?.cardOrderIds?.includes(container.id))
				})[0]?.id
			}

			lastOverId.current = overId
			return [{ id: overId }]
		}

		return lastOverId.current ? [{ id: lastOverId.current }] : []

	}, [activeDragItemType, orderedColumns])
	return (
		<DndContext
			// Collision Detection: thuật toán phát hiện va chạm -> closest corners: khi chạm vào các cạnh của card
			// collisionDetection={closestCorners} // dùng closetCorners mặc định của dndkit sẽ bị bug flickering (nhấp nháy)
			collisionDetection={collisionDetectionStrategy}
			onDragStart={handleDragStart}
			onDragOver={handleDragOver}
			onDragEnd={handleDragEnd}
			sensors={sensors}
		>
			<Box
				sx={{
					bgcolor: (theme) =>
						theme.palette.mode === 'dark'
							? '#1c2c3f'
							: theme.palette.primary.main,
					width: '100%',
					height: (theme) => theme.trello.boardContentHeight,
					display: 'flex',
					pt: 2,
					p: '10px 0',
				}}
			>
				<ListColumns columns={orderedColumns} />
				<DragOverlay dropAnimation={customDropAnimation}>
					{!activeDragItemType && null}
					{activeDragItemType &&
						activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
							<Column column={activeDragItemData} />
						)}
					{activeDragItemType &&
						activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
							<Card card={activeDragItemData} />
						)}
				</DragOverlay>
			</Box>
		</DndContext>
	)
}

export default BoardContent
