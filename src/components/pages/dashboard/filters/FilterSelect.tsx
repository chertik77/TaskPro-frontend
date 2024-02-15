import { Select, SelectContent, SelectTrigger } from './FiltersSelectComponents'

export const FilterSelect = () => {
  const handleFilterChange = (e: string) => {
    console.log(e)
  }
  return (
    <Select onValueChange={handleFilterChange}>
      <SelectTrigger />
      <SelectContent />
    </Select>
  )
}
