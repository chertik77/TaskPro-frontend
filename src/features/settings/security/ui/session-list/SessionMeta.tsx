import { Fragment } from 'react'
import { Separator } from '@base-ui/react/separator'
import { formatDistanceToNowStrict } from 'date-fns'

type SessionMetaProps = {
  isCurrent: boolean
  updatedAt: Date | string | null | undefined
}

export const SessionMeta = ({ isCurrent, updatedAt }: SessionMetaProps) => {
  const meta = [
    isCurrent && (
      <div
        key='current'
        className='flex items-center gap-1 text-green-500'>
        <span className='size-2 rounded-full bg-current' />
        Current session
      </div>
    ),

    !isCurrent && updatedAt && (
      <span key='last-active'>
        Last active{' '}
        {formatDistanceToNowStrict(new Date(updatedAt), {
          addSuffix: true
        })}
      </span>
    )
  ].filter(Boolean)

  return (
    <div
      className='text-md flex items-center gap-2 text-black/50
        dark:text-white/50'>
      {meta.map((item, index) => (
        <Fragment key={index}>
          {index > 0 && (
            <Separator className='size-1 rounded-full bg-current' />
          )}
          {item}
        </Fragment>
      ))}
    </div>
  )
}
