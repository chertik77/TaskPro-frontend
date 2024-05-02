import { filter } from 'redux/slices/board/board-slice'

import { useAppDispatch } from 'hooks'

import { Select, SelectContent, SelectTrigger } from './FiltersSelectComponents'

export const FilterSelect = () => {
  const dispatch = useAppDispatch()

  const handleFilterChange = (e: string) => {
    dispatch(filter(e))
  }
  return (
    <Select onValueChange={handleFilterChange}>
      <SelectTrigger />
      <SelectContent />
    </Select>
  )
}
