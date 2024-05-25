import { useTheme } from 'contexts/theme.context'
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
