import { Activity, useRef, useState } from 'react'
import { XIcon } from 'lucide-react'
import { useDebouncedCallback } from 'use-debounce'

import { Input } from '@/shared/ui'

import { useTaskFilters } from '../lib/useTaskFilters'

export const SearchFilter = () => {
  const { search, setFilter } = useTaskFilters()

  const [localSearch, setLocalSearch] = useState(search)
  const [previousSearch, setPreviousSearch] = useState(search)

  const debouncedParamsChange = useDebouncedCallback((value: string) => {
    setFilter('search', value)
  }, 250)

  if (search !== previousSearch) {
    setPreviousSearch(search)

    if (!debouncedParamsChange.isPending()) setLocalSearch(search)
  }

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className='relative'>
      <Input
        ref={inputRef}
        placeholder='Search title, description, labels...'
        className='pr-10'
        value={localSearch}
        onChange={e => {
          const value = e.target.value
          setLocalSearch(value)
          debouncedParamsChange(value)
        }}
      />
      <Activity mode={localSearch ? 'visible' : 'hidden'}>
        <button
          type='button'
          className='focus-visible:styled-outline absolute top-3.5 right-3.5'
          onClick={() => {
            setLocalSearch('')
            setFilter('search', '')
            debouncedParamsChange.cancel()
            inputRef.current?.focus()
          }}>
          <XIcon className='size-4.5' />
        </button>
      </Activity>
    </div>
  )
}
