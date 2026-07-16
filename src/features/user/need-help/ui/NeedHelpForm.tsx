import type { Dispatch, SetStateAction } from 'react'

import * as m from 'motion/react-m'

import { formVariants, useAppForm } from '@/shared/lib'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Loader,
  TextArea
} from '@/shared/ui'

import { useNeedHelp } from '../api/useNeedHelp'
import { HelpSchema } from '../model/contract'

type NeedHelpFormProps = {
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export const NeedHelpForm = ({ setIsDialogOpen }: NeedHelpFormProps) => {
  const form = useAppForm(HelpSchema, {
    defaultValues: { email: '', comment: '' }
  })

  const { mutate: sendHelpRequest, isPending } = useNeedHelp(
    form.reset,
    setIsDialogOpen
  )

  return (
    <Form {...form}>
      <m.form
        variants={formVariants.container}
        initial='hidden'
        animate='show'
        onSubmit={form.handleSubmit(data => sendHelpRequest({ body: data }))}
        className='space-y-3.5'>
        <m.div variants={formVariants.field}>
          <FormField
            control={form.control}
            name='email'
            render={() => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl render={<Input />} />
                <FormMessage />
              </FormItem>
            )}
          />
        </m.div>
        <m.div variants={formVariants.field}>
          <FormField
            control={form.control}
            name='comment'
            render={() => (
              <FormItem>
                <FormLabel>Comment</FormLabel>
                <FormControl render={<TextArea />} />
                <FormMessage />
              </FormItem>
            )}
          />
        </m.div>
        <m.div variants={formVariants.field}>
          <Button
            type='submit'
            className='mt-6!'
            disabled={isPending}>
            {isPending ? <Loader /> : 'Send'}
          </Button>
        </m.div>
      </m.form>
    </Form>
  )
}
