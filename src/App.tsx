import { ThemeProvider } from 'next-themes'
import { Test } from 'components/ui/Test'
 
function App() {
  return (
    <ThemeProvider attribute='class' themes={['light', 'dark', 'violet']}>
      <Test/>
    </ThemeProvider>
  )
}
 
export default App
