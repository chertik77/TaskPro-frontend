export const Svg = () => {
  return (
    <div
      onClick={e => {
        console.log(e.target)
      }}
      className='flex gap-2 mt-[14px]'>
      <svg className=' opacity-50' width='18' height='18'>
        <use href='/public/assets/icons.svg#icon-project-1'></use>
      </svg>
      <svg className=' opacity-50' width='18' height='18'>
        <use href='/public/assets/icons.svg#icon-star-2'></use>
      </svg>
      <svg className=' opacity-50' width='18' height='18'>
        <use href='/public/assets/icons.svg#icon-loading-3'></use>
      </svg>
      <svg className=' opacity-50' width='18' height='18'>
        <use href='/public/assets/icons.svg#icon-puzzle-piece-4'></use>
      </svg>
      <svg className=' opacity-50' width='18' height='18'>
        <use href='/public/assets/icons.svg#icon-container-5'></use>
      </svg>
      <svg className=' opacity-50' width='18' height='18'>
        <use href='/public/assets/icons.svg#icon-lightning-6'></use>
      </svg>
      <svg className=' opacity-50' width='18' height='18'>
        <use href='/public/assets/icons.svg#icon-colors-7'></use>
      </svg>

      <svg className=' opacity-50' width='18' height='18'>
        <use href='/public/assets/icons.svg#icon-hexagon-8'></use>
      </svg>
    </div>
  )
}
