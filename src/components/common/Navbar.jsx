import { useEffect, useState } from "react"
import { Link, useLocation, matchPath } from "react-router-dom"
import { useSelector } from "react-redux"
import { MdKeyboardArrowDown } from "react-icons/md"
import { navbarLinks } from "../../../data/dashboardLinks"

// Integrated Imports
import ProfileDropDown from "../common/ProfileDropDown"
import MobileProfileDropDown from "../core/auth/MobileDropDown"

const Navbar = () => {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const location = useLocation()

  // States for dynamic functionality
  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [showNavbar, setShowNavbar] = useState('top')
  const [lastScrollY, setLastScrollY] = useState(0)

  // Scroll visibility logic
  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > 200) {
        if (window.scrollY > lastScrollY) setShowNavbar('hide')
        else setShowNavbar('show')
      } else {
        setShowNavbar('top')
      }
      setLastScrollY(window.scrollY)
    }
    window.addEventListener('scroll', controlNavbar)
    return () => window.removeEventListener('scroll', controlNavbar)
  }, [lastScrollY])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  // Styles
  const activeStyle = "text-white font-semibold border-b-2 border-white pb-1"
  const inactiveStyle = "text-orange-100 hover:text-white transition-all duration-200"

  return (
    <nav 
      className={`relative top-0 z-50 flex h-16 w-full items-center justify-center bg-[#5C2C14] shadow-xl transition-all duration-300 ${
        showNavbar === 'hide' ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white tracking-widest uppercase">
          Heritage<span className="text-orange-400">Hub</span>
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-x-8">
         {navbarLinks.map((link, index) => (
           <li key={index}>
             <Link to={link?.path}>
               <p className={matchRoute(link?.path) ? activeStyle : inactiveStyle}>
                 {link.name}
               </p>
             </Link>
           </li>
         ))}
        </ul>

        {/* Auth / Profile Section */}
        <div className="flex items-center gap-x-6">
          {token === null ? (
            <div className="flex items-center gap-x-4">
              <Link to="/login">
                <button className="text-white hover:text-orange-200 px-3 py-2 transition-all">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-white text-[#5C2C14] px-5 py-2 rounded-lg font-bold hover:bg-orange-50 transition-all shadow-md">
                  Sign up
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-x-4">
               {/* Desktop Dropdown */}
               <div className="hidden md:block">
                 <ProfileDropDown />
               </div>
               
               {/* Mobile Dropdown */}
               <div className="md:hidden">
                 <MobileProfileDropDown />
               </div>
            </div>
          )}
        </div>
        
      </div>
    </nav>
  )
}

export default Navbar


// import { Link, useLocation, matchPath } from "react-router-dom"
// import { useSelector } from "react-redux"

// const Navbar = () => {
//   const { token } = useSelector((state) => state.auth)
//   const {user} = useSelector((state) => state.profile)
//   const location = useLocation()

//   const matchRoute = (route) => {
//     return matchPath({ path: route }, location.pathname)
//   }

//   // Active link style
//   const activeStyle = "text-white font-semibold border-b-2 border-white pb-1"
//   const inactiveStyle = "text-gray-200 hover:text-white transition-all duration-200"

//   return (
//     <nav className="z- flex h-20 w-full items-center justify-center bg-[#5C2C14] shadow-md transition-all duration-300">
//       <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        
//         {/* Logo Section */}
//         <Link to="/" className="text-2xl font-bold text-white tracking-wide">
//           Logo
//         </Link>

//         {/* Navigation Links */}
//         <div className="hidden md:flex items-center gap-x-8">
//           <Link to="/" className={matchRoute("/") ? activeStyle : inactiveStyle}>
//             Home
//           </Link>
//           <Link to="/heritage-map" className={matchRoute("/heritage-map") ? activeStyle : inactiveStyle}>
//             Heritage Map
//           </Link>
//           <Link to="/about" className={matchRoute("/about") ? activeStyle : inactiveStyle}>
//             About Us
//           </Link>
//         </div>

//         {/* Auth / Profile Section */}
//         <div className="flex items-center gap-x-6">
//           {token === null ? (
//             <div className="flex gap-x-4">
//               <Link to="/login">
//                 <button className="text-white hover:underline px-3 py-2">Log in</button>
//               </Link>
//               <Link to="/signup">
//                 <button className="bg-white text-[#5C2C14] px-5 py-2 rounded-md font-semibold hover:bg-gray-100 transition-all">
//                   Sign up
//                 </button>
//               </Link>
//             </div>
//           ) : (
//             /* Circular Profile Image instead of Cart Icon */
//             <Link to="/dashboard/my-profile">
//               <img 
//                 src={user?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName}`} 
//                 alt="Profile"
//                 className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-sm hover:scale-105 transition-transform duration-200"
//               />
//             </Link>
//           )}
//         </div>
        
//       </div>
//     </nav>
//   )
// }

// export default Navbar