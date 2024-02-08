// import arr from 'lib/json/board-bg-images.json'
// export const BackgroundContainer = ({ handleBgChange }: IconProps) => {
//   return (
//     <div className='mb-10 mt-[14px] flex max-w-[280px] flex-wrap gap-1'>
//       {arr.map((bg, i) => {
//         return (
//           <img
//             key={i}
//             width={28}
//             height={28}
//             srcSet={`${bg.icon['@1x'] || bg.icon.light?.['@1x']} 1x,${bg.icon['@2x'] || bg.icon.light?.['@2x']} 2x`}
//             src={`${bg.icon['@1x'] || bg.icon.light?.['@1x']}`}
//           />
//         )
//       })}
//     </div>
//   )
// }

import arr from 'lib/json/board-bg-images.json'
// import type { ChangeEventHandler } from 'react'

type BackgroundContainerProps = {
  handleBgChange?: (selectedBackground: string) => void
}

export const BackgroundContainer = ({
  handleBgChange
}: BackgroundContainerProps) => {
  return (
    <div className='mb-10 mt-[14px] flex max-w-[280px] flex-wrap gap-1'>
      {arr.map((bg, i) => (
        <label className='relative cursor-pointer' key={i}>
          <input
            type='radio'
            name='background'
            defaultChecked={i === 0}
            value={bg.icon['@1x'] || bg.icon.light?.['@1x']}
            onChange={e => handleBgChange && handleBgChange(e.target.value)}
            className='absolute size-full opacity-0'
          />
          <img
            width={28}
            height={28}
            srcSet={`${bg.icon['@1x'] || bg.icon.light?.['@1x']} 1x, ${bg.icon['@2x'] || bg.icon.light?.['@2x']} 2x`}
            src={`${bg.icon['@1x'] || bg.icon.light?.['@1x']}`}
            style={{ cursor: 'pointer' }}
          />
        </label>
      ))}
    </div>
  )
}
