import type { Dispatch, SetStateAction } from 'react'

import { useAppForm } from '@/shared/lib'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
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
      <form
        onSubmit={form.handleSubmit(data => sendHelpRequest(data))}
        className='space-y-3.5'>
        <FormField
          control={form.control}
          name='email'
          render={() => (
            <FormItem>
              <FormControl
                render={<Input />}
                placeholder='Email address'
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='comment'
          render={() => (
            <FormItem>
              <FormControl
                render={<TextArea />}
                placeholder='Comment'
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='mt-6!'
          disabled={isPending}>
          {isPending ? <Loader /> : 'Send'}
        </Button>
      </form>
    </Form>
  )
}
