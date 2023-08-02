import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'

import { 
  DndContext,
  PointerSensor, 
  MouseSensor,
  TouchSensor,
  useSensor, 
  useSensors } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

import { mapOrder } from '~/utils/sorts'
import ListColumns from './ListColumns/ListColumns'

const BoardContent = ({ board }) => {
  // const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
  const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })
  // const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id')) 
  }, [board])

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
    
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
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
    </DndContext>
  )
}

export default BoardContent
