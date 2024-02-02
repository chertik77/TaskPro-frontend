import { Button } from 'components/ui/Button'
import { Field } from 'components/ui/Field'
import { Test } from 'components/ui/Test'
import { ThemeProvider } from 'next-themes'

function App() {
  return (
    <>
      <Button size='sm'></Button>
      <Field inputName='name' placeholder='Enter name' width='md' />
      <ThemeProvider attribute='class' themes={['light', 'dark', 'violet']}>
        <Test />
      </ThemeProvider>
    </>
  )
}

export default App
