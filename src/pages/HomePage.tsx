import { Link } from "@tanstack/react-router"
import { Logo, Picture } from "components/pages/HomePage/Images"

export const HomePage = () => {
  return (
    <div className='bg-welcome-page-gradient'>
      <Picture />
      <div className="flex gap-[14px] justify-center items-center pt-[14px] tablet:pt-[24px] desktop:pt-[24px]">
        <Logo/>
        <h1 className="text-fs-28-lh-normal-fw-600 tablet:text-fs-40-lh-normal-fw-600 desktop:text-fs-40-lh-normal-fw-600 text-black">Task Pro</h1>
      </div>
      <p className="text-fs-14-lh-1.28-fw-400 w-[335px] tablet:w-[473px] desktop:w-[473px] text-black pt-6 text-center mx-auto">Supercharge your productivity and take control of your tasks with Task Pro - Don't wait, start achieving your goals now!</p>
      <ul className="pt-12 flex flex-col gap-[14px] justify-center items-center pb-[211px] tablet:pb-[293px] desktop:pb-[166px]">
        <li className="w-[335px] h-[49px] rounded-lg bg-black text-fs-14-lh-normal-fw-500 text-white text-center py-[14px]"><Link to='/signup'>Registration</Link> </li>
        <li className="text-fs-14-lh-normal-fw-500 text-black"><Link to='/signin'>Log In</Link> </li>
      </ul>
    </div>
  )
}
