import type { Dispatch, SetStateAction } from 'react'

import * as m from 'motion/react-m'

import { FormLabelsCombobox } from '@/entities/label'
import { FormDeadlinePicker, FormPrioritySelector } from '@/entities/task'

import { formVariants, useAppForm } from '@/shared/lib'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  PlusButtonWithLoader,
  TextArea
} from '@/shared/ui'

import { useAddTask } from '../api/useAddTask'
import { AddTaskSchema } from '../model/contract'

type AddTaskFormProps = {
  columnId: string
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export const AddTaskForm = ({
  columnId,
  setIsDialogOpen
}: AddTaskFormProps) => {
  const form = useAppForm(AddTaskSchema, {
    defaultValues: {
      title: '',
      description: '',
      priority: 'without',
      deadline: undefined,
      labels: []
    }
  })

  const { mutate: addTask, isPending } = useAddTask(columnId, setIsDialogOpen)

  return (
    <Form {...form}>
      <m.form
        variants={formVariants.container}
        initial='hidden'
        animate='show'
        onSubmit={form.handleSubmit(data => addTask(data))}>
        <m.div variants={formVariants.field}>
          <FormField
            control={form.control}
            name='title'
            render={() => (
              <FormItem className='mb-3.5'>
                <FormLabel>Title</FormLabel>
                <FormControl render={<Input />} />
                <FormMessage />
              </FormItem>
            )}
          />
        </m.div>
        <m.div variants={formVariants.field}>
          <FormField
            control={form.control}
            name='description'
            render={() => (
              <FormItem className='mb-6'>
                <FormLabel>Description</FormLabel>
                <FormControl render={<TextArea />} />
                <FormMessage />
              </FormItem>
            )}
          />
        </m.div>
        <m.div variants={formVariants.field}>
          <FormField
            control={form.control}
            name='priority'
            render={() => (
              <FormItem className='mb-3.5'>
                <FormLabel>Priority</FormLabel>
                <FormPrioritySelector />
                <FormMessage />
              </FormItem>
            )}
          />
        </m.div>
        <m.div variants={formVariants.field}>
          <FormField
            control={form.control}
            name='labels'
            render={() => (
              <FormItem className='mb-3.5'>
                <FormLabel>Labels</FormLabel>
                <FormLabelsCombobox labelsValues={form.getValues('labels')} />
                <FormMessage />
              </FormItem>
            )}
          />
        </m.div>
        <m.div variants={formVariants.field}>
          <FormField
            control={form.control}
            name='deadline'
            render={() => (
              <FormItem className='mb-6'>
                <FormLabel>Deadline</FormLabel>
                <FormDeadlinePicker mode='create' />
                <FormMessage />
              </FormItem>
            )}
          />
        </m.div>
        <m.div variants={formVariants.field}>
          <PlusButtonWithLoader
            type='submit'
            shouldShowLoader={isPending}
            disabled={isPending}>
            Add
          </PlusButtonWithLoader>
        </m.div>
      </m.form>
    </Form>
  )
}
