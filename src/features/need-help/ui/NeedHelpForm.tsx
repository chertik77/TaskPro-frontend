import { useAppForm } from '@/shared/lib'
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
  closeDialog: () => void
}

export const NeedHelpForm = ({ closeDialog }: NeedHelpFormProps) => {
  const form = useAppForm(HelpSchema, {
    defaultValues: { email: '', comment: '' }
  })

  const { mutate: sendHelpRequest, isPending } = useNeedHelp(
    form.reset,
    closeDialog
  )

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(data => sendHelpRequest({ body: data }))}
        className='space-y-3.5'>
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
          <Button
            type='submit'
            className='mt-6!'
            disabled={isPending}>
            {isPending ? <Loader /> : 'Send'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
