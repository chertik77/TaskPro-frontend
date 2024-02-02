import { Test } from 'components/ui/Test'
import { ThemeProvider } from 'next-themes'

function App() {
  return (
    <ThemeProvider attribute='class' themes={['light', 'dark', 'violet']}>
      <Test />
    </ThemeProvider>
  )
}

export default App
