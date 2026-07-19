import { useEffect, useState } from 'react'
import { PencilIcon } from 'lucide-react'
import * as m from 'motion/react-m'

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

import { useUpdatePasskey } from '../../api/useUpdatePasskey'
import { AddPasskeyNameSchema } from '../../model/contract'

type EditPasskeyNameDialogProps = {
  passkeyId: string
  name: string
}

export const EditPasskeyNameDialog = ({
  passkeyId,
  name
}: EditPasskeyNameDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useAppForm(AddPasskeyNameSchema, {
    defaultValues: { name }
  })

  const { mutate: updatePasskey, isPending } = useUpdatePasskey(() =>
    setIsDialogOpen(false)
  )

  useEffect(() => {
    form.reset({ name })
  }, [form, name])

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        aria-label='Edit passkey'
        className='focus-visible:styled-outline dark:text-white-soft
          hocus:[&_svg]:opacity-100 text-black [&_svg]:size-4 [&_svg]:opacity-50
          [&_svg]:transition-opacity'>
        <PencilIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit passkey</DialogTitle>
        <Form {...form}>
          <m.form
            variants={formVariants.container}
            initial='hidden'
            animate='show'
            onSubmit={form.handleSubmit(data =>
              updatePasskey({ id: passkeyId, ...data })
            )}
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
