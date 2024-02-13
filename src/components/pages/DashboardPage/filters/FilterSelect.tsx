// import { useTheme } from 'next-themes'
import { useSwitchThemeMutation } from 'redux/api/dashboard/dashboard'
import { Select, SelectContent, SelectTrigger } from './FiltersComponents'

export const FilterSelect = () => {
  //   const { setTheme } = useTheme()
  const [switchTheme] = useSwitchThemeMutation()

  const handleFilter = (e: string) => {
    switchTheme({ userTheme: e }).then(r => {
      if ('data' in r) {
        console.log(r.data.user.userTheme)
      }
    })
  }

  return (
    <Select onValueChange={handleFilter}>
      <SelectTrigger />
      <SelectContent />
    </Select>
  )
}
