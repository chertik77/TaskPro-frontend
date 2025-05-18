import { useState } from 'react'

import { useAppForm } from '@/shared/hooks'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Loader,
  TextArea
} from '@/shared/ui'

import { useNeedHelp } from '../hooks/useNeedHelp'
import { HelpSchema } from '../need-help.contract'
import { NeedHelpDialogTrigger } from './NeedHelpDialogTrigger'

export const NeedHelpDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useAppForm(HelpSchema, {
    defaultValues: { email: '', comment: '' }
  })

  const { mutate: sendHelpRequest, isPending } = useNeedHelp(
    form.reset,
    setIsDialogOpen
  )

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}>
      <NeedHelpDialogTrigger />
      <DialogContent className='max-tablet:w-84'>
        <DialogTitle>Need help</DialogTitle>
        <DialogDescription className='sr-only'>
          You can contact us here by sending us an email.
        </DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(data => sendHelpRequest(data))}
            className='space-y-3.5'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Email address'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='comment'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextArea
                      placeholder='Comment'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              className='!mt-6'
              disabled={isPending}>
              {isPending ? <Loader /> : 'Send'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
