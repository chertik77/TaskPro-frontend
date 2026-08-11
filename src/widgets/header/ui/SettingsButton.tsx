import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { SettingsIcon } from 'lucide-react'

import { SettingsMobileMenu } from '@/entities/setting'

import { useMediaQuery } from '@/shared/lib'

export const SettingsButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isMobile = useMediaQuery('(max-width: 767px)')

  const navigate = useNavigate()

  const handleClick = () => {
    if (isMobile) setIsMenuOpen(true)
    else navigate({ to: '/dashboard/settings' })
  }

  return (
    <>
      <button
        type='button'
        aria-label='Settings'
        className='focus-visible:styled-outline'
        onClick={handleClick}>
        <SettingsIcon className='size-5' />
      </button>
      <SettingsMobileMenu
        isOpen={isMobile && isMenuOpen}
        onOpenChange={setIsMenuOpen}
      />
    </>
  )
}
