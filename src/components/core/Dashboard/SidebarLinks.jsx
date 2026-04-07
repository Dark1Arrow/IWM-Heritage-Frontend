import * as Icons from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { matchPath, useLocation, NavLink } from "react-router-dom"
import { setOpenSideMenu } from "../../../redux/api/slices/sidebarSlice.js"

const SidebarLinks = ({ link, iconName ,className }) => {
  const Icon = Icons[iconName]
  const location = useLocation()
  const dispatch = useDispatch()

  const { openSideMenu, screenSize } = useSelector((state) => state.sidebar)

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  const handleClick = () => {
    if (openSideMenu && screenSize <= 640) dispatch(setOpenSideMenu(false))
  }

  return (
    <NavLink
      to={link.path}
      onClick={handleClick}
      className={`relative px-8 py-3 text-[15px] font-semibold transition-all duration-300 ${className} ${
        matchRoute(link.path)
          ? "bg-[#5C3317] text-[#FFF9F3]" // Deep brown background, Cream text
          : "text-[#5C3317] hover:bg-[#F2E8DA]" // Deep brown text, light beige hover
      }`}
    >
      {/* Left Gold Indicator Strip */}
      <span
        className={`absolute left-0 top-0 h-full w-[0.25rem] bg-[#D4B044] transition-all duration-300 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>

      <div className="flex items-center gap-x-3">
        {/* Icon size and color adjustment */}
        <Icon className={`text-xl ${matchRoute(link.path) ? "text-[#FFF9F3]" : "text-[#5C3317]"}`} />
        <span className="tracking-wide">{link.name}</span>
      </div>
    </NavLink>
  )
}

export default SidebarLinks