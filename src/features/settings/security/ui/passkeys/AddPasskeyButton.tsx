import { useAddPasskey } from '../../api/useAddPasskey'

export const AddPasskeyButton = () => {
  const { mutate: addPasskey, isPending } = useAddPasskey()

  return (
    <button
      onClick={() => addPasskey()}
      disabled={isPending}
      className='focus-visible:styled-outline enabled:hocus:text-accent ml-auto
        disabled:cursor-not-allowed disabled:opacity-50'>
      {isPending ? 'Adding...' : 'Add'}
    </button>
  )
}
