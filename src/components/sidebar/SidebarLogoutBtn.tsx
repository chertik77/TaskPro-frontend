import { Link } from "react-router-dom"

export const SidebarLogoutBtn = () => {
  return  <div className="flex items-end mt-6">
   <Link to='/auth/signin' className="flex items-center gap-3.5 "
        aria-label="icon-logout-btn">
          <div className="">
              <svg  width="32" height="32" >
            <use  href="assets/icons.svg#icon-logout-btn"></use>
              </svg>
          </div>
                <p className=" text-base font-medium ">Log out</p>
          </Link>

</div>
}