import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { matchPath } from "react-router-dom"

import useOnClickOutside from "../../hooks/useOnOneClick"
import { logout } from "../../redux/api/operation/authApi"
import Img from "./Img"

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  if (!user) return null

  return (
    <button className="relative hidden sm:flex outline-none" onClick={() => setOpen(!open)}>
      <div className="flex items-center gap-x-1 group">
        <Img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          // Updated to Amber/Gold border
          className={'aspect-square w-[40px] rounded-full object-cover border-2 border-white group-hover:border-amber-500 transition-all duration-200 shadow-md'}
        />
        <AiOutlineCaretDown className={`text-sm text-white transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`} />
      </div>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          ref={ref}
          // Updated to Cream background (fdfaf1) and Amber borders
          className="absolute top-[135%] right-0 z-[50] divide-y-[1px] divide-amber-800/20 overflow-hidden rounded-lg border-2 border-[#95846a] bg-[#fdfaf1] shadow-[5px_5px_15px_rgba(0,0,0,0.2)] animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Decorative Triangle Tip - Matches Cream background */}
          <div className="absolute -top-1 right-3 h-2 w-2 rotate-45 bg-[#fdfaf1] border-t border-l border-amber-800"></div>

          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className={`flex w-full min-w-[160px] items-center gap-x-2 py-[12px] px-[16px] text-sm font-medium transition-all duration-2001 ${matchRoute("/dashboard/my-profile")
                ? "bg-[#5C3317] text-[#FFF9F3]" // Deep brown background, Cream text
                : "text-[#5C3317] hover:bg-[#F2E8DA]" // Deep brown text, light beige hover
              }`}>
              <VscDashboard className="text-lg group-hover:text-inherit" />
              Dashboard
            </div>
          </Link>

          <div
            onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
            }}
            // Logout styled in a deep crimson/red for the heritage look
            className="flex w-full items-center gap-x-2 py-[12px] px-[16px] text-sm font-bold text-red-800 hover:text-white hover:bg-[#5C3317] transition-all duration-200 cursor-pointer"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  )
}