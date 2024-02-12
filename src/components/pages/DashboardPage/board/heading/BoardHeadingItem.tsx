type BoardHeadingItemProps = {
  title: string
}

export const BoardHeadingItem = ({ title }: BoardHeadingItemProps) => {
  return (
    <div className='inline-flex h-[56px] w-[100%] min-w-[285px] items-center rounded-[8px] bg-white px-[20px] pb-[17px] pt-[18px] dark:bg-black mobile:w-[335px] tablet:w-[334px]'>
      <div className='text-fs-14-lh-normal-fw-500'>{title}</div>
      <div className='ml-auto flex gap-[8px]'>
        <button>
          <svg className='size-[16px] stroke-black/50 transition duration-300 ease-in-out hocus:stroke-black dark:stroke-white/50 dark:hocus:stroke-white'>
            <use xlinkHref='/assets/icons.svg#icon-pencil-btn'></use>
          </svg>
        </button>
        <button>
          <svg className='size-[16px] stroke-black/50 transition duration-300 ease-in-out hocus:stroke-black dark:stroke-white/50 dark:hocus:stroke-white'>
            <use xlinkHref='/assets/icons.svg#icon-trash-btn'></use>
          </svg>
        </button>
      </div>
    </div>
  )
}
