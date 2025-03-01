import { useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import * as RadioGroup from '@radix-ui/react-radio-group'

import {
  CardContracts,
  formatTodayDate,
  getPriorityColor,
  PRIORITIES
} from '@/entities/card'

import { useAppForm } from '@/shared/hooks'
import { cn } from '@/shared/lib/cn'
import {
  Calendar,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icon,
  Input,
  Modal,
  PlusButton,
  TextArea
} from '@/shared/ui'

import { useAddCard } from '../hooks/useAddCard'

export const AddCardModal = () => {
  const form = useAppForm(CardContracts.CardSchema, {
    defaultValues: { priority: 'Without', deadline: new Date() }
  })

  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const { mutate: addCard, isPending } = useAddCard(form.reset)

  return (
    <Modal modalTitle='Add card'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(data => addCard(data))}>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem className='mb-3.5'>
                <FormControl>
                  <Input
                    placeholder='Title'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='mb-6'>
                <FormControl>
                  <TextArea
                    placeholder='Description'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='priority'
            render={({ field }) => (
              <FormItem className='mb-3.5'>
                <FormLabel className='mb-1 text-md text-black/50 dark:text-white/50'>
                  Label color
                </FormLabel>
                <FormControl>
                  <RadioGroup.Root
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    className='flex gap-2'>
                    {PRIORITIES.map(priority => (
                      <FormItem key={priority}>
                        <FormControl>
                          <RadioGroup.Item
                            className={cn(
                              'focus-visible:styled-outline size-3.5 rounded-full',
                              getPriorityColor(priority)
                            )}
                            value={priority}>
                            <RadioGroup.Indicator
                              // eslint-disable-next-line tailwindcss/no-custom-classname
                              className={cn(
                                `flex justify-center rounded-full after:size-3 after:rounded-full after:border-2
                                after:border-white after:dark:border-black`,
                                `after:${getPriorityColor(priority)}`
                              )}
                            />
                          </RadioGroup.Item>
                        </FormControl>
                      </FormItem>
                    ))}
                  </RadioGroup.Root>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='deadline'
            render={({ field }) => (
              <FormItem className='mb-6'>
                <FormLabel className='mb-1 text-md text-black/50 dark:text-white/50'>
                  Deadline
                </FormLabel>
                <Popover.Root
                  open={isCalendarOpen}
                  onOpenChange={setIsCalendarOpen}>
                  <Popover.Trigger asChild>
                    <FormControl>
                      <button
                        type='button'
                        className='focus-visible:styled-outline mb-[40px] flex items-center gap-1 text-brand
                          violet:text-brand-violet'>
                        {formatTodayDate(field.value)}
                        <Icon
                          name='chevron-down'
                          className='size-4.5 stroke-current'
                        />
                      </button>
                    </FormControl>
                  </Popover.Trigger>
                  <Popover.Content
                    side='top'
                    sideOffset={5}
                    className='animation z-[1000]'
                    align='start'>
                    <Calendar
                      mode='single'
                      startMonth={field.value}
                      defaultMonth={field.value}
                      selected={field.value}
                      onSelect={date => {
                        field.onChange(date)
                        setIsCalendarOpen(false)
                      }}
                    />
                  </Popover.Content>
                </Popover.Root>
              </FormItem>
            )}
          />
          <PlusButton
            type='submit'
            shouldShowLoader={isPending}
            disabled={isPending}>
            Add
          </PlusButton>
        </form>
      </Form>
    </Modal>
  )
}
