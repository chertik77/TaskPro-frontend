import { useTheme } from 'next-themes'
import FadeLoader from 'react-spinners/FadeLoader'

export const Loader = () => {
  const { theme } = useTheme()

  return (
    <FadeLoader
      loading
      color={theme === 'dark' ? 'white' : 'black'}
    />
  )
}
