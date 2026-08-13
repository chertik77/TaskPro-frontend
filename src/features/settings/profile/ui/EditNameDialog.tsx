import { useState } from 'react'
import { PencilIcon } from 'lucide-react'
import * as m from 'motion/react-m'

import { useMe } from '@/entities/user'

import { formVariants, useAppForm } from '@/shared/lib'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  PlusButtonWithLoader
} from '@/shared/ui'

import { useUpdateName } from '../api/useUpdateName'
import { NameSchema } from '../model/contract'

export const EditNameDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const user = useMe()

  const form = useAppForm(NameSchema, {
    shouldUnregister: true,
    defaultValues: { name: user?.name ?? '' }
  })

  const { mutate: updateName, isPending } = useUpdateName(() =>
    setIsDialogOpen(false)
  )

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        className='focus-visible:styled-outline hocus:text-accent flex shrink-0
          cursor-pointer items-center gap-2 transition-colors'>
        <PencilIcon className='size-4' />
        Edit
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit name</DialogTitle>
        <Form {...form}>
          <m.form
            variants={formVariants.container}
            initial='hidden'
            animate='show'
            onSubmit={form.handleSubmit(data => updateName(data))}
            className='space-y-6'>
            <m.div variants={formVariants.field}>
              <FormField
                control={form.control}
                name='name'
                render={() => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl render={<Input />} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </m.div>
            <m.div variants={formVariants.field}>
              <PlusButtonWithLoader
                type='submit'
                shouldShowLoader={isPending}
                disabled={isPending || !form.formState.isDirty}>
                Edit
              </PlusButtonWithLoader>
            </m.div>
          </m.form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
