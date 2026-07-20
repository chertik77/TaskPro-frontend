import { useAddPasskey } from '../../api/useAddPasskey'
import { SecurityActionButton } from '../SecurityActionButton'

export const AddPasskeyButton = () => {
  const { mutate: addPasskey, isPending } = useAddPasskey()

  return (
    <SecurityActionButton
      onClick={() => addPasskey()}
      disabled={isPending}>
      {isPending ? 'Adding...' : 'Add'}
    </SecurityActionButton>
  )
}
