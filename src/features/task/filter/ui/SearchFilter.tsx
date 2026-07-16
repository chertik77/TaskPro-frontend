import { Activity, useRef, useState } from 'react'
import { XIcon } from 'lucide-react'
import { useDebouncedCallback } from 'use-debounce'

import { Input } from '@/shared/ui'

import { useTaskFilters } from '../lib/useTaskFilters'

export const SearchFilter = () => {
  const { search, handleParamsChange } = useTaskFilters()

  const [localSearch, setLocalSearch] = useState(search ?? '')

  const debouncedParamsChange = useDebouncedCallback(value => {
    handleParamsChange('search', value)
  }, 250)

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className='relative'>
      <Input
        ref={inputRef}
        placeholder='Search tasks...'
        className='pr-12'
        value={localSearch}
        onChange={e => {
          const value = e.target.value
          setLocalSearch(value)
          debouncedParamsChange(value)
        }}
      />
      <Activity mode={search ? 'visible' : 'hidden'}>
        <button
          type='button'
          className='focus-visible:styled-outline absolute top-3.5 right-3.5'
          onClick={() => {
            setLocalSearch('')
            handleParamsChange('search', '')
            debouncedParamsChange.cancel()
            inputRef.current?.focus()
          }}>
          <XIcon className='size-4.5' />
        </button>
      </Activity>
    </div>
  )
}
