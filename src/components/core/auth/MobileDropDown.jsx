import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import useOnClickOutside from "../../../hooks/useOnOneClick"
import Img from './../../common/Img';
import { logout } from "../../../redux/api/operation/authApi"

// Icons that feel more "Heritage/Traditional"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { AiOutlineCaretDown } from "react-icons/ai"
import { GiTempleGate, GiTreasureMap, GiOldLantern } from "react-icons/gi" // Heritage themed icons
import { MdOutlineContactPhone } from "react-icons/md"

export default function MobileProfileDropDown() {
    const { user } = useSelector((state) => state.profile)
    if (!user) return null

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const ref = useRef(null)

    const [open, setOpen] = useState(false)

    useOnClickOutside(ref, () => setOpen(false))

    return (
        <button className="relative sm:hidden outline-none" onClick={() => setOpen(!open)}>
            <div className="flex items-center gap-x-1">
                <Img
                    src={user?.image}
                    alt={`profile-${user?.firstName}`}
                    // Added a Gold border for the Heritage look
                    className={'aspect-square w-[35px] rounded-full object-cover border-2 border-amber-600'}
                />
                <AiOutlineCaretDown className={`text-sm text-amber-700 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`} />
            </div>

            {open && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    ref={ref}
                    // Styling: Cream background, Maroon/Gold borders, Serif-like feel
                    className="absolute min-w-[200px] top-[135%] right-0 z-[50] overflow-hidden rounded-md border-2 border-amber-800 bg-[#fdfaf1] shadow-[5px_5px_15px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in duration-200"
                >
                    {/* User Info Header - Heritage Gold/Maroon mix */}
                    <div className="px-4 py-3 border-b border-amber-800/30 bg-amber-100/50">
                        <p className="text-[10px] font-bold text-amber-900 uppercase tracking-[0.2em] mb-1">Guest Profile</p>
                        <p className="text-sm font-semibold text-stone-800 truncate italic">
                            {user?.firstName} {user?.lastName}
                        </p>
                    </div>

                    <div className="flex flex-col py-1">
                        <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}
                            className="flex w-full items-center gap-x-2 py-3 px-4 text-sm text-stone-800 hover:bg-amber-800 hover:text-white transition-all">
                            <VscDashboard className="text-lg text-amber-700" />
                            Dashboard
                        </Link>

                        <Link to='/' onClick={() => setOpen(false)}
                            className="flex w-full items-center gap-x-2 py-3 px-4 text-sm text-stone-800 hover:bg-amber-800 hover:text-white transition-all border-t border-amber-800/10">
                            <GiTempleGate className="text-lg text-amber-700" />
                            Home
                        </Link>

                        {/* Heritage Map / Site Navigation Link */}
                        <Link
                            to='/heritage-map'
                            onClick={() => setOpen(false)}
                            className="flex w-full items-center gap-x-2 py-3 px-4 text-sm text-stone-800 hover:bg-amber-900 hover:text-amber-50 transition-all border-b border-amber-800/10 group"
                        >
                            <div className="relative">
                                {/* The Main Map Icon */}
                                <GiTreasureMap className="text-xl text-amber-700 group-hover:text-amber-200 transition-colors" />

                                {/* Small pulse effect to make it look "interactive" or "alive" */}
                                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
                                </span>
                            </div>

                            <div className="flex flex-col items-start ">
                                <span className=" text-sm">Site Map</span>
                            </div>
                        </Link>

                        <Link to='/about' onClick={() => setOpen(false)}
                            className="flex w-full items-center gap-x-2 py-3 px-4 text-sm text-stone-800 hover:bg-amber-800 hover:text-white transition-all border-t border-amber-800/10">
                            <GiOldLantern className="text-lg text-amber-700" />
                            About us
                        </Link>

                        {/* <Link to='/contact' onClick={() => setOpen(false)} 
                            className="flex w-full items-center gap-x-2 py-3 px-4 text-sm text-stone-800 hover:bg-amber-800 hover:text-white transition-all">
                            <MdOutlineContactPhone className="text-lg text-amber-700" />
                            Reach Out
                        </Link> */}

                        {/* Logout Button - Distinctive Deep Red */}
                        <div
                            onClick={() => {
                                dispatch(logout(navigate))
                                setOpen(false)
                            }}
                            className="flex w-full items-center gap-x-2 py-3 px-4 text-sm font-bold text-red-800 hover:bg-red-800 hover:text-white transition-all border-t-2 border-amber-800 mt-1"
                        >
                            <VscSignOut className="text-lg" />
                            Logout
                        </div>
                    </div>
                </div>
            )}
        </button>
    )
}