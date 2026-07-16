import type { Variants } from 'motion/react'

import { Link } from '@tanstack/react-router'
import { stagger } from 'motion/react'
import * as m from 'motion/react-m'

import { authClient } from '@/shared/api'
import { env } from '@/shared/config'
import { Icon } from '@/shared/ui'

import { SocialButton } from './SocialButton'

const MotionLink = m.create(Link)

const container: Variants = {
  hidden: {},
  show: { transition: { delayChildren: stagger(0.12) } }
}

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
}

export const WelcomePage = () => {
  const continueWithSocial = async (provider: 'google' | 'microsoft') => {
    await authClient.signIn.social({
      provider,
      callbackURL: env.VITE_BASE_URL,
      errorCallbackURL: env.VITE_BASE_URL + '?error=oauth_error'
    })
  }

  return (
    <div className='fixed top-0 right-0 block h-12 w-screen'>
      <m.div
        variants={container}
        initial='hidden'
        animate='show'
        className='bg-soft-green flex h-screen flex-col items-center
          justify-center'>
        <m.img
          variants={item}
          animate={{ y: [0, -8, 0] }}
          transition={{
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }
          }}
          className='tablet:size-40.5 size-31'
          src='https://res.cloudinary.com/dmbnnewoy/image/upload/v1733568457/TaskPro/welcome.png'
          alt='User with notebook'
        />
        <m.div
          variants={item}
          className='mt-6 flex items-center gap-3.5 text-white'>
          <Icon
            name='logo'
            className='tablet:size-12 size-10'
          />
          <h1 className='tablet:text-3xl text-2xl text-black'>Task Pro</h1>
        </m.div>
        <m.p
          variants={item}
          className='tablet:w-118.25 mt-6 mb-8 w-84 text-center text-base
            text-black'>
          Supercharge your productivity and take control of your tasks with Task
          Pro - Don&apos;t wait, start achieving your goals now!
        </m.p>
        <m.div
          variants={item}
          className='space-y-3.5'>
          <SocialButton
            provider='google'
            onClick={() => continueWithSocial('google')}
          />
          <SocialButton
            provider='microsoft'
            onClick={() => continueWithSocial('microsoft')}
          />
          <MotionLink
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            transition={{ duration: 0.15 }}
            to='/auth/signup'
            className='block w-84 rounded-lg bg-black py-3.5 text-center
              text-white'>
            Registration
          </MotionLink>
          <MotionLink
            whileHover={{ opacity: 0.7 }}
            to='/auth/signin'
            className='focus-visible:styled-outline block text-center
              text-black'>
            Log In
          </MotionLink>
        </m.div>
      </m.div>
    </div>
  )
}
