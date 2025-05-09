import { useAppForm } from '@/shared/hooks'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Loader,
  Modal,
  TextArea
} from '@/shared/ui'

import { useNeedHelp } from '../hooks/useNeedHelp'
import { HelpSchema } from '../need-help.contract'

export const NeedHelpModal = () => {
  const form = useAppForm(HelpSchema, {
    defaultValues: { email: '', comment: '' }
  })

  const { mutate: sendHelpRequest, isPending } = useNeedHelp(form.reset)

  return (
    <Modal modalTitle='Need help'>
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
    </Modal>
  )
}
