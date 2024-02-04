import { Button } from "components/ui/button/Button"

export const Sidebar = () => {
    return <div className="w-56 md:w-[260px] p-3.5 md:p-6  h-screen flex-grow bg-[#161616] flex flex-col" >
        <div className="inline-flex  mb-[70px] md:mb-[60px] gap-2">
            <div>icon</div>
            <div className="font-semibold text-base text-white ">Task Pro</div>
    </div>
        <p className="text-white opacity-50 text-sm font-normal leading-normal tracking-tight mb-0.5 ">
           My boards
        </p>

        <div className="py-3.5 border-y border-white border-opacity-50 mb-10">
            <p className="inline-flex mr-[77px] w-[76px] text-white font-medium leading-normal tracking-tight">
                Create a new board</p>
<Button>+</Button>
        </div>

<div className="mb-auto"><ul className="text-white"><li >Доска для примера</li></ul></div>



        <div className="h-[238px] md:h-[272px] rounded-8 bg-[#1F1F1F]">
            <div className="m-[15px] md:m-5">
                <div className="mb-3.5 ">
<picture >
   <source
      srcSet="/images/helpIcon.png 1x, 
         /images/helpIcon@2x.png 2x"/>
   <img
      src="/images/2.png "
      alt="Need help icon"/>
                    </picture>
                    </div>
            <p className="text-white text-sm font-normal">If you need help with <span className="text-[#BEDBB0]">TaskPro</span>, check out our support resources or reach out to our customer support team.</p>
            <div className="flex">
                <div>icon</div>
                <p className="text-white font-medium">Need help?</p>
            </div></div>
           
        </div>



        <div className="flex items-end mt-6 ">
            <div>icon</div>
            <p className="text-white text-base font-medium ">Log out</p>
</div>


    </div>
}