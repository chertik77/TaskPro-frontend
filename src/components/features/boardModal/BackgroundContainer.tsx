import arr from 'lib/json/board-bg-images.json'
export const BackgroundContainer = () => {
  return (
    <div className='mb-10 mt-[14px] flex max-w-[280px] flex-wrap gap-1'>
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
