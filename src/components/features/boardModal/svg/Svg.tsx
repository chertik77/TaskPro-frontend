import { AiTwotoneThunderbolt } from 'react-icons/ai'
import { BsBox, BsHexagon } from 'react-icons/bs'

export const Svg = () => {
  return (
    <div
      onClick={e => {
        console.log(e.target)
      }}
      className='flex mt-[14px]'>
      <AiTwotoneThunderbolt className='w-[18px] h-[18px]' />
      <BsBox className='w-[18px] h-[18px]' />
      <BsHexagon className='w-[18px] h-[18px]' />
    </div>
  )
}
