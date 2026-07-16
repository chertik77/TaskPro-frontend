import { useNavigate } from '@tanstack/react-router'
import { SettingsIcon } from 'lucide-react'

export const SettingsButton = () => {
  const navigate = useNavigate()

  return (
    <button
      type='button'
      onClick={() => navigate({ to: '/dashboard/settings' })}>
      <SettingsIcon className='size-5' />
    </button>
  )
}
