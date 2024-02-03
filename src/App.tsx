import { Button } from 'components/ui/button/Button'
import { ThemeProvider } from 'next-themes'
import { AuthPage } from 'pages/AuthPage'

function App() {
  return (
    <>
      <ThemeProvider attribute='class' themes={['light', 'dark', 'violet']}>
        <Button isAddIcon>Add</Button>
        <AuthPage />
      </ThemeProvider>
    </>
  )
}

export default App
