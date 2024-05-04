import React, { useRef, useState } from 'react'
import { format } from 'date-fns'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { usePopper } from 'react-popper'

import { Calendar } from '../calendar/Calendar'

export default function DatePickerDialog() {
  const [selected, setSelected] = useState<Date>()
  const [isPopperOpen, setIsPopperOpen] = useState(false)

  const popperRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  )

  const popper = usePopper(popperRef.current, popperElement, {
    placement: 'bottom-start'
  })

  const togglePopper = () => {
    setIsPopperOpen(!isPopperOpen)
  }

  return (
    <div>
      <div ref={popperRef}>
        <input
          size={12}
          type='text'
          placeholder={format(new Date(), 'y-MM-dd')}
          value={format(selected || new Date(), 'y-MM-dd')}
          readOnly
        />
        <button
          ref={buttonRef}
          type='button'
          aria-label='Toggle calendar'
          onClick={togglePopper}>
          <MdKeyboardArrowDown />
        </button>
      </div>
      {isPopperOpen && (
        <div
          style={popper.styles.popper}
          {...popper.attributes.popper}
          ref={setPopperElement}
          role='dialog'
          aria-label='DayPicker calendar'>
          <Calendar
            mode='single'
            selected={selected}
            onDayClick={(date: Date) => {
              setSelected(date)
              setIsPopperOpen(false)
            }}
          />
        </div>
      )}
    </div>
  )
}
