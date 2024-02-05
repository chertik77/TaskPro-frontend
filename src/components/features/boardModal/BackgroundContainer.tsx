import arr from '../../../lib/json/board-bg-images.json'
export const BackgroundContainer = () => {
  return (
    <div className='flex flex-wrap gap-1 mt-[14px] mb-10 max-w-[280px]'>
      {arr.map((bg, i) => {
        return (
          <img
            key={i}
            width={28}
            height={28}
            srcSet={`${bg.icon['@1x'] || bg.icon.light?.['@1x']} 1x,${bg.icon['@2x'] || bg.icon.light?.['@2x']} 2x`}
            src={`${bg.icon['@1x'] || bg.icon.light?.['@1x']}`}
          />
        )
      })}
    </div>
  )
}
