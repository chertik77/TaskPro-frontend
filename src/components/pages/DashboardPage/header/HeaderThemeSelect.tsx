import { useTheme } from 'next-themes'
import { useSwitchThemeMutation } from 'redux/api/dashboard/dashboard'
import { Select, SelectContent, SelectTrigger } from './HeaderSelectComponents'

export const HeaderThemeSelect = () => {
  const { setTheme } = useTheme()
  const [switchTheme] = useSwitchThemeMutation()

  const handleThemeChange = (e: string) => {
    switchTheme({ userTheme: e }).then(r => {
      if ('data' in r) {
        setTheme(r.data.user.userTheme)
      }
    })
  }

  return (
    <Select onValueChange={handleThemeChange}>
      <SelectTrigger />
      <SelectContent />
    </Select>
  )
}
