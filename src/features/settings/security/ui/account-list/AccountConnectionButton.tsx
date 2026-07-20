import { useAccountConnection } from '../../api/useAccountConnection'
import { SecurityActionButton } from '../SecurityActionButton'

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
    <SecurityActionButton
      onClick={() => mutate({ providerId, isConnected })}
      disabled={isPending}>
      {isPending
        ? isConnected
          ? 'Disconnecting...'
          : 'Connecting...'
        : isConnected
          ? 'Disconnect'
          : 'Connect'}
    </SecurityActionButton>
  )
}
