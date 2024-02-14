import { Select, SelectContent, SelectTrigger } from './FiltersComponents'

export const FilterSelect = () => (
  <div className='absolute right-6 top-[14px]'>
    <Select>
      <SelectTrigger />
      <SelectContent />
    </Select>
  </div>
)
