import { Activity, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { Icon, Input } from '@/shared/ui'

import { useCardFilters } from '../lib/useCardFilters'

export const SearchFilter = () => {
  const { searchParam, handleParamsChange } = useCardFilters()

  const [localSearch, setLocalSearch] = useState(searchParam ?? '')

  const debouncedParamsChange = useDebouncedCallback(value => {
    handleParamsChange('search', value)
  }, 250)

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className='relative'>
      <Input
        ref={inputRef}
        placeholder='Search cards...'
        className='pr-12'
        value={localSearch}
        onChange={e => {
          const value = e.target.value
          setLocalSearch(value)
          debouncedParamsChange(value)
        }}
      />
      <Activity mode={searchParam ? 'visible' : 'hidden'}>
        <button
          type='button'
          className='focus-visible:styled-outline absolute top-3.5 right-3.5'
          onClick={() => {
            setLocalSearch('')
            handleParamsChange('search', '')
            debouncedParamsChange.cancel()
            inputRef.current?.focus()
          }}>
          <Icon
            name='close'
            className='size-4.5'
          />
        </button>
      </Activity>
    </div>
  )
}
