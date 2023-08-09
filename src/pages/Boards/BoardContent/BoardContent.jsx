import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'

import { 
  DndContext,
  PointerSensor, 
  MouseSensor,
  TouchSensor,
  useSensor, 
  useSensors,
  DragOverlay, 
  defaultDropAnimationSideEffects
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

import { mapOrder } from '~/utils/sorts'

import ListColumns from './ListColumns/ListColumns'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

const BoardContent = ({ board }) => {
  // const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
  const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })
  // const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id')) 
  }, [board])

  const handleDragStart = (e) => {
    setActiveDragItemId(e?.active?.id)
    setActiveDragItemType(e?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(e?.active?.data?.current)
  }

  const handleDragEnd = (e) => {
    const { active, over } = e

    if (!over) return

    if (active.id !== over.id) {
      const prevIndex = orderedColumns.findIndex(column => column._id === active.id)
      const nextIndex = orderedColumns.findIndex(column => column._id === over.id)
      
      const dndKitOrderedColumns = arrayMove(orderedColumns, prevIndex, nextIndex)
      // const orderedColumnIds = dndKitOrderedColumns.map(c => c._id)

      setOrderedColumns(dndKitOrderedColumns)
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } })
  }

  return (
    <DndContext 
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd} 
      sensors={sensors}>
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#1c2c3f' : theme.palette.primary.main),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        display: 'flex',
        pt: 2,
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumns}/>
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && <Column column={activeDragItemData}/>}
          {activeDragItemType && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <Card card={activeDragItemData}/>}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
