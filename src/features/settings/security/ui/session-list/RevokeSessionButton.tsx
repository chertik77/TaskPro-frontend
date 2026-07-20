import { Loader } from '@/shared/ui'

import { useRevokeSession } from '../../api/useRevokeSession'
import { SecurityActionButton } from '../SecurityActionButton'

type RevokeSessionButtonProps = {
  sessionId: string
  isCurrent: boolean
}

export const RevokeSessionButton = ({
  sessionId,
  isCurrent
}: RevokeSessionButtonProps) => {
  const { mutate: revokeSession, isPending, variables } = useRevokeSession()

  const isRevoking = isPending && variables?.id === sessionId

  return (
    <SecurityActionButton
      disabled={isRevoking}
      onClick={() => revokeSession({ id: sessionId })}>
      {isRevoking ? (
        <div className='flex items-center gap-1'>
          <Loader className='size-4' />
          {isCurrent ? 'Logging out...' : 'Revoking...'}
        </div>
      ) : isCurrent ? (
        'Log out'
      ) : (
        'Revoke'
      )}
    </SecurityActionButton>
  )
}
