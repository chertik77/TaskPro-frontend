import { ThemeProvider } from 'next-themes'

function App() {
  return (
    <>
      <ThemeProvider
        attribute='class'
        themes={['light', 'dark', 'violet']}></ThemeProvider>
    </>
  )
}

export default App
