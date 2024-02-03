import { Button } from 'components/ui/button/Button'
import { ThemeProvider } from 'next-themes'

function App() {
  return (
    <>
      <ThemeProvider attribute='class' themes={['light', 'dark', 'violet']}>
        <Button isAddIcon>Add</Button>
      </ThemeProvider>
    </>
  )
}

export default App
