import { Loader } from '@/shared/ui'

import { useRevokeSession } from '../../api/useRevokeSession'

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
    <button
      disabled={isRevoking}
      onClick={() => revokeSession({ id: sessionId })}
      className='focus-visible:styled-outline enabled:hocus:text-accent ml-auto
        disabled:cursor-not-allowed disabled:opacity-50'>
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
    </button>
  )
}
