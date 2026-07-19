import { useAccountConnection } from '../../api/useAccountConnection'

type AccountConnectionButtonProps = {
  isConnected: boolean
  providerId: string
}

export const AccountConnectionButton = ({
  isConnected,
  providerId
}: AccountConnectionButtonProps) => {
  const { mutate, isPending } = useAccountConnection()

  return (
    <button
      onClick={() => mutate({ providerId, isConnected })}
      disabled={isPending}
      className='focus-visible:styled-outline enabled:hocus:text-accent ml-auto
        disabled:cursor-not-allowed disabled:opacity-50'>
      {isPending
        ? isConnected
          ? 'Disconnecting...'
          : 'Connecting...'
        : isConnected
          ? 'Disconnect'
          : 'Connect'}
    </button>
  )
}
