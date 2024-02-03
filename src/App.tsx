import { ThemeProvider } from 'next-themes'
import { Test } from 'components/ui/Test'
import { AuthPage } from 'pages/AuthPage'
function App() {
  return (
    <ThemeProvider attribute='class' themes={['light', 'dark', 'violet']}>
      <Test />
      <AuthPage />
    </ThemeProvider>
  )
}

export default App
