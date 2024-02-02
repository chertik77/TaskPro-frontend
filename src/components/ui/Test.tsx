import { useTheme } from 'next-themes'

export const Test = () => {
    const { theme, setTheme } = useTheme()

    return <div>
      The current theme is: {theme}
      <button onClick={() => setTheme('light')}>Light Mode</button>
        <button onClick={() => setTheme('dark')}>Dark Mode</button>
        <button onClick={() => setTheme('violet')}>Violet Mode</button>
    </div>
}


// import { useTheme } from 'next-themes'

// const ThemeChanger = () => {
//   const { theme, setTheme } = useTheme()

//   return (
//     <div>
//       The current theme is: {theme}
//       <button onClick={() => setTheme('light')}>Light Mode</button>
//       <button onClick={() => setTheme('dark')}>Dark Mode</button>
//     </div>
//   )
// }